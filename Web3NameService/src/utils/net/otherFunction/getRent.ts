import type { Connection } from "@solana/web3.js";



export async function getRent(
    connection: Connection,
    length: number,
): Promise<number> {
    return await connection.getMinimumBalanceForRentExemption(length);
}