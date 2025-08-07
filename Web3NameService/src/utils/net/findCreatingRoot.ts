import { Connection } from "@solana/web3.js"
import { FundingAccountState } from "../functional/common/class/fundingAccountState"
import { getCreatingRootAccounts } from "../functional/solana/getCreatingRootAccounts"
import { CREATE_ROOT_FEE } from "../constants/constants";




export async function findCreatingRoot(
    connection: Connection
): Promise<FundingAccountState[]> {

    const accounts = await getCreatingRootAccounts(connection);

    let states: FundingAccountState[] = [];
    for(const info of await connection.getMultipleAccountsInfo(accounts)){
        if(info){
            const newItem = new FundingAccountState(info);
            if(newItem.fundState.toNumber() < CREATE_ROOT_FEE){
                states.push(newItem)
            }
        }
    }

    return states;
}