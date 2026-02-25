import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { Transaction, type PublicKey, type Connection } from "@solana/web3.js";
import { setDomainPreview } from "@/utils/net/mainFunction/domain/setDomainPreview";
import { RecordType } from "@/utils/functional/solana/getRecordKey";
import { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";

export async function setPreview(
    signTransaction: (<T extends Transaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    connection: Connection,
    domain: string,
    content: string | undefined,
    lastSetter: PublicKey,
    recordGate: UseProtocol | undefined,
): Promise<TransactionState> {

    if(!wallet || !signTransaction){
        console.log("wallet error")
        return TransactionState.NoConnect
    }

    if(!content)return TransactionState.Error
    if(!recordGate)return TransactionState.Error

    try{

        const setPreviewTransaction = await setDomainPreview(
            domain,
            content,
            wallet,
            lastSetter,
            recordGate,
            RecordType.DNS
        );

        const { blockhash } = await connection.getLatestBlockhash()
        setPreviewTransaction.recentBlockhash = blockhash
        setPreviewTransaction.feePayer = wallet

        console.log("simulating")
        const simulationResult = await connection.simulateTransaction(setPreviewTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            setPreviewTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(setPreviewTransaction)
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
        }
    }catch(err){
        console.log("error: ", err)
        return TransactionState.Error
    }

    return TransactionState.Success
}