import { TransactionState} from "@/utils/functional/instructions/transactionState";
import type { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { IPFSOperation, setDomainIPFS } from "@/utils/net/mainFunction/usrOperation/setDomainIPFSRecord";
import { SendTransactionError, type Connection, type PublicKey, type Transaction, type VersionedTransaction } from "@solana/web3.js";



export async function setIPFS(
    cid: string | null,
    operation: IPFSOperation,
    extireDomain: string,
    usr: PublicKey | null,
    RootDomain: string[] | null,
    connection: Connection,
    useProtocol: UseProtocol,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
): Promise<TransactionState> {

    const domainAndRoot = cutDomain(extireDomain)

    console.log("create record for: ", extireDomain)
    switch(operation){
        case IPFSOperation.Init:
            console.log("init record")
            break
        case IPFSOperation.Reset:
            console.log("reset record")
            break
    }

    if(!usr || !signTransaction){
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

    try{
        const trySetIPFSTransaction = setDomainIPFS(
            extireDomain, usr, cid, operation, useProtocol
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
                return TransactionState.Success
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

    return TransactionState.Success
}