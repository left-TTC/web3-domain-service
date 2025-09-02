import { Connection } from "@solana/web3.js"
import { FundingAccountState } from "../functional/common/class/fundingAccountState"
import { getCreatingRootAccounts } from "../functional/solana/getCreatingRootAccounts"
import { CREATE_FEE_TARGET, CREATE_ROOT_FEE } from "../constants/constants";




export async function findCreatingRoot(
    connection: Connection
): Promise<FundingAccountState[]> {

    const accounts = await getCreatingRootAccounts(connection);

    for(const account of accounts){
        console.log("accounts:", account.toBase58())
    }

    let states: FundingAccountState[] = [];
    for(const info of await connection.getMultipleAccountsInfo(accounts)){
        if(info){
            const newItem = new FundingAccountState(info);
            if(newItem.fundState.toNumber() < CREATE_FEE_TARGET){
                states.push(newItem)
            }
        }
    }

    return states;
}