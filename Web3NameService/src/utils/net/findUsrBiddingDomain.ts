import type { Connection, PublicKey } from "@solana/web3.js";
import { WEB3_REGISTER_ID } from "../constants/constants";
import { NameAuctionState } from "../functional/common/class/nameAuctionState";
import { DomainState, getDomainTimeState } from "../functional/common/time/getDomainTimeState";
import { getNameStateRevserseKey } from "../functional/solana/getNameStateReverseKey";
import { getHashedName } from "../functional/solana/getHashedName";
import { NameAuctionStateReverse } from "../functional/common/class/nameAuctionStateReverse";



export async function findUsrBiddingDomain(
    connection: Connection,
    usr: PublicKey | null,
): Promise<{
    priceMap: Record<string, number>;
    stateMap: Map<string, NameAuctionState>;
}> {

    if (!usr) throw new Error("no wallet");

    const filters = [
        { dataSize: 49 },
        {
            memcmp: {
                offset: 0,
                bytes: usr.toBase58(),
            },
        },
    ];

    const programAccounts = await connection.getProgramAccounts(
        WEB3_REGISTER_ID,
        { filters }
    );
    const validStates: {
        pubkey: PublicKey;
        state: NameAuctionState;
    }[] = [];

    for (const acc of programAccounts) {
        const state = new NameAuctionState(acc.account);
        const timeState = getDomainTimeState(state);

        if (
            timeState === DomainState.Auctioning ||
            timeState === DomainState.Settling
        ) {
            validStates.push({
                pubkey: acc.pubkey,
                state,
            });
        }
    }

    const reverseKeys = validStates.map(v =>
        getNameStateRevserseKey(getHashedName(v.pubkey.toBase58()))
    );

    const infos = await connection.getMultipleAccountsInfo(reverseKeys);

    const priceMap: Record<string, number> = {};
    const stateMap = new Map<string, NameAuctionState>();

    infos.forEach((info, index) => {
        if (!info) return;

        const reverse = new NameAuctionStateReverse(info);
        const domain = reverse.domainName;
        const state = validStates[index].state;

        priceMap[domain] = state.highestPrice.toNumber();
        stateMap.set(domain, state);
    });

    return {
        priceMap,
        stateMap,
    };
}

