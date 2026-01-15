// import { TransactionState } from "@/utils/functional/instructions/transactionState";
import type { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";



export async function vaultTransferIn(
    admin: PublicKey | null,
    // transferIn: number,
    // connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
): Promise<void> {

    if(!admin || !signTransaction){
        // solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    // try{

    // }
}