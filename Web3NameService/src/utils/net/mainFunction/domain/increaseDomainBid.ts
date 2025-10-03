import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { returnProjectVault } from "@/utils/constants/constants";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { returnPythFeedAccount } from "@/utils/functional/common/net/getPythFeedAccount";
import { createIncreaseInstruction, type CreateIncreaseInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createIncreaseInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";





export function increaseDomainBid(
    extireDomain: string,
    bidIncrement: number,   //decimals

    bidder: PublicKey,
    lastBidder: PublicKey,
): Transaction {

    const increaseDomainBidTransaction = new Transaction()

    const nameAndRoot = cutDomain(extireDomain)

    const rootDomainKey = getNameAccountKey(
        getHashedName(nameAndRoot[1])
    )
    console.log("root Domain: ", rootDomainKey.toBase58())

    const nameStateKey = getNameStateKey(
        getHashedName(nameAndRoot[0]), rootDomainKey
    )
    console.log("namestate key: ", nameStateKey.toBase58())

    const createIncreaseInstructionAccounts: CreateIncreaseInstructionAccounts = {
        rootDomainAccountKey: rootDomainKey,
        domainStateAccountKey: nameStateKey,
        systemAccount: SystemProgram.programId,
        feePayer: bidder,
        pythFeedAccountKey: returnPythFeedAccount(SupportedMint.SOL),
        lastBidderKey: lastBidder,
        vault: returnProjectVault(),
    }

    const instruction = createIncreaseInstruction(
        createIncreaseInstructionAccounts, bidIncrement, nameAndRoot[0]
    )

    return increaseDomainBidTransaction.add(instruction)
}