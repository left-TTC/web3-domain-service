import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { increaseDomainBid } from "@/utils/net/mainFunction/domain/increaseDomainBid";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";


export async function increaseBidNum(
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    solanaToast: SolanaToastContextType,
    connection: Connection,
    domainNameState: NameAuctionState,
    extireDomain: string,
    totalLamports: number,
    newDomainPrice: number,
    refferrerKey: PublicKey | null,
): Promise<void> {

    if(!wallet || !signTransaction || !refferrerKey){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const increaseBidNumTransactionId = await showCheckSolBalance(
        solanaToast, wallet, connection, totalLamports
    )

    if(!increaseBidNumTransactionId[1])return

    try{
        const increaseBidNumTransaction = new Transaction()

        increaseBidNumTransaction.add(
            await increaseDomainBid(
                extireDomain, newDomainPrice, connection, wallet, domainNameState.highestBidder, refferrerKey
            )
        )

        const { blockhash } = await connection.getLatestBlockhash()
        increaseBidNumTransaction.recentBlockhash = blockhash
        increaseBidNumTransaction.feePayer = wallet

        const simulationResult = await connection.simulateTransaction(increaseBidNumTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            increaseBidNumTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(increaseBidNumTransaction)
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

    }
}