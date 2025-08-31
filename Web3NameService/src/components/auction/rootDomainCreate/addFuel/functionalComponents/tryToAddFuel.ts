import type { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { getMintVault } from "@/utils/constants/constants";
import { getUsrMintSourceAccount } from "@/utils/functional/common/net/getUsrMintSourceAccount";
import { handleTransactionError } from "@/utils/functional/error/transactionError";
import { showcCheckBalanceToast } from "@/utils/functional/show/checkBalanceToast";
import { addFuelForRoot } from "@/utils/net/mainFunction/rootDomain/addFuelForRoot";
import type { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";



export async function tryToAddFuel(
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    solanaToast: SolanaToastContextType,
    //usd
    fuelQuantity: number | null,
    useMint: MainMint | OtherMint,
    creatingRootName: string
    // need a common toast
) {
    if(!fuelQuantity){
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
        const buyerTokenSource = await getUsrMintSourceAccount(wallet, useMint)
        const vault = getMintVault(useMint)

        const addFuelTransaction = addFuelForRoot(
            vault,
            wallet,
            buyerTokenSource,
            creatingRootName,
            fuelQuantity,
        )

        const { blockhash } = await connection.getLatestBlockhash()
        addFuelTransaction.recentBlockhash = blockhash
        addFuelTransaction.feePayer = wallet

        const signedTransaction = await signTransaction(addFuelTransaction)
        const transaction = await connection.sendRawTransaction(signedTransaction.serialize())

        console.log(transaction)
        if(String(transaction).includes("success")){
            solanaToast.show(TransactionState.Success)
        }
    }catch(err){
        handleTransactionError(String(err), solanaToast, tryToAddFuelTransactionId[0])
    }
}