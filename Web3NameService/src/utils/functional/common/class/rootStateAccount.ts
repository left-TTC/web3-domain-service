import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";

const MIN_LENGTH = 72;

export class RootStateAccount {
    rootSponsor: PublicKey; //32
    fundState: Numberu64;   //8
    creatingName: string;   

    constructor(accountInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const accountData = accountInfo.data;

        if(accountData.length != MIN_LENGTH){
            throw new Error("funding Account Error");
        }


        this.rootSponsor = new PublicKey(accountData.slice(0, 32));
        console.log(accountData.slice(32, 40))
        this.fundState = Numberu64.fromBuffer(accountData.slice(32, 40));
        const nameArray = accountData.slice(40, 71)
        const trimmed = Array.from(nameArray).filter(b => b !== 0);
        const name = Buffer.from(trimmed).toString("utf8");
        this.creatingName = name

        console.log(this.rootSponsor.toBase58())
        console.log(this.fundState.toNumber())
        console.log(this.creatingName)
    }
}