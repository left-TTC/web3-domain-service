import { WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { PublicKey } from "@solana/web3.js";
import { getHashedName } from "./getHashedName";


export function getRefferrerRecordKey(
    usr: PublicKey,
): PublicKey {
    const seeds = []

    const hashedUsr = getHashedName(usr.toBase58())

    seeds.push(hashedUsr)
    seeds.push(WEB3_REGISTER_ID.toBuffer())
    seeds.push(WEB3_REGISTER_ID.toBuffer())

    const [reffererRecordKey] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_REGISTER_ID
    )

    return reffererRecordKey
}