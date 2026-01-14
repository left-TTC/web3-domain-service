import type { AccountInfo } from "@solana/web3.js";



export class NameAuctionStateReverse {
    domainName: string;

    constructor(nameReverseStateInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const nameReverseStateDate = nameReverseStateInfo.data

        const length = nameReverseStateDate.readUInt32LE(0);
        const strBytes = nameReverseStateDate.slice(4, 4 + length);

        this.domainName =  strBytes.toString("utf8");
    }
}