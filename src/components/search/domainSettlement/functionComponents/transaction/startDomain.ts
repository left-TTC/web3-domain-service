import { TransactionState} from "@/provider/fixedToastProvider/fixedToastProvider";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { startWeb3DomainAuction } from "@/utils/net/mainFunction/domain/startWeb3DomainAuction";
import { SendTransactionError, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function startDomain(
    entireDomain: string,
    refferrerKey: PublicKey,
    buyer: PublicKey | null,
    RootDomain: string[] | null,
    totalFee: number,
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    addDomainToCache: () => void,
): Promise<TransactionState> {

    const domainAndRoot = cutDomain(entireDomain)

    console.log("total fee: ",totalFee)

    if(!buyer || !signTransaction){
        console.log("wallet error")
        return TransactionState.NoConnect
    }
    if(!RootDomain){
        console.log("root error")
        return TransactionState.Error
    }else{
        if(!RootDomain.includes(domainAndRoot[1])){
            console.log("root error")
            return TransactionState.Error
        }
    }

    const startDomainTransactionId = await showCheckSolBalance  (
        buyer, connection, totalFee
    )
    if(!startDomainTransactionId)return TransactionState.NoEnoughBalance

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
        console.log("simulate result", simulationResult.context);

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
                return TransactionState.Success
            }

            addDomainToCache()
        }else{
            console.log("simulate fail")
            return TransactionState.Error
        }

    }catch(err){
         console.error("Transaction failed:", err);

        if (err instanceof SendTransactionError) {
            const logs = err.getLogs(connection);
            console.error("=== Simulation Logs ===");
            console.error(logs);
        }

        return TransactionState.Error
    }

    return TransactionState.Success
}