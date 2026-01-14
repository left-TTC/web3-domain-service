import type { PublicKey } from "@solana/web3.js";
import { getReverseKey } from "./getReverseKey";


export function getMultipleReverseKeys(
    reversingDomainKeys: PublicKey[],
    reverseClassKey: PublicKey,
    parentKey: PublicKey | null = null,
): PublicKey[] {

    var reverseAccountKeys: PublicKey[] = [];

    for (const accountKey of reversingDomainKeys){
        reverseAccountKeys.push(getReverseKey(
            accountKey, reverseClassKey, parentKey
        ))
    }

    return reverseAccountKeys
}