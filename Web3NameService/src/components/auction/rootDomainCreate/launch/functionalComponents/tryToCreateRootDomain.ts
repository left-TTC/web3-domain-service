import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { launchRootDomain } from "@/utils/net/mainFunction/rootDomain/launchRootDomain";    
import { SendTransactionError, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function tryToCreateRootDomain(
    rootDomainName: string,
    totalFee: number, // SOL
    solanaToast: SolanaToastContextType,
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
) {

    console.log("create root state test")

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
        const tryCreateRootDomainTransaction = await launchRootDomain(
            rootDomainName, wallet
        )

        const { blockhash } = await connection.getLatestBlockhash()
        tryCreateRootDomainTransaction.recentBlockhash = blockhash
        tryCreateRootDomainTransaction.feePayer = wallet

        const simulationResult = await connection.simulateTransaction(tryCreateRootDomainTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            console.log("simulate ok, continue")

            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            tryCreateRootDomainTransaction.recentBlockhash = blockhash
            tryCreateRootDomainTransaction.feePayer = wallet

            const signedTransaction = await signTransaction(tryCreateRootDomainTransaction)

            const transaction = await connection.sendRawTransaction(signedTransaction.serialize(), {
                    skipPreflight: true,
                });

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