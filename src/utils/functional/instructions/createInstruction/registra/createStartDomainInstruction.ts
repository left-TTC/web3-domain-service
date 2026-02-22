import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { Numberu32 } from "../../../common/number/number32";
import { Web3DomainRegistrarInstruction } from "../../instruction";
import type { Numberu64 } from "../../../common/number/number64";


export interface StartDomainInstructionAccounts {
    /// The naming service program ID
    namingServiceProgram: PublicKey,
    /// The root domain account
    rootDomain: PublicKey,
    /// The name account
    domainNameAccount: PublicKey,
    /// The reverse look up account
    reverseLookup: PublicKey,
    /// The domain auction state account
    domainStateAccount: PublicKey,
    /// The system program account
    systemProgram: PublicKey,
    /// The central state account
    centralState: PublicKey,
    /// The buyer account (fee payer)
    feePayer: PublicKey,
    /// The referrer record account
    referrerRecordAccount: PublicKey,
    /// Vault account
    vault: PublicKey,
    /// Last owner account
    lastOwner: PublicKey,
    /// rent sysvar
    rentSysvar: PublicKey,
    /// Referrer's referrer record account (optional)
    superiorReferrerRecord: PublicKey | null,
}

export function createStartDomainInstruction(
    instructionAccounts: StartDomainInstructionAccounts,
    referrerKey: PublicKey,
    name: string,
    rootName: string,
    priceSol: Numberu64,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.StartName])),
        new Numberu32(Buffer.from(name).length).toBuffer(),
        Buffer.from(name, 'utf8'),
        new Numberu32(Buffer.from(rootName).length).toBuffer(),
        Buffer.from(rootName, 'utf8'),
        priceSol.toBuffer(),
        referrerKey.toBuffer(),
    ];

    const data = Buffer.concat(buffers);

    const keys = [
        { pubkey: instructionAccounts.namingServiceProgram, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.rootDomain, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.domainNameAccount, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.reverseLookup, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.domainStateAccount, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.systemProgram, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.centralState, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: instructionAccounts.referrerRecordAccount, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.vault, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.lastOwner, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.rentSysvar, isSigner: false, isWritable: false },
    ];

    if (instructionAccounts.superiorReferrerRecord) {
        keys.push({
            pubkey: instructionAccounts.superiorReferrerRecord,
            isSigner: false,
            isWritable: false,
        });
    } else {
        keys.push({
            pubkey: PublicKey.default,
            isSigner: false,
            isWritable: false,
        });
    }

    return new TransactionInstruction({
        programId: WEB3_REGISTER_ID,
        keys,
        data,
    });
}