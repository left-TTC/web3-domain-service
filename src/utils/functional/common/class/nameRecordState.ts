import { PublicKey, type AccountInfo } from "@solana/web3.js"
import { Numberu64 } from "../number/number64";

export const NAME_RECORD_LENGTH: number = 137 // 32 + 32 + 32 + 32 + 1 + 8 + 1

const SLICE: number = 32;

export class NameRecordState {
    parentName: PublicKey; 
    owner: PublicKey;
    class: PublicKey;
    previewer: PublicKey;
    isFrozen: boolean;
    customPrice: Numberu64;

    constructor(reversedInfo: AccountInfo<Buffer<ArrayBufferLike>>) {
        const reversedData = reversedInfo.data;

        if (reversedData.length < NAME_RECORD_LENGTH) {
            throw new Error("Not a valid name account's data");
        }

        this.parentName = new PublicKey(reversedData.subarray(0, SLICE));
        this.owner = new PublicKey(reversedData.subarray(SLICE, SLICE * 2));
        this.class = new PublicKey(reversedData.subarray(SLICE * 2, SLICE * 3));
        this.previewer = new PublicKey(reversedData.subarray(SLICE * 3, SLICE * 4));
        this.isFrozen = reversedData.readUInt8(SLICE * 4) === 1;
        this.customPrice = Numberu64.fromBuffer(
            Buffer.from(reversedData.subarray(SLICE * 4 + 1, SLICE * 4 + 9))
        );
    }
}