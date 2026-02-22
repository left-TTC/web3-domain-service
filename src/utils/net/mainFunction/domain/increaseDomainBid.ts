import { returnProjectVault } from "@/utils/constants/constants";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { createIncreaseInstruction, type CreateIncreaseInstructionAccounts } from "@/utils/functional/instructions/createInstruction/registra/createIncreaseInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";





export async function increaseDomainBid(
    extireDomain: string,
    bidIncrement: number,   //decimals
    connection: Connection,
    bidder: PublicKey,
    lastBidder: PublicKey,
    refferrerKey: PublicKey,
): Promise<Transaction> {

    const increaseDomainBidTransaction = new Transaction()

    const nameAndRoot = cutDomain(extireDomain)

    const rootDomainKey = getNameAccountKey(
        getHashedName(nameAndRoot[1])
    )
    console.log("root Domain: ", rootDomainKey.toBase58())

    const domainNameAccountKey = getNameAccountKey(
        getHashedName(nameAndRoot[0]), null, rootDomainKey
    )
    console.log("domainNameAccountKey: ", domainNameAccountKey.toBase58())

    const nameStateKey = getNameStateKey(
        getHashedName(nameAndRoot[0]), rootDomainKey
    )
    console.log("namestate key: ", nameStateKey.toBase58())

    const bidderRefferrerRecord = getRefferrerRecordKey(bidder)

    let superiorReferrerRecord: PublicKey | null = null
    let rentSysvar: PublicKey | null = null

    const recordInfo = await connection.getAccountInfo(bidderRefferrerRecord)
    if(!recordInfo){
        const refferrerSuperRecord = getRefferrerRecordKey(refferrerKey)
        const superInfo = await connection.getAccountInfo(refferrerSuperRecord)
        if(!superInfo) throw new Error("this refferrer has not refferrer too");

        superiorReferrerRecord = refferrerSuperRecord
        rentSysvar = SYSVAR_RENT_PUBKEY
    }

    const createIncreaseInstructionAccounts: CreateIncreaseInstructionAccounts = {
        rootDomainAccountKey: rootDomainKey,
        domainStateAccountKey: nameStateKey,
        systemProgram: SystemProgram.programId,
        feePayer: bidder,
        lastBidder: lastBidder,
        vault: returnProjectVault(),
        referrerRecordAccount: bidderRefferrerRecord,
        lastOwner: PublicKey.default,
        domainNameAccount: domainNameAccountKey,
        superiorReferrerRecord: superiorReferrerRecord,
    }

    const instruction = createIncreaseInstruction(
        createIncreaseInstructionAccounts, refferrerKey, bidIncrement, nameAndRoot[0], nameAndRoot[1]
    )

    return increaseDomainBidTransaction.add(instruction)
}