

import { TransactionInstruction } from "@solana/web3.js";
import type { RecordType } from "../../solana/getRecordKey";
import { Web3RecordsInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { WEB3_RECORDS_ID } from "@/utils/constants/constants";
import type { IPFSInstructionAccounts } from "./createInitIPFSInstruction";



export function createResetIPFSInstruction(
    instructionAccounts: IPFSInstructionAccounts,
    newCid: string,
    recordType: RecordType,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3RecordsInstruction.EditRecord])),
        new Numberu32(Buffer.from(recordType).length).toBuffer(),
        Buffer.from(recordType),
        new Numberu32(Buffer.from(newCid).length).toBuffer(),
        Buffer.from(newCid)
    ]

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: instructionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.web3NameService, isSigner: false, isWritable: false },

        { pubkey: instructionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: instructionAccounts.recordAccount, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.domainAccount, isSigner: false, isWritable: false },

        { pubkey: instructionAccounts.centralState, isSigner: false, isWritable: false },
    ]

    return new TransactionInstruction({
        programId: WEB3_RECORDS_ID,
        keys,
        data,
    });
}