import { Connection, PublicKey } from "@solana/web3.js"
import { rootStateAccount } from "../functional/common/class/rootStateAccount"
import { getCreatingRootAccounts } from "../functional/solana/getCreatingRootAccounts"
import { getNameAccountKey } from "../functional/solana/getNameAccountKey";
import { getHashedName } from "../functional/solana/getHashedName";


export async function findCreatingRoot(
    connection: Connection
): Promise<{
    allStake: number;
    unInitializedStates: rootStateAccount[];
}> {

    const accounts = await getCreatingRootAccounts(connection);

    const accountInfos = await connection.getMultipleAccountsInfo(accounts);

    let allStake = 0
    const allStates: rootStateAccount[] = [];
    const rootDomainKeys: PublicKey[] = [];

    for (let i = 0; i < accountInfos.length; i++) {
        const info = accountInfos[i];
        if (!info) continue;

        const state = new rootStateAccount(info);
        allStates.push(state);
        allStake += state.amount.toNumber()

        const rootDomainKey = getNameAccountKey(
            getHashedName(state.name)
        );

        rootDomainKeys.push(rootDomainKey);
    }

    const rootDomainInfos = await connection.getMultipleAccountsInfo(rootDomainKeys);

    const unInitializedStates: rootStateAccount[] = [];

    for (let i = 0; i < rootDomainInfos.length; i++) {
        if (!rootDomainInfos[i]) {
            unInitializedStates.push(allStates[i]);
        }
    }

    return {
        allStake,
        unInitializedStates
    };
}