import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { confirmRootDomain } from "@/utils/net/mainFunction/rootDomain/confirmRootDomian";
import { SendTransactionError, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function tryToConfirmRootDomain(
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    admin: PublicKey | null,
    solanaToast: SolanaToastContextType,

    rootDomain: string
): Promise<void> {

    if(!admin || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const rent = await connection.getMinimumBalanceForRentExemption(2 * NAME_RECORD_LENGTH + rootDomain.length);

    const tryConfirmRootTransactionId = await showCheckSolBalance(
        solanaToast, admin, connection, rent
    )

    if(!tryConfirmRootTransactionId[1])return

    try{
        const tryConfirmRootTransaction = confirmRootDomain(
            admin, rootDomain
        )

        const { blockhash } = await connection.getLatestBlockhash()
        tryConfirmRootTransaction.recentBlockhash = blockhash
        tryConfirmRootTransaction.feePayer = admin

        const simulationResult = await connection.simulateTransaction(tryConfirmRootTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            tryConfirmRootTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(tryConfirmRootTransaction)
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

            if(String(txResult).includes("success")){
                solanaToast.show(TransactionState.Success)
            }
        }else{
            console.log("simulate fail")
        }

    }catch(err){
        console.error("Transaction failed:", err);

        // 捕获并打印完整日志
        if (err instanceof SendTransactionError) {
            const logs = err.getLogs(connection);
            console.error("=== Simulation Logs ===");
            console.error(logs);
        }
    }
}