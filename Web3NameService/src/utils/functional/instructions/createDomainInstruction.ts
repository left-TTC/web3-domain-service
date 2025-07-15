import { PublicKey, TransactionInstruction, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Numberu32 } from "../common/number/number32";
import { RegisterInstruction } from "./instruction";
import { TOKEN_PROGRAM_ID, VAULT, WEB3_NAME_SERVICE_ID, WEB3_REGISTER_ID } from "@/utils/constants/constants";



export function createDomainInstruction(
    rootDomainAccount: PublicKey,
    domainNameAccount: PublicKey,
    domainReverseAccount: PublicKey,
    centralStateAccount: PublicKey,
    feePayerAccount: PublicKey,
    domainOwnerAccount: PublicKey,
    buyerAccount: PublicKey,
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

        { pubkey: PublicKey.default, isSigner: false, isWritable: true },
        { pubkey: PublicKey.default, isSigner: false, isWritable: false },
        { pubkey: VAULT, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: PublicKey.default, isSigner: false, isWritable: false },
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