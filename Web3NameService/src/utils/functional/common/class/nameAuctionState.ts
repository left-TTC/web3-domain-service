import { type AccountInfo, PublicKey } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";


export const NAME_STATE_LENGTH = 80;


export class NameAuctionState {
    highestBidder: PublicKey;
    rentPayer: PublicKey;
    updateTime: Numberu64;
    highestPrice: Numberu64;

    constructor(nameStateInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const nameStateData = nameStateInfo.data;

        console.log(nameStateData.length)
        
        if (nameStateData.length < NAME_STATE_LENGTH) {
            throw new Error("Not a valid reverse account's data");
        }

        this.highestBidder = new PublicKey(nameStateData.subarray(0, 32));
        this.rentPayer = new PublicKey(nameStateData.subarray(32, 64));
        this.updateTime = Numberu64.fromBuffer(
            Buffer.from(nameStateData.subarray(64, 72))
        );
        this.highestPrice = Numberu64.fromBuffer(
            Buffer.from(nameStateData.subarray(72, 80))
        );
    }
}