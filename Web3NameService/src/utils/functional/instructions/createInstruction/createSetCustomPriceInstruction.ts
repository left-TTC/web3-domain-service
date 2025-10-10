import { TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { Web3NameSeriviceInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { Numberu64 } from "../../common/number/number64";
import { WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";


// directly use the web3 name service update function
export interface SetCustomPriceInstructionAccounts {
    // the domain that will be setted
    nameAccount: PublicKey,
    // updater
    nameUpdateSigner: PublicKey,
}

export function createSetCustomPriceInstruction(
    instructionAccounts: SetCustomPriceInstructionAccounts,
    customPrice: number,
): TransactionInstruction {
    const customPrice64 = new Numberu64(customPrice)
    const buffers = [
        Buffer.from(Uint8Array.from([Web3NameSeriviceInstruction.Update])),
        // offset
        new Numberu32(0).toBuffer(),
        new Numberu32(customPrice64.toBuffer().length).toBuffer(),
        customPrice64.toBuffer(),  
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: instructionAccounts.nameAccount, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.nameUpdateSigner, isSigner: true, isWritable: true },
    ]

    return new TransactionInstruction({
        programId: WEB3_NAME_SERVICE_ID,
        keys,
        data,
    });
}