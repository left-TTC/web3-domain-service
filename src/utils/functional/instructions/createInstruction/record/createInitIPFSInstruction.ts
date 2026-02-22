import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import type { RecordType } from "../../../solana/getRecordKey";
import { Web3RecordsInstruction } from "../../instruction";
import { Numberu32 } from "../../../common/number/number32";
import { WEB3_RECORDS_ID } from "@/utils/constants/constants";
import { UseProtocol } from "../../../common/class/ipfsRecordState";


export interface IPFSInstructionAccounts {
    /// system
    systemAccount: PublicKey,
    /// web3 name service
    web3NameService: PublicKey,
    /// fee payer and name owner
    feePayer: PublicKey,
    /// IPFS record account
    recordAccount: PublicKey,
    /// the related domain account
    domainAccount: PublicKey,
    /// record central state
    centralState: PublicKey,
}

export function createInitIPFSInstruction(
    instructionAccounts: IPFSInstructionAccounts,
    cid: string,
    recordType: RecordType,
    useProtocol: UseProtocol,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3RecordsInstruction.AllocateAndPostRecord])),
        new Numberu32(Buffer.from(recordType).length).toBuffer(),
        Buffer.from(recordType),
        Buffer.from([useProtocol === UseProtocol.IPFS? 0:1]),
        new Numberu32(Buffer.from(cid).length).toBuffer(),
        Buffer.from(cid)
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