import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";
import { NAME_RECORD_LENGTH } from "./nameRecordState";



export class IPFSRecordState{
    parentName: PublicKey;
    owner: PublicKey;
    class: PublicKey;
    updateTime: Numberu64;
    recordData: string | null;
    length: number;

    constructor(recordInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const recordData = recordInfo.data

        if(recordData.length <= NAME_RECORD_LENGTH){
            throw new Error("Not a valid record account's data");
        }

        this.length = recordData.length

        this.parentName = new PublicKey(recordData.subarray(0, 32));
        this.owner = new PublicKey(recordData.subarray(32, 64));
        this.class = new PublicKey(recordData.subarray(64, 96));
        this.updateTime = Numberu64.fromBuffer(
            Buffer.from(recordData.subarray(96, NAME_RECORD_LENGTH))
        );

        const recordContentBuffer = recordData.subarray(NAME_RECORD_LENGTH, recordData.length)
        const isAllZero = recordContentBuffer.every(byte => byte === 0);

        let recordContent: string | null = null;

        if (!isAllZero) {
            recordContent = new TextDecoder("utf-8").decode(recordContentBuffer);
        }

        this.recordData = recordContent
    }
}