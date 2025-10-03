import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { Numberu32 } from "../../common/number/number32";
import {Web3DomainRegistrarInstruction } from "../instruction";
import type { Numberu64 } from "../../common/number/number64";


export interface StartDomainInstructionAccounts {
    /// 1.name service program => constant
    nameService: PublicKey,
    /// root domain account
    rootDomainAccount: PublicKey,
    /// domain name
    name: PublicKey,
    /// name state
    domainNameState: PublicKey,
    /// name state reverse
    domainNameStateReverse: PublicKey,
    /// system account
    systemAccount: PublicKey,
    /// central state register
    centralState: PublicKey,
    /// rent and gas payer, also be the frist bidder
    feePayer: PublicKey,
    /// pyth seed account
    pythFeedAccount: PublicKey,
    /// rent sysvar
    rentSysvar: PublicKey,
    /// refferrer
    refferrer: PublicKey,
    /// refferrer record -- the account that record usr's refferrer
    refferrerRecord: PublicKey,
    /// vault
    vault: PublicKey,
    /// rent payer -- the name state account's rent exemption payer
    rentPayer: PublicKey,
    /// superior referrer record -- the refferrer's refferrer record account
    superiorReferrerRecord: PublicKey | null, 
}

export function createStartDomainInstruction(
    instructionAccounts: StartDomainInstructionAccounts,
    domainName: string,
    rootDomain: string,
    domainPrice: Numberu64,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.StartName])),
        new Numberu32(Buffer.from(domainName).length).toBuffer(),
        Buffer.from(domainName, 'utf8'),
        new Numberu32(Buffer.from(rootDomain).length).toBuffer(),
        Buffer.from(rootDomain, 'utf8'),
        domainPrice.toBuffer()
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: instructionAccounts.nameService, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.rootDomainAccount, isSigner: false, isWritable: false },

        { pubkey: instructionAccounts.name, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.domainNameState, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.domainNameStateReverse, isSigner: false, isWritable: true },

        { pubkey: instructionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.centralState, isSigner: false, isWritable: false },

        { pubkey: instructionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: instructionAccounts.pythFeedAccount, isSigner: false, isWritable: false },

        { pubkey: instructionAccounts.rentSysvar, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.refferrer, isSigner: false, isWritable: false },
        { pubkey: instructionAccounts.refferrerRecord, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.vault, isSigner: false, isWritable: true },
        { pubkey: instructionAccounts.rentPayer, isSigner: false, isWritable: false },
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