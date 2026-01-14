import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";

const MIN_LENGTH = 72;

export class rootStateAccount {
    rootSponsor: PublicKey; //32
    fundState: Numberu64;   //8
    creatingName: string;   
    // add an supporter

    constructor(accountInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const accountData = accountInfo.data;

        if(accountData.length != MIN_LENGTH){
            throw new Error("funding Account Error");
        }


        this.rootSponsor = new PublicKey(accountData.subarray(0, 32));

        this.fundState = Numberu64.fromBuffer(accountData.subarray(32, 40));

        const nameArray = accountData.subarray(40, 71)
        const trimmed = Array.from(nameArray).filter(b => b !== 0);
        const name = Buffer.from(trimmed).toString("utf8");
        this.creatingName = name
    }
}