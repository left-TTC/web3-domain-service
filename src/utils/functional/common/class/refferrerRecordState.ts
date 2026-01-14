import { PublicKey, type AccountInfo } from "@solana/web3.js"
import { Numberu64 } from "../number/number64";



export const REFFERRER_RECORD_LENGTH = 56

export class RefferrerRecordState {
    refferrer: PublicKey;
    profit: Numberu64;
    volume: Numberu64;
    createTime: Numberu64;

    constructor(recordInfo: AccountInfo<Buffer<ArrayBufferLike>>) {
        const data = recordInfo.data

        if(data.length < REFFERRER_RECORD_LENGTH) throw new Error("invalid reffferrer account data")

        this.refferrer = new PublicKey(data.subarray(0, 32))
        this.profit = Numberu64.fromBuffer(Buffer.from(data.subarray(32, 40)));
        this.volume = Numberu64.fromBuffer(Buffer.from(data.subarray(40, 48)));
        this.createTime = Numberu64.fromBuffer(Buffer.from(data.subarray(48, 56)));
    }
}