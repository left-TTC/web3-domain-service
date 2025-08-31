import { SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { AuctionInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { VAULT, WEB3_AUCTION_ID } from "@/utils/constants/constants";



export function createLaunchRootDomainInstruction(
    // 1.system account => constant
    // 2.initiator
    initiator: PublicKey,
    // 3.root state account
    rootStateAccount: PublicKey,
    // 4.root domain name account
    rootNameAccount: PublicKey,
    // 5.rent sysvar => constant
    // 6.root deposition saver
    createFeeSaverAccount: PublicKey,
    
    willLaunchRootDomain: string,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([AuctionInstruction.CreateRoot])),
        new Numberu32(Buffer.from(willLaunchRootDomain).length).toBuffer(),
        Buffer.from(willLaunchRootDomain, 'utf-8'),
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: initiator, isSigner: true, isWritable: true },
        { pubkey: rootStateAccount, isSigner: false, isWritable: true },

        { pubkey: rootNameAccount, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: createFeeSaverAccount, isSigner: false, isWritable: true },
    ];

    return new TransactionInstruction({
        programId: WEB3_AUCTION_ID,
        keys,
        data,
    })
}