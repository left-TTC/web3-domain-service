import { Connection } from "@solana/web3.js"
import { FundingAccountState } from "../functional/common/class/fundingAccountState"
import { getCreatingRootAccounts } from "../functional/solana/getCreatingRootAccounts"




export async function findCreatingRoot(
    connection: Connection
): Promise<FundingAccountState[]> {

    const accounts = await getCreatingRootAccounts(connection);

    let states: FundingAccountState[] = [];
    for(const info of await connection.getMultipleAccountsInfo(accounts)){
        if(info){
            states.push(new FundingAccountState(info))
        }
    }

    return states;
}