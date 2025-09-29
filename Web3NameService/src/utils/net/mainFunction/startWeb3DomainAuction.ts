import { Connection, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type PublicKey } from "@solana/web3.js";

import { CENTRAL_STATE_REGISTER, INIT_DOMAIN_PRICE, returnProjectVault, WEB3_NAME_SERVICE_ID } from "../../constants/constants";
import { createDomainInstruction, type StartDomainInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createDomainInstruction";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { returnPythFeedAccount } from "@/utils/functional/common/net/getPythFeedAccount";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { Numberu64 } from "@/utils/functional/common/number/number64";
import { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { getNameStateRevserseKey } from "@/utils/functional/solana/getNameStateReverseKey";


export async function startWeb3DomainAuction(
    rootDomain: string,
    domain: string,
    feePayer: PublicKey,
    refferrer: PublicKey,
    connection: Connection,
): Promise<Transaction> {

    console.log("refferrer: ", refferrer)

    const rootDomainAccountKey = getNameAccountKey(getHashedName(rootDomain))
    console.log("root domain key:", rootDomainAccountKey.toBase58())

    const domainNameAccountKey = getNameAccountKey(
        getHashedName(domain), null, rootDomainAccountKey
    )
    console.log("name account: ", domainNameAccountKey.toBase58())
    
    const domainNameStateKey = getNameStateKey(
        getHashedName(domain), rootDomainAccountKey
    )
    console.log("name state: ", domainNameStateKey.toBase58())
    const domainNameStateReverseKey = getNameStateRevserseKey(
        getHashedName(domainNameStateKey.toBase58())
    )
    console.log("name state reverse: ", domainNameStateReverseKey.toBase58())

    console.log("usr: ", feePayer.toBase58())

    const usrRefferrerRecord = getRefferrerRecordKey(feePayer)
    console.log("usr refferrer record ", usrRefferrerRecord.toBase58())

    let nameStateRentPayer: PublicKey;
    let domainPrice: Numberu64;
    const nameStateInfo = await connection.getAccountInfo(domainNameStateKey)
    if(nameStateInfo){
        const nameStateRecord = new NameAuctionState(nameStateInfo)
        nameStateRentPayer = nameStateRecord.rentPayer;

        const nameAccountInfo = await connection.getAccountInfo(domainNameAccountKey)
        if(nameAccountInfo){
            const nameState = new NameRecordState(nameAccountInfo)
            domainPrice = nameState.customPrice
        }else {
            throw new Error("domain account error")
        }
    }else{
        nameStateRentPayer = feePayer;
        domainPrice = new Numberu64(INIT_DOMAIN_PRICE)
    }
    console.log("rent payer: ", nameStateRentPayer.toBase58())

    let superiorReferrerRecord: PublicKey | null = null
    if(refferrer.toBase58() != returnProjectVault().toBase58()){
        superiorReferrerRecord = getRefferrerRecordKey(refferrer)
    }
    console.log("superiorReferrerRecord: ", superiorReferrerRecord?.toBase58())

    const createDomainInstructionAccounts: StartDomainInstructionAccounts = {
        nameService: WEB3_NAME_SERVICE_ID,
        rootDomainAccount: rootDomainAccountKey,
        name: domainNameAccountKey,
        domainNameState: domainNameStateKey,
        domainNameStateReverse: domainNameStateReverseKey,
        systemAccount: SystemProgram.programId,
        centralState: CENTRAL_STATE_REGISTER,
        feePayer: feePayer,
        pythFeedAccount: returnPythFeedAccount(SupportedMint.SOL),
        rentSysvar: SYSVAR_RENT_PUBKEY,
        refferrer: refferrer,
        refferrerRecord: usrRefferrerRecord,
        vault: returnProjectVault(),
        rentPayer: nameStateRentPayer,
        superiorReferrerRecord: superiorReferrerRecord,
    }

    const transactionInstruction = createDomainInstruction(
        createDomainInstructionAccounts,
        domain,
        rootDomain,
        domainPrice,
    )

    return new Transaction().add(transactionInstruction);
}