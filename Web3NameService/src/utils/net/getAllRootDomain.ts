import { Connection, PublicKey } from "@solana/web3.js";
import { CENTRAL_STATE_REGISTER, WEB3_NAME_SERVICE_ID } from "../constants/constants";


export async function getAllRootDomain(
    connetion: Connection
): Promise<PublicKey[]> {
    const filters = [
        {
            memcmp: {
                offset: 0,
                bytes: PublicKey.default.toBase58(),
            },
        },
        {
            memcmp: {
                offset: 32,
                bytes: CENTRAL_STATE_REGISTER.toBase58(),
            },
        },
        {
            memcmp: {
                offset: 64,
                bytes: PublicKey.default.toBase58(),
            },
        },
    ];

    const accounts = await connetion.getProgramAccounts(WEB3_NAME_SERVICE_ID, {
        filters,
        dataSlice: { offset: 0, length: 0},
    })

    return accounts.map((account) => account.pubkey);
}