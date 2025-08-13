import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import type { Connection, PublicKey } from "@solana/web3.js";
import { checkAccountBalance, CheckMint } from "../common/net/checkAccountBalance";



export async function showcCheckBalanceToast(
    transactionToastTool: SolanaToastContextType,
    walletKey: PublicKey,
    connection: Connection, 
    targetAmount: number,
    mintType: CheckMint = CheckMint.SOL,
): Promise<number>{
    const id = transactionToastTool.show(TransactionState.CheckingBalance);

    const balance = await checkAccountBalance(
        connection, walletKey, mintType
    ) 

    console.log("account's balance: ", balance)

    if((balance * 1e9) > targetAmount){
        transactionToastTool.update(id, TransactionState.Pending);
    }else{
        transactionToastTool.update(id, TransactionState.NoEnoughBalance);
    }

    //provide modification interface
    return id;
}