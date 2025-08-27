import type { Connection } from "@solana/web3.js";

const WEB3_DOMIAN_SIZE: number = 96;


export async function checkRentExemption(
    connection: Connection,
    domainName: string
): Promise<number> {
    const finalSize = 2 * WEB3_DOMIAN_SIZE + Buffer.from(domainName).length;

    const rentLamport = await connection.getMinimumBalanceForRentExemption(finalSize);

    return parseFloat((rentLamport / 1_000_000_000).toFixed(4));
}