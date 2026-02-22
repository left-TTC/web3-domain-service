import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../../instruction";
import { Numberu32 } from "../../../common/number/number32";
import { Numberu64 } from "../../../common/number/number64";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";



export interface CreateSettleDomainInstructionAccounts {
    /// name service
    nameService: PublicKey,
    /// root Domain Account
    rootDomainAccountKey: PublicKey,
    /// domain name account
    name: PublicKey,
    /// domain auction state 
    domainStateAccountKey: PublicKey,
    /// system 
    systemAccount: PublicKey,
    /// central state
    centralState: PublicKey,
    /// buyer
    feePayer: PublicKey,
    /// origin name owner
    originNameOwner: PublicKey,
    /// origin name owner refferrer record
    originNameOwnerRecord: PublicKey,
    /// project vault
    vault: PublicKey,
    /// name account owner -- if init the name, this is unuseless
    newNameOwner: PublicKey,
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
    refferrerC: PublicKey | null,
    /// C's refferrer record account -- if C.key != vault
    refferrerCRecord: PublicKey | null,
}

export function createSettleDomainInstruction(
    transactionAccounts: CreateSettleDomainInstructionAccounts,

    domainName: string, // only name without root
    customDomainPrice: number | null,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.SettleName])),
        new Numberu32(Buffer.from(domainName).length).toBuffer(),
        Buffer.from(domainName, 'utf-8'),
        Buffer.from(Uint8Array.from([customDomainPrice ? 1 : 0])),
    ];

    if (customDomainPrice) {
        buffers.push(new Numberu64(customDomainPrice).toBuffer());
    }

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: transactionAccounts.nameService, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.rootDomainAccountKey, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.name, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.domainStateAccountKey, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.centralState, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.feePayer, isSigner: true, isWritable: true },

        { pubkey: transactionAccounts.originNameOwner, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.originNameOwnerRecord, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.newNameOwner, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.refferrerRecord, isSigner: false, isWritable: true },
        
        { pubkey: transactionAccounts.refferrerA, isSigner: false, isWritable: true },
    ];

    let canInsert = true

    if(transactionAccounts.refferrerARecord && canInsert){
        keys.push({
            pubkey: transactionAccounts.refferrerARecord,
            isSigner: false,
            isWritable: true
        })
    } else {
        keys.push({
            pubkey: PublicKey.default,
            isSigner: false,
            isWritable: false,
        });
        canInsert = false
    }

    if(canInsert && transactionAccounts.refferrerB){
        keys.push({
            pubkey: transactionAccounts.refferrerB,
            isSigner: false,
            isWritable: true
        })
    } else {
        keys.push({
            pubkey: PublicKey.default,
            isSigner: false,
            isWritable: false,
        });
        canInsert = false
    }

    if(canInsert && transactionAccounts.refferrerBRecord){
        keys.push({
            pubkey: transactionAccounts.refferrerBRecord,
            isSigner: false,
            isWritable: true
        })
    } else {
        keys.push({
            pubkey: PublicKey.default,
            isSigner: false,
            isWritable: false,
        });
        canInsert = false
    }

    if(canInsert && transactionAccounts.refferrerC){
        keys.push({
            pubkey: transactionAccounts.refferrerC,
            isSigner: false,
            isWritable: true
        })
    } else {
        keys.push({
            pubkey: PublicKey.default,
            isSigner: false,
            isWritable: false,
        });
    }

    if(canInsert && transactionAccounts.refferrerCRecord){
        keys.push({
            pubkey: transactionAccounts.refferrerCRecord,
            isSigner: false,
            isWritable: true
        })
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