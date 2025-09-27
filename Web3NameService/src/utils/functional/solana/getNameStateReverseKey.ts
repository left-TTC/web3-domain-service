import { CENTRAL_STATE_REGISTER, WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";


export function getNameStateRevserseKey(
    hashed_name: Buffer,
): PublicKey {
    const seeds = [hashed_name];

    seeds.push(CENTRAL_STATE_REGISTER.toBuffer())
    seeds.push(Buffer.alloc(32));
   
    const [nameStateKey] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_REGISTER_ID,
    );

    return nameStateKey
}