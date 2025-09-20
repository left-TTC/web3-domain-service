import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { handleTransactionError } from "@/utils/functional/error/transactionError";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { launchRootDomain } from "@/utils/net/mainFunction/rootDomain/launchRootDomain";    
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



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

    const createRootStateTransactionId = await showCheckSolBalance(
        solanaToast, wallet, connection, totalFee
    )
    if(!createRootStateTransactionId[1])return

    try{
        const tryCreateRootDomainTransaction = new Transaction()

        const createRootDomainTransaction = launchRootDomain(
            rootDomainName, wallet
        )

        tryCreateRootDomainTransaction.add(createRootDomainTransaction)

        const { blockhash } = await connection.getLatestBlockhash()
        tryCreateRootDomainTransaction.recentBlockhash = blockhash
        //gas fee payer
        tryCreateRootDomainTransaction.feePayer = wallet

        const signedTransaction = await signTransaction(tryCreateRootDomainTransaction)
        const transaction = await connection.sendRawTransaction(signedTransaction.serialize())
        
        if(String(transaction).includes("success")){
            solanaToast.show(TransactionState.Success)
        }
        console.log("transaction success: ", transaction)
    }catch(err){
        console.log(err)
        handleTransactionError(String(err), solanaToast, createRootStateTransactionId[0])
    }
}