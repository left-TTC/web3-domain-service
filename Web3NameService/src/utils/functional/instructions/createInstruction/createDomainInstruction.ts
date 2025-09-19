import { PublicKey, TransactionInstruction, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import {  TOKEN_PROGRAM_ID, WEB3_NAME_SERVICE_ID, WEB3_REGISTER_ID } from "@/utils/constants/constants";
import { Numberu32 } from "../../common/number/number32";
import { RegisterInstruction } from "../instruction";



export function createDomainInstruction(
    //1.name service program => constant
    //2.using root domain's account key
    rootDomainAccount: PublicKey,
    //3.name account (writable)
    domainNameAccount: PublicKey,
    //4.reverse lookup account key
    domainReverseAccount: PublicKey,
    //5.system account => constant
    //6.central state account
    centralStateAccount: PublicKey,
    //7.buyer, transaction sponor
    buyerAccount: PublicKey,
    //8.domainOwner
    domainOwnerAccount: PublicKey,
    //9.regitser fee payer
    feePayerAccount: PublicKey,
    //10.buyer mint tokenAccount
    buyerTokenSource: PublicKey,
    //11.pyth feed account => constant
    //12.vault
    vault: PublicKey,
    //13.spl token => constant
    //14.rent saver => constant
    //15.referrer account (optional)
    refereerAccount: PublicKey | null,
    
    domainName: string,
    space: Numberu32
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([RegisterInstruction.Create])),
        new Numberu32(Buffer.from(domainName).length).toBuffer(),
        Buffer.from(domainName, 'utf8'),
        space.toBuffer(),
        Buffer.from([0]),
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: WEB3_NAME_SERVICE_ID, isSigner: false, isWritable: false },
        { pubkey: rootDomainAccount, isSigner: false, isWritable: false },
        { pubkey: domainNameAccount, isSigner: false, isWritable: true },
        { pubkey: domainReverseAccount, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: centralStateAccount, isSigner: false, isWritable: false },

        { pubkey: buyerAccount, isSigner: true, isWritable: true },
        { pubkey: domainOwnerAccount, isSigner: false, isWritable: false },
        { pubkey: feePayerAccount, isSigner: true, isWritable: true },
        { pubkey: buyerTokenSource, isSigner: false, isWritable: true },

        // { pubkey: returnPythFeedAccount(), isSigner: false, isWritable: false },
        { pubkey: vault, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      ];

    if (refereerAccount) {
        keys.push({
            pubkey: refereerAccount,
            isSigner: false,
            isWritable: true,
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