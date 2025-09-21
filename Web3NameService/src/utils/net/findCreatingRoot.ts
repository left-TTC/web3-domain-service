import { Connection } from "@solana/web3.js"
import { rootStateAccount } from "../functional/common/class/rootStateAccount"
import { getCreatingRootAccounts } from "../functional/solana/getCreatingRootAccounts"
import { CREATE_ROOT_TARGET } from "../constants/constants";




export async function findCreatingRoot(
    connection: Connection
): Promise<rootStateAccount[]> {

    const accounts = await getCreatingRootAccounts(connection);

    console.log(accounts[0].toBase58())

    let states: rootStateAccount[] = [];
    for(const info of await connection.getMultipleAccountsInfo(accounts)){
        if(info){
            const newItem = new rootStateAccount(info);
            if(newItem.fundState.toNumber() < CREATE_ROOT_TARGET){
                states.push(newItem)
            }
        }
    }

    return states;
}