import { TransactionState} from "@/utils/functional/instructions/transactionState";
import { CENTRAL_STATE_REGISTER } from "@/utils/constants/constants";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { settleAuctionDomain } from "@/utils/net/mainFunction/domain/settleAuctionDomain";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function settleDomain(
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    connection: Connection,
    domainNameState: NameAuctionState,
    extireDomain: string,
    customDomainPrice: number | null // SOL
): Promise<TransactionState>{
    if(!wallet || !signTransaction){
        console.log("wallet error")
        return TransactionState.NoConnect
    }

    if(domainNameState.highestBidder.toBase58() != wallet.toBase58()){
        console.log("wallet error")
        return TransactionState.Error
    }

    console.log("central state register", CENTRAL_STATE_REGISTER.toBase58())


    try{
        const settelDomainTransaction = new Transaction()

        settelDomainTransaction.add(
            await settleAuctionDomain(
                extireDomain, connection, wallet, domainNameState.highestBidder, customDomainPrice
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

            // if(String(txResult).includes("success")){
            //     solanaToast.show(TransactionState.Success)
            // }

            return TransactionState.Success
        }else{
            console.log("simulate fail")
            return TransactionState.Error
        }
    }catch(err){
        console.log("err: ", err)
    }

    return TransactionState.Success
}