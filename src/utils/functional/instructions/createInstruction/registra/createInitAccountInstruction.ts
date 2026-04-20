import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../../instruction";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";


export interface InitAccountInstructionAccounts {
    /// fee payer -- writable and signer
    feePayer: PublicKey,
    /// system account
    systemAccount: PublicKey,
    /// referrer record account
    referrerRecord: PublicKey,
    /// The vault account     
    vault: PublicKey,
    /// super referrer record account (optional)
    superReferrerRecord: PublicKey | null,
}


export function createInitAccountInstruction(
    instructionAccounts: InitAccountInstructionAccounts,
    referrerKey: PublicKey,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.InitAccount])),
        referrerKey.toBuffer(),
    ];

    const data = Buffer.concat(buffers);

    const keys = [
        { pubkey: instructionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: instructionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.referrerRecord, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.vault, isSigner: false, isWritable: true },
    ];

    if (instructionAccounts.superReferrerRecord) {
        keys.push({
            pubkey: instructionAccounts.superReferrerRecord,
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
