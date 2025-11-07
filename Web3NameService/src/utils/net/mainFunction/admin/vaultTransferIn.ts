import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import type { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";



export async function vaultTransferIn(
    admin: PublicKey | null,
    transferIn: number,
    connection: Connection,
    solanaToast: SolanaToastContextType,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
): Promise<void> {

    if(!admin || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const startProjectTransactionId = await showCheckSolBalance(
        solanaToast, admin, connection, transferIn
    )
    if(!startProjectTransactionId[1])return

    // try{

    // }
}