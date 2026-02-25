import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { stakeSolForRoot } from "@/utils/net/mainFunction/rootDomain/addFuelForRoot";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



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

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("processed")
        tryToAddFuelTransaction.recentBlockhash = blockhash
        tryToAddFuelTransaction.feePayer = wallet

        const simulationResult = await connection.simulateTransaction(tryToAddFuelTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const signedTx = await signTransaction(tryToAddFuelTransaction)
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
        
    }catch (err) {
        console.error("Transaction failed:", err);
        return TransactionState.Error 
    }
}