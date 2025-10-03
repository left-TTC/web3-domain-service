import type { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { Numberu64 } from "../../common/number/number64";



export interface CreateSettleDomainInstructionAccounts {
    /// name service
    nameService: PublicKey,
    /// root Domain Account
    rootDomainAccountKey: PublicKey,
    /// domain name account
    name: PublicKey,
    /// domain name reverse
    reverse: PublicKey,
    /// domain auction state 
    domainStateAccountKey: PublicKey,
    /// system 
    systemAccount: PublicKey,
    /// central state
    centralState: PublicKey,
    /// buyer
    feePayer: PublicKey,
    /// pyth feed account
    pythFeedAccountKey: PublicKey,
    /// rent sysvar
    rentSysvar: PublicKey,
    /// name account owner -- if init the name, this is unuseless
    nameOwner: PublicKey | null,
    /// usr's refferrer record account
    refferrerRecord: PublicKey,
    /// usr's refferrer
    refferrerA: PublicKey,
    /// A's refferrer record account -- if A.key != vault
    refferrerARecord: PublicKey | null,
    /// A's refferrer -- B (if refferrerARecord is exsited, this must be exsited too)
    refferrerB: PublicKey | null,
    /// B's refferrer record account -- if B.key != vault
    refferrerBRecord: PublicKey | null,
    /// B's refferrer -- C (if refferrerBRecord is exsited, this must be exsited too)
    refferrerC: PublicKey,
}

export function createSettleDomainInstruction(
    transactionAccounts: CreateSettleDomainInstructionAccounts,

    domainName: string, // only name without root
    customDomainPrice: number | null,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.SettleName])),
        new Numberu32(Buffer.from(domainName).length).toBuffer(),
        Buffer.from(domainName, 'utf-8')
    ];

    if (customDomainPrice) {
        buffers.push(new Numberu64(customDomainPrice).toBuffer());
    }

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: transactionAccounts.nameService, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.rootDomainAccountKey, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.name, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.reverse, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.domainStateAccountKey, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.centralState, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.feePayer, isSigner: true, isWritable: true },

        { pubkey: transactionAccounts.pythFeedAccountKey, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.rentSysvar, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.nameOwner, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.refferrerRecord, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.refferrerA, isSigner: false, isWritable: false },
    ];

    if(transactionAccounts.)
}