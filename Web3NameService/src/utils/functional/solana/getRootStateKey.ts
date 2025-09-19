import { WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { PublicKey } from "@solana/web3.js";



export function getRootStateKey(
    hashed_name: Buffer,
): PublicKey {
    const seeds = [hashed_name];
    seeds.push(Buffer.alloc(32));
    seeds.push(Buffer.alloc(32));

    const [nameAccountKey] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_REGISTER_ID,
    );

    return nameAccountKey;
};