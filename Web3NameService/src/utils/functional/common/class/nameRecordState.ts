import { PublicKey, type AccountInfo } from "@solana/web3.js"

export const nameRecordStateLength: number = 96
const SLICE: number = 32;

export class NameRecordState{
    parentName: PublicKey;
    owner: PublicKey;
    class: PublicKey;

    constructor(reversedInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const reversedData = reversedInfo.data;

        if (reversedData.length < 96) {
            throw new Error("Not a valid reverse account's data");
        }

        this.parentName = new PublicKey(reversedData.slice(0, SLICE));
        this.owner = new PublicKey(reversedData.slice(SLICE, SLICE*2));
        this.class = new PublicKey(reversedData.slice(SLICE*2, SLICE*3));
    }
}