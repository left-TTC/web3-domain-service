import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { PublicKey } from "@solana/web3.js";


export function getSupportedPythFeed(): Map<SupportedMint, PublicKey> {

    return new Map<SupportedMint, PublicKey> ([
        [SupportedMint.SOL, new PublicKey("7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE")]
    ])
}