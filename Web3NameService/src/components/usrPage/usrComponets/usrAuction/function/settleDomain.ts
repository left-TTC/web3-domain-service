import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { settleAuctionDomain } from "@/utils/net/mainFunction/domain/settleAuctionDomain";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function settleDomain(
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    solanaToast: SolanaToastContextType,
    connection: Connection,
    domainNameState: NameAuctionState,
    extireDomain: string,
    totalLamports: number,
    customDomainPrice: number | null // USD
): Promise<void>{
    if(!wallet || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const settelDomainTransactionId = await showCheckSolBalance(
            solanaToast, wallet, connection, totalLamports
        )
    
    if(!settelDomainTransactionId[1])return

    try{
        const settelDomainTransaction = new Transaction()

        settelDomainTransaction.add(
            await settleAuctionDomain(
                extireDomain
            )
        )

        const { blockhash } = await connection.getLatestBlockhash()
        settelDomainTransaction.recentBlockhash = blockhash
        settelDomainTransaction.feePayer = wallet

        const simulationResult = await connection.simulateTransaction(settelDomainTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            settelDomainTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(settelDomainTransaction)
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
        console.log("err: ", err)
    }
}