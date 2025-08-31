import { SystemProgram, SYSVAR_RENT_PUBKEY, TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { AuctionInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { Numberu64 } from "../../common/number/number64";
import { CENTRAL_STATE_AUCTION, CENTRAL_STATE_REGISTER, returnPythFeedAccount, VAULT, WEB3_AUCTION_ID, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";



export function createAddFuelInstruction(
    // 1. name service => constant
    // 2. system => constant
    // 3. vault
    valut: PublicKey,
    // 4. feePayer
    feePayer: PublicKey,
    // 5. buyer token source
    buyerTokenSource: PublicKey,
    // 6. spl-token => constant
    // 7. central state -- auction
    auctionCentralState: PublicKey,
    // 8. root state account
    rootStateccountKey: PublicKey,
    // 9. central state -- registra
    registraCentralState: PublicKey,
    // 10. root name account
    rootNameAccountKey: PublicKey,
    // 11. root reverse account
    rootNameReverseAccountKey: PublicKey,
    // 12. rent sysvar => constant
    // 13. creat fee saver 
    createRootFeeSaver: PublicKey,
    // 14. pyth feed account => constant
    
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
        { pubkey: WEB3_NAME_SERVICE_ID, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },

        { pubkey: valut, isSigner: false, isWritable: true },
        { pubkey: feePayer, isSigner: true, isWritable: true },
        { pubkey: buyerTokenSource, isSigner: false, isWritable: true },

        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: auctionCentralState, isSigner: false, isWritable: false },

        { pubkey: rootStateccountKey, isSigner: false, isWritable: true },
        { pubkey: registraCentralState, isSigner: false, isWritable: false },
        { pubkey: rootNameAccountKey, isSigner: false, isWritable: true },
        { pubkey: rootNameReverseAccountKey, isSigner: false, isWritable: true },

        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: createRootFeeSaver, isSigner: false, isWritable: true },
        { pubkey: returnPythFeedAccount(), isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
        programId: WEB3_AUCTION_ID,
        keys,
        data,
    })
}