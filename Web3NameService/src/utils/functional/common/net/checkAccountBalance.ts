import { PublicKey, type Connection } from "@solana/web3.js";
import { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { checkMintAccountBalance } from "./checkMintAccountBalance";

//devnet

export async function checkAccountBalance(
    connection: Connection,
    accountKey: PublicKey,
    mintType: MainMint | OtherMint = MainMint.SOL
): Promise<number[]> {
    //when check sol, we will check wsol and origin sol

    if (mintType === MainMint.SOL) {
        const lamports = await connection.getBalance(accountKey);
        const WSOLTokens = await checkMintAccountBalance(mintType, connection, accountKey)
        return [lamports / 1e9, WSOLTokens / 1e9]; 
    }

    return [await checkMintAccountBalance(mintType, connection, accountKey)] 
}

