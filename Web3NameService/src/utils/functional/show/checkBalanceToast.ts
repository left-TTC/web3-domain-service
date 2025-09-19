import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import type { Connection, PublicKey } from "@solana/web3.js";
import { checkAccountBalance} from "../common/net/checkAccountBalance";
import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";



export async function showcCheckBalanceToast(
    transactionToastTool: SolanaToastContextType,
    walletKey: PublicKey,
    connection: Connection, 
    targetAmount: number,
    mintType: MainMint = MainMint.SOL,
): Promise<[number, boolean]>{
    const id = transactionToastTool.show(TransactionState.CheckingBalance);

    const balance = await checkAccountBalance(
        connection, walletKey, mintType
    ) 

    if(balance.length === 1 && mintType != MainMint.SOL){
        if(balance[0] * 1e6 >= targetAmount){
            transactionToastTool.update(id, TransactionState.Pending)
        }else{
            transactionToastTool.update(id, TransactionState.NoEnoughBalance)
            return[id, false]
        } 
    }else{
        console.log("is sol")
        //all the necessary sol should be warped to WSol
        console.log("balance:", balance)
        console.log("targetAmount:", targetAmount)
        if((balance[0] + balance[1])* 1e9 > targetAmount){
            transactionToastTool.update(id, TransactionState.Pending)
        }else{
            transactionToastTool.update(id, TransactionState.NoEnoughBalance)
            return[id, false]
        }
    }

    //provide modification interface
    return [id, true];
}

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
    transactionToastTool: SolanaToastContextType,
    walletKey: PublicKey,
    connection: Connection, 
    targetAmount: number,
): Promise<[number, boolean]> {

    const id = transactionToastTool.show(TransactionState.CheckingBalance);

    const balance = await connection.getBalance(walletKey)
    console.log(balance)
    if(balance > targetAmount){
        transactionToastTool.update(id, TransactionState.Pending)
        return [id, true]
    }else{
        transactionToastTool.update(id, TransactionState.NoEnoughBalance)
        return [id, false]
    }
}