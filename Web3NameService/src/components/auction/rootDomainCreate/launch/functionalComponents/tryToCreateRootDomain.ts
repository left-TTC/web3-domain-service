import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { handleTransactionError } from "@/utils/functional/error/transactionError";
import { showCheckBalanceToastOnlySol } from "@/utils/functional/show/checkBalanceToast";
import { launchRootDomain } from "@/utils/net/mainFunction/rootDomain/launchRootDomain";    
import type { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";



export async function tryToCreateRootDomain(
    rootDomainName: string,
    totalFee: number, // SOL
    solanaToast: SolanaToastContextType,
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
) {

    if(!wallet || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const createRootStateTransactionId = await showCheckBalanceToastOnlySol(
        solanaToast, wallet, connection, totalFee
    )
    if(!createRootStateTransactionId[1])return

    try{
        const createRootDomainTransaction = launchRootDomain(
            rootDomainName, wallet
        )

        const { blockhash } = await connection.getLatestBlockhash()
        createRootDomainTransaction.recentBlockhash = blockhash
        //gas fee payer
        createRootDomainTransaction.feePayer = wallet

        const signedTransaction = await signTransaction(createRootDomainTransaction)
        const transaction = await connection.sendRawTransaction(signedTransaction.serialize())
        
        if(String(transaction).includes("success")){
            solanaToast.show(TransactionState.Success)
        }
    }catch(err){
        handleTransactionError(String(err), solanaToast, createRootStateTransactionId[0])
    }
}