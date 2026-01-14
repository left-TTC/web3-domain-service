import { CENTRAL_STATE_REGISTER, WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";


export function getNameStateKey(
    hashed_name: Buffer,
    rootDomain: PublicKey
): PublicKey {
    const seeds = [hashed_name];

    seeds.push(CENTRAL_STATE_REGISTER.toBuffer())
    seeds.push(rootDomain.toBuffer())
   
    const [nameStateKey] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_REGISTER_ID,
    );

    return nameStateKey
}