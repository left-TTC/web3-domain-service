import { TransactionState} from "@/utils/functional/instructions/transactionState";
import { launchRootDomain } from "@/utils/net/mainFunction/rootDomain/launchRootDomain";    
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function tryToCreateRootDomain(
    rootDomainName: string,
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
): Promise<TransactionState> {

    console.log("create root state test")

    if(!wallet || !signTransaction){
        console.log("wallet error")
        return TransactionState.NoConnect
    }

    try{
        const tryCreateRootDomainTransaction = await launchRootDomain(
            rootDomainName, wallet
        )

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("processed")
        tryCreateRootDomainTransaction.recentBlockhash = blockhash
        tryCreateRootDomainTransaction.feePayer = wallet

        const simulationResult = await connection.simulateTransaction(tryCreateRootDomainTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const signedTx = await signTransaction(tryCreateRootDomainTransaction)
            const signature = await connection.sendRawTransaction(
                signedTx.serialize()
            );

            const result = await connection.confirmTransaction(
                {
                    signature,
                    blockhash,
                    lastValidBlockHeight,
                },
                "confirmed"
            );

            console.log("Tx confirm result:", result);

            if (result.value.err) {
                return TransactionState.Error;
            }
        }

        return TransactionState.Success;
        
    }catch(err){
        console.error("Transaction failed:", err);
        return TransactionState.Error 
    }
}