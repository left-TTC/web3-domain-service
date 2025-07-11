import { PublicKey } from "@solana/web3.js";
import { getHashedName } from "./getHashedName";
import { getNameAccountKey } from "./getNameAccountKey";



export function getReverseKey(
    reversingDomainKey: PublicKey,
    reverseClassKey: PublicKey,
    parentKey: PublicKey | null,
): PublicKey {

    const hashedDomainKeyStr = getHashedName(reversingDomainKey.toBase58());

    return getNameAccountKey(
        hashedDomainKeyStr,
        reverseClassKey,
        parentKey
    )
}