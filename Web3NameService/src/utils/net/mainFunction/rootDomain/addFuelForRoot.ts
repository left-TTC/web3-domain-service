import { CENTRAL_STATE_AUCTION, CENTRAL_STATE_REGISTER } from "@/utils/constants/constants";
import { createAddFuelInstruction } from "@/utils/functional/instructions/createInstruction/createAddFuelInstruction";
import { getAuctionRecordKey } from "@/utils/functional/solana/getAuctionRecordKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { Transaction, type PublicKey } from "@solana/web3.js";




export function addFuelForRoot(
    vault: PublicKey,
    feePayer: PublicKey,
    buyerTokenSource: PublicKey,

    rootDomain: string,
    fuelQuantity: number,
): Transaction{
    const rootStateAccountKey = getAuctionRecordKey(
        getHashedName(rootDomain)
    )
    const createFeeSaverAccount = getAuctionRecordKey(
        getHashedName(rootDomain), CENTRAL_STATE_AUCTION, CENTRAL_STATE_AUCTION
    );
    const rootNameAccountKey = getNameAccountKey(
        getHashedName(rootDomain)
    )
    const rootNameReverseAccountKey = getNameAccountKey(
        getHashedName(rootNameAccountKey.toBase58()), CENTRAL_STATE_AUCTION
    )

    const addFuelTransactionInstruction = createAddFuelInstruction(
        vault,
        feePayer,
        buyerTokenSource,
        CENTRAL_STATE_AUCTION,
        rootStateAccountKey,
        CENTRAL_STATE_REGISTER,
        rootNameAccountKey,
        rootNameReverseAccountKey,
        createFeeSaverAccount,
        fuelQuantity,
        rootDomain
    )

    return new Transaction().add(addFuelTransactionInstruction)
}