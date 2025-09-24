import { WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { PublicKey } from "@solana/web3.js";




export function getRefferrerRecordKey(
    usr: PublicKey,
): PublicKey {
    const seeds = []

    seeds.push(usr.toBuffer())
    seeds.push(WEB3_REGISTER_ID.toBuffer())
    seeds.push(WEB3_REGISTER_ID.toBuffer())

    const [reffererRecordKey] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_REGISTER_ID
    )

    return reffererRecordKey
}