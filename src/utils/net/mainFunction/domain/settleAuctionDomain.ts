import { CENTRAL_STATE_REGISTER, returnProjectVault, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { RefferrerRecordState } from "@/utils/functional/common/class/refferrerRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { createSettleDomainInstruction, type CreateSettleDomainInstructionAccounts } from "@/utils/functional/instructions/createInstruction/registra/createSettleDomainInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { getReverseKey } from "@/utils/functional/solana/getReverseKey";
import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";



export async function settleAuctionDomain(
    extireDomain: string,
    connection: Connection,
    // can be anyone on the refferrer chain
    feePayer: PublicKey,
    newNameOwner: PublicKey,
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

    const nameStateKey = getNameStateKey(
        getHashedName(nameAndRoot[0]), rootNameDomainKey
    )

    const refferrerRecord = getRefferrerRecordKey(newNameOwner);

    const usrRecordInfo = await connection.getAccountInfo(refferrerRecord)
    if(!usrRecordInfo) throw new Error("usr must has an refferrer record account")
    const refferrerA = new RefferrerRecordState(usrRecordInfo).refferrer;

    let refferrerARecord: PublicKey | null,
        refferrerB: PublicKey | null,
        refferrerBRecord: PublicKey | null,
        refferrerC: PublicKey | null,
        refferrerCRecord: PublicKey | null;

    refferrerARecord = refferrerB = refferrerBRecord = refferrerC = refferrerCRecord = null;

    const vault = returnProjectVault()

    if(refferrerA.toBase58() != vault.toBase58()){
        refferrerARecord = getRefferrerRecordKey(refferrerA)

        const refferrerAInfo = await connection.getAccountInfo(refferrerARecord)
        if(!refferrerAInfo) throw new Error("A must has an refferrer record account")
        refferrerB = new RefferrerRecordState(refferrerAInfo).refferrer;

        if(refferrerB.toBase58() != vault.toBase58()){
            refferrerBRecord = getRefferrerRecordKey(refferrerB)

            const refferrerBInfo = await connection.getAccountInfo(refferrerBRecord)
            if(!refferrerBInfo) throw new Error("B must has an refferrer record account")
            refferrerC = new RefferrerRecordState(refferrerBInfo).refferrer;

            if (refferrerC.toBase58() != vault.toBase58()){
                refferrerCRecord = getRefferrerRecordKey(refferrerC)
            }
        }
    }

    let originNameOwnerKey = PublicKey.default;
    let originNameOwnerRefferrerKey = PublicKey.default;

    const nameStateInfo = await connection.getAccountInfo(nameAccountKey)
    if(nameStateInfo){
        const nameState = new NameRecordState(nameStateInfo)
        originNameOwnerKey = nameState.owner;
        originNameOwnerRefferrerKey = getRefferrerRecordKey(originNameOwnerKey)
    }

    const settleAcutionDomainAccounts: CreateSettleDomainInstructionAccounts = {
        nameService: WEB3_NAME_SERVICE_ID,
        rootDomainAccountKey: rootNameDomainKey,
        name: nameAccountKey,
        domainStateAccountKey: nameStateKey,
        systemAccount: SystemProgram.programId,
        centralState: CENTRAL_STATE_REGISTER,
        feePayer: feePayer,
        originNameOwner: originNameOwnerKey,
        originNameOwnerRecord: originNameOwnerRefferrerKey,
        vault: vault,
        newNameOwner: newNameOwner,
        refferrerRecord: refferrerRecord,
        refferrerA: refferrerA,
        refferrerARecord: refferrerARecord,
        refferrerB: refferrerB, 
        refferrerBRecord: refferrerBRecord, 
        refferrerC: refferrerC,
        refferrerCRecord: refferrerCRecord,
    }
    console.log("rootDomainAccountKey", rootNameDomainKey.toBase58())
    console.log("name", nameAccountKey.toBase58())
    console.log("nameStateKey", nameStateKey.toBase58())
    console.log("newNameOnwer", newNameOwner.toBase58())
    console.log("refferrerRecord", refferrerRecord.toBase58())
    console.log("refferrerA", refferrerA.toBase58())
    console.log("refferrerARecord", refferrerARecord?.toBase58())
    console.log("refferrerB", refferrerB?.toBase58())
    console.log("refferrerBRecord", refferrerBRecord?.toBase58())
    console.log("refferrerC", refferrerC?.toBase58())
    console.log("refferrerC", refferrerCRecord?.toBase58())
    console.log("originNameOnwer", originNameOwnerKey.toBase58())
    console.log("originNameOnwerRefferrer", originNameOwnerRefferrerKey.toBase58())

    const valutInfo = await connection.getAccountInfo(vault)
    if(valutInfo){
        console.log("vault owner: ", valutInfo.owner.toBase58())
    }

    settleAuctionDomainTransaction.add(
        createSettleDomainInstruction(
            settleAcutionDomainAccounts, nameAndRoot[0], customDomainPrice
        )
    )

    return settleAuctionDomainTransaction
}