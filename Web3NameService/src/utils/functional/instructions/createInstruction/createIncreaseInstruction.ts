import { PublicKey, TransactionInstruction } from "@solana/web3.js";
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

        { pubkey: transactionAccounts.lastBidderKey, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.refferrerRecord, isSigner: false, isWritable: true },
    ];

    if(transactionAccounts.superiorRefferrerRecord){
         keys.push({
            pubkey: transactionAccounts.superiorRefferrerRecord,
            isSigner: false,
            isWritable: false
        })
    }else{
        keys.push({
            pubkey: PublicKey.default,
            isSigner: false,
            isWritable: false,
        });
    }

    if(transactionAccounts.rent){
         keys.push({
            pubkey: transactionAccounts.rent,
            isSigner: false,
            isWritable: false
        })
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
    })
}