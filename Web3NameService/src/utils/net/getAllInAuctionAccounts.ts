import type { Connection, PublicKey } from "@solana/web3.js";
import { AUCTION_TIME } from "../functional/common/time/getDomainTimeState";
import { WEB3_REGISTER_ID } from "../constants/constants";


// 11-2 21：50: 1730435139
// hexadecimal: 0x671ef7e3


// use helius

// this function is used to find the most suitable accounts
export async function getAllAuctionAccounts(
    connection: Connection,
    apiKey: string,
): Promise<PublicKey[]> {

    const oldestBidTime = Math.floor(Date.now() / 1000) - AUCTION_TIME

    const heliusUrl = `https://api.helius.xyz/v0/addresses/${WEB3_REGISTER_ID}/accounts?api-key=${apiKey}`;

    const body = {
        filters: {
            fields: {
                update_time: { "$gte": oldestBidTime }
            }
        }
    };

    const res = await fetch(heliusUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    return []
} 