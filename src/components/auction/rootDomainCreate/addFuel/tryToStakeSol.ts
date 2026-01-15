import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { stakeSolForRoot } from "@/utils/net/mainFunction/rootDomain/addFuelForRoot";
import { SendTransactionError, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function tryToStakeRoot(
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    fuelQuantity: number | undefined,
    creatingRootName: string | null,
): Promise<TransactionState> {

    if(!fuelQuantity || !creatingRootName){
        return TransactionState.Error
    }

    if(!wallet || !signTransaction){
        console.log("wallet error")
        return TransactionState.NoConnect
    }

    try{
        const tryToAddFuelTransaction = new Transaction()

        const addFuelAndOtherTransaction = stakeSolForRoot(
            wallet,
            creatingRootName,
            fuelQuantity,
        )

        tryToAddFuelTransaction.add(addFuelAndOtherTransaction)

        const { blockhash } = await connection.getLatestBlockhash()
        tryToAddFuelTransaction.recentBlockhash = blockhash
        tryToAddFuelTransaction.feePayer = wallet

        const simulationResult = await connection.simulateTransaction(tryToAddFuelTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            tryToAddFuelTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(tryToAddFuelTransaction)
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

            return TransactionState.Success
        }else{
            console.log("simulate fail")
            return TransactionState.Fail
        }

        
    }catch (err: any) {
        console.error("Transaction failed:", err);

        if (err instanceof SendTransactionError) {
            const logs = err.getLogs(connection);
            console.error("=== Simulation Logs ===");
            console.error(logs);
        }

        return TransactionState.Fail
    }
}