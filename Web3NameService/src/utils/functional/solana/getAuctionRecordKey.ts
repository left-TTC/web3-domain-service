import { WEB3_AUCTION_ID } from "@/utils/constants/constants";
import { PublicKey } from "@solana/web3.js";



export function getAuctionRecordKey(
    hashed_name: Buffer,
    nameClass: PublicKey | null = null,
    nameParent: PublicKey | null = null,
): PublicKey {
    const seeds = [hashed_name];
    if (nameClass) {
        seeds.push(nameClass.toBuffer());
    } else {
        seeds.push(Buffer.alloc(32));
    }
    if (nameParent) {
        seeds.push(nameParent.toBuffer());
    } else {
        seeds.push(Buffer.alloc(32));
    }
    const [nameAccountKey] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_AUCTION_ID,
    );
    return nameAccountKey;
};