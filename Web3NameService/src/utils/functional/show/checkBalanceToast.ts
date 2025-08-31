import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import type { Connection, PublicKey } from "@solana/web3.js";
import { checkAccountBalance} from "../common/net/checkAccountBalance";
import { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";



export async function showcCheckBalanceToast(
    transactionToastTool: SolanaToastContextType,
    walletKey: PublicKey,
    connection: Connection, 
    targetAmount: number,
    mintType: MainMint | OtherMint = MainMint.SOL,
): Promise<[number, boolean]>{
    const id = transactionToastTool.show(TransactionState.CheckingBalance);

    const balance = await checkAccountBalance(
        connection, walletKey, mintType
    ) 

    if(balance.length === 1 && mintType != MainMint.SOL){
        if(balance[0] >= targetAmount){
            transactionToastTool.update(id, TransactionState.Pending)
        }else{
            transactionToastTool.update(id, TransactionState.NoEnoughBalance)
            return[id, false]
        }
    }else{
        //all the necessary sol should be warped to WSol
        if((balance[0] + balance[1]) > targetAmount){
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