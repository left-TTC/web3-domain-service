import type { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import type { PublicKey } from "@solana/web3.js";
import { getMintPublickey } from "./checkMintAccountBalance";
import { getAssociatedTokenAddress } from "@solana/spl-token";



export async function getUsrMintSourceAccount(
    usrKey: PublicKey, 
    tokenType: MainMint | OtherMint
): Promise<PublicKey> {
    const mintKey = getMintPublickey(tokenType)
    return await getAssociatedTokenAddress(mintKey, usrKey)
}