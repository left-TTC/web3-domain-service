import { Connection } from "@solana/web3.js"
import { RootStateAccount } from "../functional/common/class/rootStateAccount"
import { getCreatingRootAccounts } from "../functional/solana/getCreatingRootAccounts"
import { CREATE_ROOT_TARGET } from "../constants/constants";




export async function findCreatingRoot(
    connection: Connection
): Promise<RootStateAccount[]> {

    const accounts = await getCreatingRootAccounts(connection);

    for(const account of accounts){
        console.log("accounts:", account.toBase58())
    }

    let states: RootStateAccount[] = [];
    for(const info of await connection.getMultipleAccountsInfo(accounts)){
        if(info){
            const newItem = new RootStateAccount(info);
            if(newItem.fundState.toNumber() < CREATE_ROOT_TARGET){
                states.push(newItem)
            }
        }
    }

    return states;
}