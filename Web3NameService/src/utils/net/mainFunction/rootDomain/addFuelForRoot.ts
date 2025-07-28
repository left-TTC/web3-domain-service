import { CENTRAL_STATE_AUCTION } from "@/utils/constants/constants";
import { createAddFuelInstruction } from "@/utils/functional/instructions/createInstruction/createAddFuelInstruction";
import { getAuctionRecordKey } from "@/utils/functional/solana/getAuctionRecordKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { Transaction, type PublicKey } from "@solana/web3.js";




export function addFuelForRoot(
    feePayer: PublicKey,
    rootDomain: string,
    fuelAmount: number,
): Transaction{
    const rootRecordAccountKey = getAuctionRecordKey(
        getHashedName(rootDomain)
    )
    console.log("rootRecordAccountKey:", rootRecordAccountKey.toBase58())

    const createFeeSaverAccount = getAuctionRecordKey(
        getHashedName(rootDomain), CENTRAL_STATE_AUCTION, CENTRAL_STATE_AUCTION
    );
    console.log("createFeeSaverAccount:", createFeeSaverAccount.toBase58())

    const rootNameAccountKey = getNameAccountKey(
        getHashedName(rootDomain)
    )
    console.log("rootNameAccountKey:", rootNameAccountKey.toBase58())

    const rootNameReverseAccountKey = getNameAccountKey(
        getHashedName(rootNameAccountKey.toBase58()), CENTRAL_STATE_AUCTION
    )
    console.log("rootNameReverseAccountKey:", rootNameReverseAccountKey.toBase58())

    const addFuelTransactionInstruction = createAddFuelInstruction(
        rootRecordAccountKey, createFeeSaverAccount, rootNameAccountKey, rootNameReverseAccountKey,
        feePayer, fuelAmount, rootDomain
    )

    return new Transaction().add(addFuelTransactionInstruction)
}