import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import type { Connection, PublicKey } from "@solana/web3.js";
import { checkAccountBalance} from "../common/net/checkAccountBalance";
import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";


export async function showCheckBalanceToastOnlySol(
    transactionToastTool: SolanaToastContextType,
    walletKey: PublicKey,
    connection: Connection, 
    targetAmount: number,
): Promise<[number, boolean]> {
    const id = transactionToastTool.show(TransactionState.CheckingBalance);

    const balance = await checkAccountBalance(
        connection, walletKey, MainMint.SOL
    ) 

    if(balance[0] > targetAmount){
        transactionToastTool.update(id, TransactionState.Pending)
        return [id, true]
    }else {
        transactionToastTool.update(id, TransactionState.NoEnoughBalance)
        return [id, false]
    }
}

export async function showCheckSolBalance(
    walletKey: PublicKey,
    connection: Connection, 
    targetAmount: number,
): Promise<boolean> {
    
    const balance = await connection.getBalance(walletKey)
    console.log(balance)
    if(balance > targetAmount){
        console.log("balance enough");
        return true
    }else{
        console.log("no enough balance")
        return false
    }
}