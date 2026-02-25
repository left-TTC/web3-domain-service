import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { CENTRAL_STATE_REGISTER } from "@/utils/constants/constants";
import { extractUserProfitTransaction } from "@/utils/net/mainFunction/usrOperation/extractUsrProfit";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function extractUserProfit(
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    connection: Connection,
    extract: number,
): Promise<TransactionState>{
    if(!wallet || !signTransaction){
        console.log("wallet error")
        return TransactionState.NoConnect
    }

    console.log("central state register", CENTRAL_STATE_REGISTER.toBase58())

    try{
        const userExtractTransaction = new Transaction()

        userExtractTransaction.add(
            extractUserProfitTransaction(
                extract, wallet
            )
        )

        const { blockhash } = await connection.getLatestBlockhash()
        userExtractTransaction.recentBlockhash = blockhash
        userExtractTransaction.feePayer = wallet

        const simulationResult = await connection.simulateTransaction(userExtractTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            userExtractTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(userExtractTransaction)
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

            return TransactionState.Success;
        }else{
            console.log("simulate fail")
            return TransactionState.Error;
        }
    }catch(err){
        console.log("err: ", err)
        return TransactionState.Error;
    }
}
