import { TransactionState} from "@/utils/functional/instructions/transactionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { startWeb3DomainAuction } from "@/utils/net/mainFunction/domain/startWeb3DomainAuction";
import { Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";


export async function startDomain(
    entireDomain: string,
    refferrerKey: PublicKey,
    buyer: PublicKey | null,
    RootDomain: string[] | null,
    totalFee: number,
    usrBalance: number,
    connection: Connection,
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
            connection
        )

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("processed")
        tryStartDomainTransaction.recentBlockhash = blockhash
        tryStartDomainTransaction.feePayer = buyer

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

    }catch(err){
        console.error("Transaction failed:", err);
        return TransactionState.Error
    }

}