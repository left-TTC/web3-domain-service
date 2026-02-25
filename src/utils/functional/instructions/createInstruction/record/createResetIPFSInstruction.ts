

import { TransactionInstruction } from "@solana/web3.js";
import type { RecordType } from "../../../solana/getRecordKey";
import { Web3RecordsInstruction } from "../../instruction";
import { Numberu32 } from "../../../common/number/number32";
import { WEB3_RECORDS_ID } from "@/utils/constants/constants";
import type { IPFSInstructionAccounts } from "./createInitIPFSInstruction";
import { UseProtocol } from "../../../common/class/ipfsRecordState";



export function createResetIPFSInstruction(
    instructionAccounts: IPFSInstructionAccounts,
    newCid: string,
    recordType: RecordType,
    useProtocol: UseProtocol,
): TransactionInstruction {

    let x;
    switch(useProtocol){
        case UseProtocol.IPFS:
            x = [0x00]
            break
        case UseProtocol.IPNS:
            x = [0x01]
            break
        default:
            x = [0x02]
            break
    }

    const buffers = [
        Buffer.from(Uint8Array.from([Web3RecordsInstruction.EditRecord])),
        new Numberu32(Buffer.from(recordType).length).toBuffer(),
        Buffer.from(recordType),
        Buffer.from(x),
        new Numberu32(Buffer.from(newCid).length).toBuffer(),
        Buffer.from(newCid),
    ]

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: instructionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.web3NameService, isSigner: false, isWritable: false },

        { pubkey: instructionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: instructionAccounts.recordAccount, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.domainAccount, isSigner: false, isWritable: false },

        { pubkey: instructionAccounts.centralState, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.lastSetter, isSigner: false, isWritable: true },
    ]

    return new TransactionInstruction({
        programId: WEB3_RECORDS_ID,
        keys,
        data,
    });
}