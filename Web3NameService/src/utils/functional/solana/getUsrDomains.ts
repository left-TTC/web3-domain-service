import type { Connection, PublicKey } from "@solana/web3.js";



export async function getUsrDomains(
    connection: Connection,
    wallet: PublicKey,
): Promise<string[]> {

    return [""]
}