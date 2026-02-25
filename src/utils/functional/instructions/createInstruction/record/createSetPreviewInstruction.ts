import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Web3RecordsInstruction } from "../../instruction";
import { Numberu32 } from "../../../common/number/number32";
import { WEB3_RECORDS_ID } from "@/utils/constants/constants";
import type { RecordType } from "@/utils/functional/solana/getRecordKey";
import { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";

export interface SetPreviewInstructionAccounts {
    /// The system program account
    systemProgram: PublicKey,
    /// The web3 name service program account
    web3NameService: PublicKey,
    /// The fee payer account (must be domain owner)
    feePayer: PublicKey,
    /// The record account to update
    record: PublicKey,
    /// The domain account owning this record
    domainAccount: PublicKey,
    /// The root domain account
    rootAccount: PublicKey,
    /// The domain name state account
    domainNameState: PublicKey,
    /// The record central state account
    centralState: PublicKey,
    /// Last setter -- can be pubkey::default()
    lastSetter: PublicKey,
}

export function createSetPreviewInstruction(
    instructionAccounts: SetPreviewInstructionAccounts,
    recordGate: RecordType,
    protocol: UseProtocol,
    content: string,
    name: string,
    root: string,
): TransactionInstruction {

    let x;
    switch(protocol){
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
        Buffer.from(Uint8Array.from([Web3RecordsInstruction.SetPreview])),
        new Numberu32(Buffer.from(recordGate).length).toBuffer(),
        Buffer.from(recordGate),
        Buffer.from(x),
        new Numberu32(Buffer.from(name).length).toBuffer(),
        Buffer.from(name),
        new Numberu32(Buffer.from(root).length).toBuffer(),
        Buffer.from(root),
        new Numberu32(Buffer.from(content).length).toBuffer(),
        Buffer.from(content),
    ];

    const data = Buffer.concat(buffers);

    const keys = [
        { pubkey: instructionAccounts.systemProgram, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.web3NameService, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: instructionAccounts.record, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.domainAccount, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.rootAccount, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.domainNameState, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.centralState, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.lastSetter, isSigner: false, isWritable: true },
    ];

    return new TransactionInstruction({
        programId: WEB3_RECORDS_ID,
        keys,
        data,
    });
}
