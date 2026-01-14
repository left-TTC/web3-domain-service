import { HASH_PREFIX } from "../../constants/constants";
import { sha256 } from "js-sha256";
import { Buffer } from "buffer";


export function getHashedName(input: string):Buffer {
    const completeInput = HASH_PREFIX + input;
    const hashedHex = sha256(completeInput);
    const hashedBuffer = Buffer.from(hashedHex, "hex");

    return hashedBuffer;
}