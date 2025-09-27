import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { startWeb3DomainAuction } from "@/utils/net/mainFunction/startWeb3DomainAuction";
import { SendTransactionError, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function startDomain(
    entireDomain: string,
    refferrerKey: PublicKey,
    buyer: PublicKey | null,
    
    RootDomain: string[] | null,
    totalFee: number, //lamports
    solanaToast: SolanaToastContextType,
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
): Promise<void> {

    const domainAndRoot = cutDomain(entireDomain)

    console.log("total fee: ",totalFee)

    if(!buyer || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }
    if(!RootDomain){
        solanaToast.show(TransactionState.Error)
        console.log("root error")
        return
    }else{
        if(!RootDomain.includes(domainAndRoot[1])){
            solanaToast.show(TransactionState.Error)
            console.log("root error")
            return
        }
    }

    const startDomainTransactionId = await showCheckSolBalance  (
        solanaToast, buyer, connection, totalFee
    )
    if(!startDomainTransactionId[1])return

    try{
        const tryStartDomainTransaction = await startWeb3DomainAuction(
            domainAndRoot[1],
            domainAndRoot[0],
            buyer,
            refferrerKey,
            connection
        )

        const { blockhash } = await connection.getLatestBlockhash()
        tryStartDomainTransaction.recentBlockhash = blockhash
        tryStartDomainTransaction.feePayer = buyer

        const simulationResult = await connection.simulateTransaction(tryStartDomainTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            tryStartDomainTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(tryStartDomainTransaction)
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