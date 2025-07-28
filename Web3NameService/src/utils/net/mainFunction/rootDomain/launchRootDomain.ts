import { CENTRAL_STATE_AUCTION } from "@/utils/constants/constants";
import { createLaunchRootDomainInstruction } from "@/utils/functional/instructions/createInstruction/createLanuchRootInstruction";
import { getAuctionRecordKey } from "@/utils/functional/solana/getAuctionRecordKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { Transaction, type PublicKey } from "@solana/web3.js";



export function launchRootDomain(
    willLanunchRootDomain: string,
    feePayer: PublicKey,
): Transaction {
    const rootRecordAccountKey = getAuctionRecordKey(
        getHashedName(willLanunchRootDomain)
    )
    console.log("rootrecord: ", rootRecordAccountKey.toBase58())

    const rootCreateFeeSaver = getAuctionRecordKey(
        getHashedName(willLanunchRootDomain), CENTRAL_STATE_AUCTION, CENTRAL_STATE_AUCTION
    )
    console.log("rootCreateFeeSaver: ", rootCreateFeeSaver.toBase58())

    const launchTransactionInstruction = createLaunchRootDomainInstruction(
        feePayer, rootCreateFeeSaver, rootRecordAccountKey, willLanunchRootDomain
    )

    return new Transaction().add(launchTransactionInstruction)
}