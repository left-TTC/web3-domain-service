import { Connection } from "@solana/web3.js"
import { rootStateAccount } from "../functional/common/class/rootStateAccount"
import { getCreatingRootAccounts } from "../functional/solana/getCreatingRootAccounts"
import { getNameAccountKey } from "../functional/solana/getNameAccountKey";
import { getHashedName } from "../functional/solana/getHashedName";


export async function findCreatingRoot(
    connection: Connection
): Promise<rootStateAccount[]> {

    const accounts = await getCreatingRootAccounts(connection);

    let states: rootStateAccount[] = [];
    for(const info of await connection.getMultipleAccountsInfo(accounts)){
        if(info){
            const newItem = new rootStateAccount(info);

            const rootDomainKey = getNameAccountKey(
                getHashedName(newItem.creatingName)
            )
            if(!await connection.getAccountInfo(rootDomainKey)){
                states.push(newItem)
            }
        }
    }

    return states;
}