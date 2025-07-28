import { SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { AuctionInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { Numberu64 } from "../../common/number/number64";
import { CENTRAL_STATE_AUCTION, CENTRAL_STATE_REGISTER, VAULT, WEB3_AUCTION_ID, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";



export function createAddFuelInstruction(
    rootRecordAccountKey: PublicKey,
    createRootFeeSaver: PublicKey,
    rootNameAccountKey: PublicKey,
    rootNameReverseAccountKey: PublicKey,
    feePayer: PublicKey,
    fuelQuantity: number,
    addRootName: string
): TransactionInstruction{

    const buffers = [
        Buffer.from(Uint8Array.from([AuctionInstruction.DonateRoot])),
        new Numberu32(Buffer.from(addRootName).length).toBuffer(),
        Buffer.from(addRootName, 'utf-8'),
        new Numberu64(fuelQuantity).toBuffer(),
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: VAULT, isSigner: false, isWritable: true },
        { pubkey: rootRecordAccountKey, isSigner: false, isWritable: true },
        { pubkey: feePayer, isSigner: true, isWritable: true },
        { pubkey: WEB3_NAME_SERVICE_ID, isSigner: false, isWritable: false },
        { pubkey: CENTRAL_STATE_REGISTER, isSigner: false, isWritable: false },
        { pubkey: rootNameAccountKey, isSigner: false, isWritable: true },
        { pubkey: rootNameReverseAccountKey, isSigner: false, isWritable: true },
        { pubkey: CENTRAL_STATE_AUCTION, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: createRootFeeSaver, isSigner: false, isWritable: true },
    ];

    return new TransactionInstruction({
        programId: WEB3_AUCTION_ID,
        keys,
        data,
    })
}