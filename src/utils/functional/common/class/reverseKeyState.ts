import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";

const SLICE: number = 32;
const VEC_LENGTH: number = 4;

export class ReverseKeyState {
    parentNameAccount: PublicKey;
    ownerAccount: PublicKey;
    classAccount: PublicKey;
    previewer: PublicKey;
    isFrozen: boolean;
    customPrice: Numberu64;
    storagedData: string;

    constructor(reversedInfo: AccountInfo<Buffer<ArrayBufferLike>>) {
        const reversedData = reversedInfo.data;

        if (reversedData.length < 106) {
            throw new Error("Not a valid reverse account's data");
        }

        this.parentNameAccount = new PublicKey(reversedData.subarray(0, SLICE));
        this.ownerAccount = new PublicKey(reversedData.subarray(SLICE, SLICE * 2));
        this.classAccount = new PublicKey(reversedData.subarray(SLICE * 2, SLICE * 3));
        this.previewer = new PublicKey(reversedData.subarray(SLICE * 3, SLICE * 4));
        this.isFrozen = reversedData.readUInt8(SLICE * 4) === 1;
        this.customPrice = Numberu64.fromBuffer(Buffer.from(reversedData.subarray(SLICE * 4 + 1, SLICE * 4 + 9)));
        
        const dataLengthBytes = reversedData.subarray(SLICE * 4 + 9, SLICE * 4 + 9 + VEC_LENGTH);
        const dataLength = dataLengthBytes.readUInt32LE(0);
        const dataStartPos = SLICE * 4 + 9 + VEC_LENGTH;
        const dataEndPos = dataStartPos + dataLength;
        
        this.storagedData = reversedData.subarray(dataStartPos, dataEndPos).toString("utf-8");
    }
}