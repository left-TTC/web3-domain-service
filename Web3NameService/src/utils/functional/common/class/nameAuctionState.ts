import { type AccountInfo, PublicKey } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";


export const NAME_STATE_LENGTH = 49;


export class NameAuctionState {
    highestBidder: PublicKey;
    updateTime: Numberu64;
    highestPrice: Numberu64;
    settled: boolean;

    constructor(nameStateInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const nameStateData = nameStateInfo.data;

        console.log(nameStateData.length)
        
        if (nameStateData.length < NAME_STATE_LENGTH) {
            throw new Error("Not a valid reverse account's data");
        }

        this.highestBidder = new PublicKey(nameStateData.subarray(0, 32));
        this.updateTime = Numberu64.fromBuffer(
            Buffer.from(nameStateData.subarray(32, 40))
        );
        this.highestPrice = Numberu64.fromBuffer(
            Buffer.from(nameStateData.subarray(40, 48))
        );

        this.settled = nameStateData[48] === 1;
    }
}