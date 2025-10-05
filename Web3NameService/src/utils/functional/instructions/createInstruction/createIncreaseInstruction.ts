import { TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { Numberu64 } from "../../common/number/number64";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";




export interface CreateIncreaseInstructionAccounts {
    /// root Domain Account
    rootDomainAccountKey: PublicKey,
    /// domain auction state -- writable
    domainStateAccountKey: PublicKey,
    /// system 
    systemAccount: PublicKey,
    /// bidder
    feePayer: PublicKey,
    /// pyth feed account
    pythFeedAccountKey: PublicKey,
    /// last bidder -- returm the deposit
    lastBidderKey: PublicKey,
    /// vault
    vault: PublicKey,
    /// usr's refferrer record account
    refferrerRecord: PublicKey,
    /// refferrer's refferrer record
    superiorRefferrerRecord: PublicKey | null,
    /// rent -- if the usr need create the record
    rent: PublicKey | null,
}

export function createIncreaseInstruction(
    transactionAccounts: CreateIncreaseInstructionAccounts,

    refferrerKey: PublicKey,
    myPrice: number, // origin + bid increment
    domainName: string // cutted domain
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.IncreasePrice])),
        new Numberu32(Buffer.from(domainName).length).toBuffer(),
        Buffer.from(domainName, 'utf-8'),
        new Numberu64(myPrice).toBuffer(),
        refferrerKey.toBuffer()
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: transactionAccounts.rootDomainAccountKey, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.domainStateAccountKey, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.systemAccount, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.feePayer, isSigner: true, isWritable: true },

        { pubkey: transactionAccounts.pythFeedAccountKey, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.lastBidderKey, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },
    ];

    return new TransactionInstruction({
        programId: WEB3_REGISTER_ID,
        keys,
        data,
    })
}