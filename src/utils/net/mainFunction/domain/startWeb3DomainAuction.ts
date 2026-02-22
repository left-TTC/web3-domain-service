import { Connection, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type PublicKey } from "@solana/web3.js";

import { CENTRAL_STATE_REGISTER, INIT_DOMAIN_PRICE, returnProjectVault, WEB3_NAME_SERVICE_ID } from "../../../constants/constants";
import { createStartDomainInstruction, type StartDomainInstructionAccounts } from "@/utils/functional/instructions/createInstruction/registra/createStartDomainInstruction";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { Numberu64 } from "@/utils/functional/common/number/number64";
import { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { getReverseKey } from "@/utils/functional/solana/getReverseKey";


export async function startWeb3DomainAuction(
    rootDomain: string,
    domain: string,
    feePayer: PublicKey,
    referrer: PublicKey,
    connection: Connection,
    lastOwner: PublicKey,
): Promise<Transaction> {

    console.log("referrer: ", referrer)

    const rootDomainAccountKey = getNameAccountKey(getHashedName(rootDomain))
    console.log("root domain key:", rootDomainAccountKey.toBase58())

    const domainNameAccountKey = getNameAccountKey(
        getHashedName(domain), null, rootDomainAccountKey
    )
    console.log("name account: ", domainNameAccountKey.toBase58())

    const reverse = getReverseKey(
        domainNameAccountKey, CENTRAL_STATE_REGISTER
    )
    
    const domainStateAccountKey = getNameStateKey(
        getHashedName(domain), rootDomainAccountKey
    )
    console.log("domain state: ", domainStateAccountKey.toBase58())

    console.log("fee payer: ", feePayer.toBase58())

    const referrerRecordAccount = getRefferrerRecordKey(feePayer)
    console.log("referrer record account: ", referrerRecordAccount.toBase58())

    let domainPrice: Numberu64;
    const nameAccountInfo = await connection.getAccountInfo(domainNameAccountKey)
    if(nameAccountInfo){
        const nameState = new NameRecordState(nameAccountInfo)
        domainPrice = nameState.customPrice
    }else {
        domainPrice = new Numberu64(INIT_DOMAIN_PRICE)
    }

    console.log("use price: ", domainPrice.toString())

    let superiorReferrerRecord: PublicKey | null = null
    if(referrer.toBase58() != returnProjectVault().toBase58()){
        superiorReferrerRecord = getRefferrerRecordKey(referrer)
    }
    console.log("superiorReferrerRecord: ", superiorReferrerRecord?.toBase58())

    const createStartDomainInstructionAccounts: StartDomainInstructionAccounts = {
        namingServiceProgram: WEB3_NAME_SERVICE_ID,
        rootDomain: rootDomainAccountKey,
        domainNameAccount: domainNameAccountKey,
        reverseLookup: reverse,
        domainStateAccount: domainStateAccountKey,
        systemProgram: SystemProgram.programId,
        centralState: CENTRAL_STATE_REGISTER,
        feePayer: feePayer,
        referrerRecordAccount: referrerRecordAccount,
        vault: returnProjectVault(),
        lastOwner: lastOwner,
        rentSysvar: SYSVAR_RENT_PUBKEY,
        superiorReferrerRecord: superiorReferrerRecord,
    }

    const transactionInstruction = createStartDomainInstruction(
        createStartDomainInstructionAccounts,
        referrer,
        domain,
        rootDomain,
        domainPrice,
    )

    return new Transaction().add(transactionInstruction);
}