import { TransactionState, useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { showcCheckBalanceToast } from "@/utils/functional/show/checkBalanceToast"
import { useConnection } from "@solana/wallet-adapter-react"
import { useEffect } from "react"
import { MainMint, type OtherMint } from "../paymentMethod/crypto"
import { handleTransactionError } from "@/utils/functional/error/transactionError"
import { cutDomain } from "@/utils/functional/common/cutDomain"
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey"
import { getHashedName } from "@/utils/functional/solana/getHashedName"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider"
import { registerWeb3Domain } from "@/utils/net/mainFunction/registerWeb3Domain"
import type { PublicKey } from "@solana/web3.js"
import { getUsrMintSourceAccount } from "@/utils/functional/common/net/getUsrMintSourceAccount"
import { getMintVault } from "@/utils/constants/constants"



export async function sendCreateDomainTransaction(
    confirmTransaction: boolean,
    setConfirmTransaction: React.Dispatch<React.SetStateAction<boolean>>,
    useMint: MainMint | OtherMint | null,
    domainPriceMap: Map<MainMint | OtherMint, number> | null,
    domainName: string,

    //test
    domainOwner: PublicKey | null = null,
    feePayer: PublicKey | null = null,
){
    const {connection} = useConnection()
    const {publicKey: walletKey, signTransaction} = useWalletEnv()
    const solanaToast = useSolanaToast()
    const {rootDomains} = useRootDomain()

    useEffect(() => {
        const sendTransaction = async() => {
            if(confirmTransaction){
                console.log("confirmed to buy the domain")
                if(!walletKey || !signTransaction){
                    solanaToast.show(TransactionState.NoConnect)
                    setConfirmTransaction(false)
                    console.log("wallet error")
                    return
                } 

                if(!useMint || !domainPriceMap){
                    solanaToast.show(TransactionState.Error)
                    setConfirmTransaction(false)
                    console.log("data1 error")
                    return
                }

                const target = domainPriceMap.get(useMint)
                if(!target){
                    solanaToast.show(TransactionState.Error)
                    setConfirmTransaction(false)
                    console.log("data2 error")
                    return
                }

                const createDomainTransactionId = await showcCheckBalanceToast(
                    solanaToast, walletKey, connection, target, useMint
                )

                try{
                    const domainAndRoot = cutDomain(domainName)
                    if(!rootDomains.includes(domainAndRoot[1])){
                        console.log("roots: ", rootDomains)
                        console.log("root error: ", domainAndRoot[1])
                        solanaToast.update(createDomainTransactionId[0], TransactionState.NoConnect)
                        setConfirmTransaction(false)
                        return
                    }
                    const rootDomainKey = getNameAccountKey(getHashedName(domainAndRoot[1]))
                    const domainNameKey = getNameAccountKey(getHashedName(domainAndRoot[0]), null, rootDomainKey)
                    const buyerTokenSource = await getUsrMintSourceAccount(walletKey, useMint)
                    const vault = getMintVault(useMint)

                    const registerDomainTransaction = registerWeb3Domain(
                        rootDomainKey, 
                        domainNameKey,
                        walletKey,
                        walletKey,
                        walletKey,
                        buyerTokenSource,
                        vault,
                        domainName,
                        0,
                    )

                    const { blockhash } = await connection.getLatestBlockhash()
                    registerDomainTransaction.recentBlockhash = blockhash
                    //gas fee payer
                    registerDomainTransaction.feePayer = walletKey

                    const signedTransaction = await signTransaction(registerDomainTransaction)
                    const transaction = await connection.sendRawTransaction(signedTransaction.serialize())
                    
                    if(String(transaction).includes("success")){
                        solanaToast.show(TransactionState.Success)
                    }
                }catch(err){
                    handleTransactionError(String(err), solanaToast, createDomainTransactionId[0])
                    setConfirmTransaction(false)
                }
            }
        }
        sendTransaction()
    },[confirmTransaction])
}