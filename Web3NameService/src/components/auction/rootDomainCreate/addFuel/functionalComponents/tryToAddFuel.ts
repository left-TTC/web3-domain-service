import { MainMint, type OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { getMintVault } from "@/utils/constants/constants";
import { checkAccountBalance } from "@/utils/functional/common/net/checkAccountBalance";
import { checkIfCreateWSOLAccount } from "@/utils/functional/common/net/checkIfCreateWSOLAccount";
import { getMintPublickey } from "@/utils/functional/common/net/checkMintAccountBalance";
import { getPythFeedAccount, returnPythAccount } from "@/utils/functional/common/net/getPythFeedAccount";
import { getUsrMintSourceAccount } from "@/utils/functional/common/net/getUsrMintSourceAccount";
import { handleTransactionError } from "@/utils/functional/error/transactionError";
import { showcCheckBalanceToast } from "@/utils/functional/show/checkBalanceToast";
import { addFuelForRoot } from "@/utils/net/mainFunction/rootDomain/addFuelForRoot";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function tryToAddFuel(
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    solanaToast: SolanaToastContextType,
    //usd
    fuelQuantity: number | null,
    useMint: MainMint | OtherMint,
    creatingRootName: string,
    tokenQuantity: number
    // need a common toast
) {
    if(!fuelQuantity || tokenQuantity === 0){
        solanaToast.show(TransactionState.Error)
        return
    }

    if(!wallet || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const tryToAddFuelTransactionId = await showcCheckBalanceToast(
        solanaToast, wallet, connection, fuelQuantity, useMint
    )
    if(!tryToAddFuelTransactionId[1]) return

    try{
        const tryToAddFuelTransaction = new Transaction()

        const buyerTokenSource = await getUsrMintSourceAccount(wallet, useMint)

        if(useMint === MainMint.SOL){
            const WSOLQuantity = await checkAccountBalance(
                connection, wallet, useMint
            )

            const transferNum = tokenQuantity - WSOLQuantity[1]

            console.log("transferNum:", transferNum)
            console.log("tokenQuantity:", tokenQuantity)
            console.log("WSOLQuantity:", WSOLQuantity)
            await checkIfCreateWSOLAccount(
                connection,
                buyerTokenSource,
                wallet,
                wallet,
                getMintPublickey(useMint),
                tryToAddFuelTransaction,
                transferNum
            )
        }

        const vault = getMintVault(useMint)
        const pythFeedAccountKey = returnPythAccount(useMint)

        console.log("useMint", useMint, "feed:", pythFeedAccountKey?.toBase58())

        addFuelForRoot(
            vault,
            wallet,
            buyerTokenSource,
            pythFeedAccountKey,
            tryToAddFuelTransaction,
            creatingRootName,
            fuelQuantity,
        )

        const { blockhash } = await connection.getLatestBlockhash()
        tryToAddFuelTransaction.recentBlockhash = blockhash
        tryToAddFuelTransaction.feePayer = wallet

        const signedTransaction = await signTransaction(tryToAddFuelTransaction)
        const transaction = await connection.sendRawTransaction(signedTransaction.serialize())

        console.log(transaction)
        if(String(transaction).includes("success")){
            solanaToast.show(TransactionState.Success)
        }
    }catch(err){
        console.log(err)
        handleTransactionError(String(err), solanaToast, tryToAddFuelTransactionId[0])
    }
}