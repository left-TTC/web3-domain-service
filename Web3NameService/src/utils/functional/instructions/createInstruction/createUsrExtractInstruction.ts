import { TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../instruction";
import { Numberu64 } from "../../common/number/number64";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";


export interface createUsrExtractInstructionAccounts {
    /// user
    user: PublicKey,
    /// user referrer record
    userReferrerRecord: PublicKey,
    /// project vault
    vault: PublicKey,
}

export function createUsrExtractInstruction (
    transactionAccounts: createUsrExtractInstructionAccounts,

    extraction: number,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.Extract])),
        new Numberu64(extraction).toBuffer()
    ]

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: transactionAccounts.user, isSigner: true, isWritable: true },
        { pubkey: transactionAccounts.userReferrerRecord, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },
    ];

    return new TransactionInstruction({
        programId: WEB3_REGISTER_ID,
        keys,
        data,
    });
}