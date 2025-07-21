
import { PublicKey, type AccountInfo } from "@solana/web3.js";

const SLICE: number = 32;
const VEC_LENGTH: number = 4;

export class ReverseKeyState{
    parentNameAccount: PublicKey;
    ownerAccount: PublicKey;
    classAccount: PublicKey;
    storagedData: string;

    constructor(reversedInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const reversedData = reversedInfo.data;

        if (reversedData.length < 96) {
            throw new Error("Not a valid reverse account's data");
        }

        this.parentNameAccount = new PublicKey(reversedData.slice(0, SLICE));
        this.ownerAccount = new PublicKey(reversedData.slice(SLICE, SLICE*2));
        this.classAccount = new PublicKey(reversedData.slice(SLICE*2, SLICE*3));
        this.storagedData = reversedData.slice(SLICE*3 + VEC_LENGTH).toString("utf-8");
    }
}