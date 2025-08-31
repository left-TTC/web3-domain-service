import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";

const MIN_LENGTH = 41;
export const FIXED_SIZE = 40

export class FundingAccountState {
    rootSponsor: PublicKey; //32
    fundState: Numberu64;   //8
    creatingName: string;   

    constructor(accountInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const accountData = accountInfo.data;

        if(accountData.length < MIN_LENGTH){
            throw new Error("funding Account Error");
        }

        this.rootSponsor = new PublicKey(accountData.slice(0, 32));
        this.fundState = Numberu64.fromBuffer(accountData.slice(32, 40));
        const nameLength = accountData.readUInt32LE(40);
        const nameBytes = accountData.slice(44, 44 + nameLength);
        this.creatingName = nameBytes.toString("utf-8");
    }
}