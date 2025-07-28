import { SystemProgram, TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { AuctionInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { VAULT, WEB3_AUCTION_ID } from "@/utils/constants/constants";



export function createLaunchRootDomainInstruction(
    feePayer: PublicKey,
    // sponsor: PublicKey,
    createFeeSaverAccount: PublicKey,
    rootRecordAccount: PublicKey,
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
        { pubkey: VAULT, isSigner: false, isWritable: true },
        { pubkey: rootRecordAccount, isSigner: false, isWritable: true },

        { pubkey: feePayer, isSigner: true, isWritable: true },
        { pubkey: createFeeSaverAccount, isSigner: false, isWritable: true },
    ];

    return new TransactionInstruction({
        programId: WEB3_AUCTION_ID,
        keys,
        data,
    })
}