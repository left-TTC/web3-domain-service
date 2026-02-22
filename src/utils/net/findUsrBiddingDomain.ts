import type { Connection, PublicKey } from "@solana/web3.js";
import { WEB3_REGISTER_ID } from "../constants/constants";
import { NameAuctionState } from "../functional/common/class/nameAuctionState";

export async function findUsrBiddingDomain(
    connection: Connection,
    usr: PublicKey | null,
): Promise<{
    validStates: NameAuctionState[]
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
    const validStates: NameAuctionState[] = []

    for (const acc of programAccounts) {
        const state = new NameAuctionState(acc.account);

        validStates.push(state);
    }

    return {validStates};
}

