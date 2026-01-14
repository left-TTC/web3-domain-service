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



// for test
export function createMockState(
    overrides?: Partial<{
        highestBidder: PublicKey;
        updateTime: bigint;
        highestPrice: bigint;
        settled: boolean;
    }>
): NameAuctionState {
    
    const highestBidder =
        overrides?.highestBidder ?? PublicKey.default;
    const updateTime =
        overrides?.updateTime ?? 0n;
    const highestPrice =
        overrides?.highestPrice ?? 0n;
    const settled =
        overrides?.settled ?? false;

    const buffer = Buffer.alloc(NAME_STATE_LENGTH);

    highestBidder.toBuffer().copy(buffer, 0);

    new Numberu64(updateTime)
        .toBuffer()
        .copy(buffer, 32);

    new Numberu64(highestPrice)
        .toBuffer()
        .copy(buffer, 40);

    buffer[48] = settled ? 1 : 0;

    const mockAccountInfo: AccountInfo<Buffer> = {
        data: buffer,
        executable: false,
        lamports: 0,
        owner: PublicKey.default,
        rentEpoch: 0,
    };

    return new NameAuctionState(mockAccountInfo);
}
