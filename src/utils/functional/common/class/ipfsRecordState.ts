import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";

const SLICE: number = 32;

export enum UseProtocol {
    IPFS = "ipfs",
    IPNS = "ipns",
    Tor = "tor",
}

export class IPFSRecordState {
    parentName: PublicKey;
    owner: PublicKey;
    class: PublicKey;
    previewer: PublicKey;
    isFrozen: boolean;
    updataTime: Numberu64;
    recordType: UseProtocol;
    setter: PublicKey;
    recordData: string | null;
    length: number;

    constructor(recordInfo: AccountInfo<Buffer<ArrayBufferLike>>) {
        const data = recordInfo.data;

        if(data.length < 170) {
            throw new Error("Not a valid record account's data");
        }

        this.length = data.length;

        // Parse NameRecordHeader (138 bytes total)
        this.parentName = new PublicKey(data.subarray(0, SLICE));
        this.owner = new PublicKey(data.subarray(SLICE, SLICE * 2));
        this.class = new PublicKey(data.subarray(SLICE * 2, SLICE * 3));
        this.previewer = new PublicKey(data.subarray(SLICE * 3, SLICE * 4));
        this.isFrozen = data.readUInt8(SLICE * 4) === 1;
        this.updataTime = Numberu64.fromBuffer(
            Buffer.from(data.subarray(SLICE * 4 + 1, SLICE * 4 + 9))
        );

        // Parse record type (1 byte)
        const typeBuffer = data.readUInt8(SLICE * 4 + 9);
        if (typeBuffer === 0){
            this.recordType = UseProtocol.IPFS
        }else if(typeBuffer === 1){
            this.recordType = UseProtocol.IPNS
        }else {
            this.recordType = UseProtocol.Tor
        }

        // Parse setter (32 bytes)
        this.setter = new PublicKey(data.subarray(SLICE * 4 + 10, SLICE * 4 + 42));

        // Parse record content (Vec<u8> with 4-byte length prefix)
        const contentLengthBytes = data.subarray(SLICE * 4 + 42, SLICE * 4 + 46);
        const contentLength = contentLengthBytes.readUInt32LE(0);
        const contentStartPos = SLICE * 4 + 46;
        const contentEndPos = contentStartPos + contentLength;

        const recordContentBuffer = data.subarray(contentStartPos, contentEndPos);
        const isAllZero = recordContentBuffer.every(byte => byte === 0);

        this.recordData = !isAllZero ? new TextDecoder("utf-8").decode(recordContentBuffer) : null;
    }
}