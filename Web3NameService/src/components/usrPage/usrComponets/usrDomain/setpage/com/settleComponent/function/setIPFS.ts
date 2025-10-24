import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { IPFSOperation, setDomainIPFS } from "@/utils/net/mainFunction/usrOperation/setDomainIPFSRecord";
import { SendTransactionError, type Connection, type PublicKey, type Transaction, type VersionedTransaction } from "@solana/web3.js";



export async function setIPFS(
    cid: string | null,
    operation: IPFSOperation,
    totalLamports: number,
    extireDomain: string,
    usr: PublicKey | null,
    RootDomain: string[] | null,
    solanaToast: SolanaToastContextType,
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
): Promise<void> {

    const domainAndRoot = cutDomain(extireDomain)

    console.log("create record for: ", extireDomain)
    console.log("will use ", totalLamports/1e9, " SOL")
    switch(operation){
        case IPFSOperation.Delete:
            console.log("delete record")
            break
        case IPFSOperation.Init:
            console.log("init record")
            break
        case IPFSOperation.Reset:
            console.log("reset record")
            break
    }

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

    const trySetIPFSTransactionId = await showCheckSolBalance(
        solanaToast, usr, connection, totalLamports
    )
    if(!trySetIPFSTransactionId[1])return

    try{
        const trySetIPFSTransaction = setDomainIPFS(
            extireDomain, usr, cid, operation
        )

        const { blockhash } = await connection.getLatestBlockhash()
        trySetIPFSTransaction.recentBlockhash = blockhash
        trySetIPFSTransaction.feePayer = usr

        const simulationResult = await connection.simulateTransaction(trySetIPFSTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            trySetIPFSTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(trySetIPFSTransaction)
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