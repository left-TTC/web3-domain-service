import { MainFint, OtherFint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";





export async function checkMintAccountBalance(
    mintType: MainFint | OtherFint = MainFint.SOL,
    connection: Connection,
    accountKey: PublicKey,
): Promise<number> {
    try{
        const mintKey = getMintPublickey(mintType);
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

export function getMintPublickey(mintType: MainFint | OtherFint): PublicKey{
    switch(mintType){
        case MainFint.SOL:
            //return wsol
            return new PublicKey("So11111111111111111111111111111111111111112")
        case MainFint.USDC:
            return new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")
        case MainFint.USDT:
            return new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
        case OtherFint.FWC:
            return new PublicKey("FLEYqPkSSUoZXywYaKoN7eRPDFWDM6THLz2kuW9zKwHE")
    }
}