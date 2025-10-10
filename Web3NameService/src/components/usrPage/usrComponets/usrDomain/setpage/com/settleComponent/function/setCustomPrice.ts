import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { setDomainCustomPrice } from "@/utils/net/mainFunction/usrOperation/setDomainCustomPrice";
import { SendTransactionError, type Connection, type PublicKey, type Transaction, type VersionedTransaction } from "@solana/web3.js";



export async function setCustomPrice(
    customPrice: number,
    setDomain: string,
    usr: PublicKey | null,
    RootDomain: string[] | null,
    solanaToast: SolanaToastContextType,
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
): Promise<void> {

    const domainAndRoot = cutDomain(setDomain)


    if(!usr || !signTransaction){
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

    const trySetValueTransactionId = await showCheckSolBalance(
        solanaToast, usr, connection, 10000
    )
    if(!trySetValueTransactionId[1])return

    try{
        const trySetValueTransaction = setDomainCustomPrice(
            customPrice * 1e6,
            domainAndRoot,
            usr
        )

        const { blockhash } = await connection.getLatestBlockhash()
        trySetValueTransaction.recentBlockhash = blockhash
        trySetValueTransaction.feePayer = usr

        const simulationResult = await connection.simulateTransaction(trySetValueTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            trySetValueTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(trySetValueTransaction)
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

        if (err instanceof SendTransactionError) {
            const logs = err.getLogs(connection);
            console.error("=== Simulation Logs ===");
            console.error(logs);
        }
    }
}