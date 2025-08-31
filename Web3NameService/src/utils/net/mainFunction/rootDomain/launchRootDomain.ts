import { CENTRAL_STATE_AUCTION } from "@/utils/constants/constants";
import { createLaunchRootDomainInstruction } from "@/utils/functional/instructions/createInstruction/createLanuchRootInstruction";
import { getAuctionRecordKey } from "@/utils/functional/solana/getAuctionRecordKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { Transaction, type PublicKey } from "@solana/web3.js";



export function launchRootDomain(
    willLanunchRootDomain: string,
    initiator: PublicKey,
): Transaction {

    const rootStateAccountKey = getAuctionRecordKey(
        getHashedName(willLanunchRootDomain)
    )
    
    const rootNameAccount = getNameAccountKey(
        getHashedName(willLanunchRootDomain)
    )

    const rootCreateFeeSaver = getAuctionRecordKey(
        getHashedName(willLanunchRootDomain), CENTRAL_STATE_AUCTION, CENTRAL_STATE_AUCTION
    )

    console.log("rootStateAccountKey: ", rootStateAccountKey.toBase58())
    console.log("rootCreateFeeSaver: ", rootCreateFeeSaver.toBase58())

    const launchTransactionInstruction = createLaunchRootDomainInstruction(
        initiator,
        rootStateAccountKey,
        rootNameAccount,
        rootCreateFeeSaver,
        willLanunchRootDomain
    )

    return new Transaction().add(launchTransactionInstruction)
}