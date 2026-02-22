import { type AccountInfo, PublicKey } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";


export const NAME_STATE_LENGTH = 96; // 32 + 8 + 8 + 16 + 32


export class NameAuctionState {
    highestBidder: PublicKey;
    updateTime: Numberu64;
    highestPrice: Numberu64;
    root: string;
    name: string;

    constructor(nameStateInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const nameStateData = nameStateInfo.data;

        if (nameStateData.length < NAME_STATE_LENGTH) {
            throw new Error("Not a valid name auction account's data");
        }

        this.highestBidder = new PublicKey(nameStateData.subarray(0, 32));
        this.updateTime = Numberu64.fromBuffer(
            Buffer.from(nameStateData.subarray(32, 40))
        );
        this.highestPrice = Numberu64.fromBuffer(
            Buffer.from(nameStateData.subarray(40, 48))
        );
        
        const rootArray = nameStateData.subarray(48, 64);
        const rootTrimmed = Array.from(rootArray).filter(b => b !== 0);
        this.root = Buffer.from(rootTrimmed).toString("utf-8");
        
        const nameArray = nameStateData.subarray(64, 96);
        const nameTrimmed = Array.from(nameArray).filter(b => b !== 0);
        this.name = Buffer.from(nameTrimmed).toString("utf-8");
    }

    getName(): string {
        return `${this.name}.${this.root}`;
    }
}



// for test
export function createMockState(
    overrides?: Partial<{
        highestBidder: PublicKey;
        updateTime: bigint;
        highestPrice: bigint;
        root: string;
        name: string;
    }>
): NameAuctionState {
    
    const highestBidder =
        overrides?.highestBidder ?? PublicKey.default;
    const updateTime =
        overrides?.updateTime ?? 0n;
    const highestPrice =
        overrides?.highestPrice ?? 0n;
    const root =
        overrides?.root ?? "kilo";
    const name =
        overrides?.name ?? "asasd";

    const buffer = Buffer.alloc(NAME_STATE_LENGTH);

    highestBidder.toBuffer().copy(buffer, 0);

    new Numberu64(updateTime)
        .toBuffer()
        .copy(buffer, 32);

    new Numberu64(highestPrice)
        .toBuffer()
        .copy(buffer, 40);

    // 48 - 64: root (max 16 bytes)
    const rootBuf = Buffer.from(root, "utf-8");
    if (rootBuf.length > 16) {
        throw new Error("root too long (max 16 bytes)");
    }
    rootBuf.copy(buffer, 48);

    // 64 - 96: name (max 32 bytes)
    const nameBuf = Buffer.from(name, "utf-8");
    if (nameBuf.length > 32) {
        throw new Error("name too long (max 32 bytes)");
    }
    nameBuf.copy(buffer, 64);

    const mockAccountInfo: AccountInfo<Buffer> = {
        data: buffer,
        executable: false,
        lamports: 0,
        owner: PublicKey.default,
        rentEpoch: 0,
    };

    return new NameAuctionState(mockAccountInfo);
}
