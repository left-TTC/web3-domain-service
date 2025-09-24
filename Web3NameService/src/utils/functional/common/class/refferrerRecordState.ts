import { PublicKey, type AccountInfo } from "@solana/web3.js"



export const REFFERRER_RECORD_LENGTH = 32

export class RefferrerRecordState {
    refferrer: PublicKey;

    constructor(recordInfo: AccountInfo<Buffer<ArrayBufferLike>>) {
        const data = recordInfo.data

        if(data.length < REFFERRER_RECORD_LENGTH) throw new Error("invalid reffferrer account data")

        this.refferrer = new PublicKey(data.subarray(0, 32))
    }
}