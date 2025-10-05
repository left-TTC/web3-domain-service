import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { CENTRAL_STATE_REGISTER, returnProjectVault, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { RefferrerRecordState } from "@/utils/functional/common/class/refferrerRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { returnPythFeedAccount } from "@/utils/functional/common/net/getPythFeedAccount";
import { createSettleDomainInstruction, type CreateSettleDomainInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createSettleDomainInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { getReverseKey } from "@/utils/functional/solana/getReverseKey";
import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";



export async function settleAuctionDomain(
    extireDomain: string,
    connection: Connection,
    buyer: PublicKey,
    customDomainPrice: number | null
): Promise<Transaction> {
    const settleAuctionDomainTransaction = new Transaction()

    const nameAndRoot = cutDomain(extireDomain)

    const rootNameDomainKey = getNameAccountKey(
        getHashedName(nameAndRoot[1])
    )

    const nameAccountKey = getNameAccountKey(
        getHashedName(nameAndRoot[0]), null, rootNameDomainKey
    )

    const nameReverseKey = getReverseKey(
        nameAccountKey, CENTRAL_STATE_REGISTER
    )

    const nameStateKey = getNameStateKey(
        getHashedName(nameAndRoot[0]), rootNameDomainKey
    )

    const nameAccounInfo = await connection.getAccountInfo(nameAccountKey)
    let nameOnwer: PublicKey = buyer;
    if(nameAccounInfo){
        const nameRecordState = new NameRecordState(nameAccounInfo)
        nameOnwer = nameRecordState.owner;
    }

    const refferrerRecord = getRefferrerRecordKey(buyer);

    const usrRecordInfo = await connection.getAccountInfo(refferrerRecord)
    if(!usrRecordInfo) throw new Error("usr must has an refferrer record account")
    const refferrerA = new RefferrerRecordState(usrRecordInfo).refferrer;

    let refferrerARecord: PublicKey | null,
        refferrerB: PublicKey | null,
        refferrerBRecord: PublicKey | null,
        refferrerC: PublicKey | null;

    refferrerARecord = refferrerB = refferrerBRecord = refferrerC = null;

    const vault = returnProjectVault()

    if(refferrerA.toBase58() != vault.toBase58()){
        refferrerARecord = getRefferrerRecordKey(refferrerA)

        const refferrerAInfo = await connection.getAccountInfo(refferrerARecord)
        if(!refferrerAInfo) throw new Error("A must has an refferrer record account")
        refferrerB = new RefferrerRecordState(refferrerAInfo).refferrer;

        if(refferrerB.toBase58() != vault.toBase58()){
            refferrerBRecord = getRefferrerRecordKey(refferrerB)

            const refferrerBInfo = await connection.getAccountInfo(refferrerARecord)
            if(!refferrerBInfo) throw new Error("B must has an refferrer record account")
            refferrerC = new RefferrerRecordState(refferrerBInfo).refferrer;
        }
    }

    const settleAcutionDomainAccounts: CreateSettleDomainInstructionAccounts = {
        nameService: WEB3_NAME_SERVICE_ID,
        rootDomainAccountKey: rootNameDomainKey,
        name: nameAccountKey,
        reverse: nameReverseKey,
        domainStateAccountKey: nameStateKey,
        systemAccount: SystemProgram.programId,
        centralState: CENTRAL_STATE_REGISTER,
        feePayer: buyer,
        pythFeedAccountKey: returnPythFeedAccount(SupportedMint.SOL),
        rentSysvar: SYSVAR_RENT_PUBKEY,
        nameOwner: nameOnwer,
        refferrerRecord: refferrerRecord,
        refferrerA: refferrerA,
        refferrerARecord: refferrerARecord,
        refferrerB: refferrerB, 
        refferrerBRecord: refferrerBRecord, 
        refferrerC: refferrerC
    }
    console.log("rootDomainAccountKey", rootNameDomainKey.toBase58())
    console.log("name", nameAccountKey.toBase58())
    console.log("nameReverseKey", nameReverseKey.toBase58())
    console.log("nameStateKey", nameStateKey.toBase58())
    console.log("nameOnwer", nameOnwer.toBase58())
    console.log("refferrerRecord", refferrerRecord.toBase58())
    console.log("refferrerA", refferrerA.toBase58())
    console.log("refferrerARecord", refferrerARecord?.toBase58())
    console.log("refferrerB", refferrerB?.toBase58())
    console.log("refferrerBRecord", refferrerBRecord?.toBase58())
    console.log("refferrerC", refferrerC?.toBase58())

    settleAuctionDomainTransaction.add(
        createSettleDomainInstruction(
            settleAcutionDomainAccounts, nameAndRoot[0], customDomainPrice
        )
    )

    return settleAuctionDomainTransaction
}