import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { initAccountTransaction } from "@/utils/net/mainFunction/usrOperation/initAccount";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function initAccount(
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    usr: PublicKey | null,
    connection: Connection,
    // using referrer keyN
    refferrerKey: PublicKey | undefined,
): Promise<TransactionState> {
    if(!usr || !signTransaction || !refferrerKey){
        console.log("wallet error")
        return TransactionState.NoConnect
    }

    try{
        const increaseBidNumTransaction = new Transaction()

        increaseBidNumTransaction.add(
            await initAccountTransaction(
                usr, refferrerKey
            )
        )

        const { blockhash } = await connection.getLatestBlockhash()
        increaseBidNumTransaction.recentBlockhash = blockhash
        increaseBidNumTransaction.feePayer = usr

        console.log("simulating")
        const simulationResult = await connection.simulateTransaction(increaseBidNumTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            increaseBidNumTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(increaseBidNumTransaction)
            const transaction = await connection.sendRawTransaction(signedTransaction.serialize(), {
                skipPreflight: false,
            })

            const txResult = await connection.confirmTransaction(
                {
                    signature: transaction,
                    blockhash,
                    lastValidBlockHeight,
                },
                "confirmed"
            );

            console.log("Tx signature:", transaction);
            console.log("Tx confirm result:", txResult);

            const txInfo = await connection.getTransaction(transaction, {
                commitment: "confirmed",
                maxSupportedTransactionVersion: 0,
            });

            if (txInfo) {
                console.log("=== Transaction Logs ===");
                console.log(txInfo.meta?.logMessages);
            }

            // if(String(txResult).includes("success")){
            //     solanaToast.show(TransactionState.Success)
            // }

            return TransactionState.Success
        }else{
            console.log("simulate fail")
        }
    }catch(err){
        return TransactionState.Error
    }

    return TransactionState.Success
}