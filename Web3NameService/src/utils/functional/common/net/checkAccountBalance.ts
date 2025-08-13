import { PublicKey, type Connection } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

export enum CheckMint {
    SOL = "So11111111111111111111111111111111111111112",
    USDT = "Es9vMFrzaCERz7gKXzSgjKX5Vh1GiJw6J4c6kY2bD1y",
    USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
}

export async function checkAccountBalance(
    connection: Connection,
    accountKey: PublicKey,
    mintType: CheckMint = CheckMint.SOL
): Promise<number> {

    if (mintType === CheckMint.SOL) {
        const lamports = await connection.getBalance(accountKey);
        return lamports / 1e9; 
    }

    try{
        const mintKey = new PublicKey(mintType);
        const tokenAccount = await getAssociatedTokenAddress(mintKey, accountKey);

        const accountInfo = await getAccount(connection, tokenAccount);
        const mintInfo = await connection.getParsedAccountInfo(mintKey);
        const decimals =
            mintInfo.value &&
            "parsed" in mintInfo.value.data &&
            mintInfo.value.data.parsed.info.decimals
                ? mintInfo.value.data.parsed.info.decimals
                : 0;

        return Number(accountInfo.amount) / Math.pow(10, decimals);
    } catch (err) {
        console.warn(`No token account found for ${mintType} on wallet ${accountKey.toBase58()}`);
        return 0;
    }
    
}