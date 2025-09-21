import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { getPythProgramKeyForCluster, PythHttpClient, type PythCluster } from "@pythnetwork/client";
import { PublicKey, type Connection } from "@solana/web3.js";


export async function getPythFeedAccount(
    connection: Connection,
    mint: MainMint
): Promise<PublicKey | null> {
    const cluster: PythCluster = "devnet"; // 或 "mainnet-beta"
    const pythProgramKey = getPythProgramKeyForCluster(cluster);
    const pythClient = new PythHttpClient(connection, pythProgramKey);

    const data = await pythClient.getData();

    const wantedMap: Record<MainMint, string> = {
        [MainMint.SOL]: "Crypto.SOL/USD",
        [MainMint.USDC]: "Crypto.USDC/USD",
        [MainMint.USDT]: "Crypto.USDT/USD",
    };

    const targetSym = wantedMap[mint];
    if (!targetSym) {
        console.warn(`⚠️ Unsupported mint: ${mint}`);
        return null;
    }

    for (const [symbol, priceData] of data.productPrice.entries()) {
        if (symbol === targetSym || symbol.endsWith(targetSym.replace("Crypto.", ""))) {
            return priceData.nextPriceAccountKey; 
        }
    }

    console.warn(`⚠️ No Pyth feed account found for ${targetSym}`);
    return null;
}


export function returnPythFeedAccount(
    useMint: SupportedMint
): PublicKey {
    switch(useMint){
        case SupportedMint.SOL:
            //main net 
            return new PublicKey("7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE")
        default: 
            return new PublicKey("7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE")
    }
}