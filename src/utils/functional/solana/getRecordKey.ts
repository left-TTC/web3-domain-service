import type { PublicKey } from "@solana/web3.js";
import { getNameAccountKey } from "./getNameAccountKey";
import { getHashedName } from "./getHashedName";
import { CENTRAL_STATE_RECORDS } from "@/utils/constants/constants";


export enum RecordType {
    IPFS = "IPFS"
}

export function getRecordKey(
    nameAccount: PublicKey,
    recordType: RecordType,
): PublicKey {
    return getNameAccountKey(
        getHashedName(recordType), CENTRAL_STATE_RECORDS, nameAccount
    )
}