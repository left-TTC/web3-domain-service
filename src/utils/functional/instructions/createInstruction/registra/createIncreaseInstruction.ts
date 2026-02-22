import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../../instruction";
import { Numberu32 } from "../../../common/number/number32";
import { Numberu64 } from "../../../common/number/number64";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";

export interface CreateIncreaseInstructionAccounts {
    /// The root domain account
    rootDomainAccountKey: PublicKey,
    /// The domain auction state account
    domainStateAccountKey: PublicKey,
    /// The system program account
    systemProgram: PublicKey,
    /// The buyer account (fee payer)
    feePayer: PublicKey,
    /// last bidder
    lastBidder: PublicKey,
    /// the vault
    vault: PublicKey,
    /// usr's referrer record
    referrerRecordAccount: PublicKey,
    /// last owner -- could be default
    lastOwner: PublicKey,
    /// The name account
    domainNameAccount: PublicKey,
    /// referrer's referrer record account (optional)
    superiorReferrerRecord: PublicKey | null,
}

export function createIncreaseInstruction(
    transactionAccounts: CreateIncreaseInstructionAccounts,
    referrerKey: PublicKey,
    myPriceSol: number,
    name: string,
    root: string,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.IncreasePrice])),
        new Numberu32(Buffer.from(name).length).toBuffer(),
        Buffer.from(name, 'utf-8'),
        new Numberu32(Buffer.from(root).length).toBuffer(),
        Buffer.from(root, 'utf-8'),
        new Numberu64(myPriceSol).toBuffer(),
        referrerKey.toBuffer()
    ];

    const data = Buffer.concat(buffers);

    const keys = [
        { pubkey: transactionAccounts.rootDomainAccountKey, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.domainStateAccountKey, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.systemProgram, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: transactionAccounts.lastBidder, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.referrerRecordAccount, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.lastOwner, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.domainNameAccount, isSigner: false, isWritable: false },
    ];

    if(transactionAccounts.superiorReferrerRecord){
        keys.push({
            pubkey: transactionAccounts.superiorReferrerRecord,
            isSigner: false,
            isWritable: false
        });
    }else{
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