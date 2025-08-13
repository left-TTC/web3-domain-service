import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";



export function handleTransactionError(
    errString: string,
    transactionToast: SolanaToastContextType,
    transactionToastId: number,
): void {
    
    console.log("transaction err: ", errString)
    if(errString.includes("User rejected")){
        console.log("update cancle toast")
        transactionToast.update(transactionToastId, TransactionState.Cancle);
    }else if(errString.includes("Block height exceeded")){
        transactionToast.update(transactionToastId, TransactionState.Fail);
    }
}