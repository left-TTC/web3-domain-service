import { TransactionState} from "@/utils/functional/instructions/transactionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { startWeb3DomainAuction } from "@/utils/net/mainFunction/domain/startWeb3DomainAuction";
import { PublicKey, Transaction, type Connection, type VersionedTransaction } from "@solana/web3.js";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";


export async function startDomain(
    entireDomain: string,
    refferrerKey: PublicKey,
    buyer: PublicKey | null,
    RootDomain: string[] | null,
    totalFee: number,
    usrBalance: number,
    connection: Connection,
    domainInfo: NameRecordState | null,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    addDomainToCache: () => void,
): Promise<TransactionState> {

    const domainAndRoot = cutDomain(entireDomain)
    if (!domainAndRoot || domainAndRoot.length < 2) {
        return TransactionState.Error;
    }

    if(!buyer || !signTransaction){
        console.log("wallet error")
        return TransactionState.NoConnect
    }
    
    if(!RootDomain){
        return TransactionState.Error
    }else{
        if(!RootDomain.includes(domainAndRoot[1])){
            return TransactionState.Error
        }
    }

    if(usrBalance < totalFee)return TransactionState.NoEnoughBalance

    try{
        const tryStartDomainTransaction = await startWeb3DomainAuction(
            domainAndRoot[1],
            domainAndRoot[0],
            buyer,
            refferrerKey,
            connection,
            domainInfo? domainInfo.owner:PublicKey.default
        )

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("processed")
        tryStartDomainTransaction.recentBlockhash = blockhash
        tryStartDomainTransaction.feePayer = buyer

        const simulationResult = await connection.simulateTransaction(tryStartDomainTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const signedTx = await signTransaction(tryStartDomainTransaction);
            const signature = await connection.sendRawTransaction(
                signedTx.serialize()
            );

            const result = await connection.confirmTransaction(
                {
                    signature,
                    blockhash,
                    lastValidBlockHeight,
                },
                "confirmed"
            );

            console.log("Tx confirm result:", result);

            if (result.value.err) {
                return TransactionState.Error;
            }

            addDomainToCache();
            return TransactionState.Success;
        }else{
            console.log("simulate fail")
            return TransactionState.Error
        }
        

    }catch(err){
        console.error("Transaction failed:", err);
        return TransactionState.Error
    }

}