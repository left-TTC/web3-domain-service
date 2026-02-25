import { CENTRAL_STATE_RECORDS, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import type { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { createInitIPFSInstruction, type IPFSInstructionAccounts } from "@/utils/functional/instructions/createInstruction/record/createInitIPFSInstruction";
import { createResetIPFSInstruction } from "@/utils/functional/instructions/createInstruction/record/createResetIPFSInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getRecordKey, RecordType } from "@/utils/functional/solana/getRecordKey";
import { SystemProgram, Transaction, type PublicKey } from "@solana/web3.js";

export enum IPFSOperation {
    Init, 
    Reset,
}


export function setDomainIPFS(
    extireDomain: string,
    usr: PublicKey,
    cid: string | null,
    lastSetter: PublicKey,
    operation: IPFSOperation,
    useProtocol: UseProtocol,
): Transaction {

    const nameAndRoot = cutDomain(extireDomain)

    const nameAccount = getNameAccountKey(
        getHashedName(nameAndRoot[0]), null, getNameAccountKey(getHashedName(nameAndRoot[1]))
    )
    const recordKey = getRecordKey(nameAccount, RecordType.DNS)

    const accounts: IPFSInstructionAccounts = {
        systemAccount: SystemProgram.programId,
        web3NameService: WEB3_NAME_SERVICE_ID,
        feePayer: usr,
        recordAccount: recordKey,
        domainAccount: nameAccount,
        centralState: CENTRAL_STATE_RECORDS,
        lastSetter: lastSetter
    }

    console.log("record: ", recordKey.toBase58())
    console.log("domainAccount: ", nameAccount.toBase58())
    console.log("centralState: ", CENTRAL_STATE_RECORDS.toBase58())
    console.log("last setter: ", lastSetter.toBase58())

    let IPFSOperationTransaction = new Transaction();

    if(cid){
        switch (operation){
            case IPFSOperation.Init:
                console.log("init the record account")
                IPFSOperationTransaction.add(createInitIPFSInstruction(
                    accounts, cid, RecordType.DNS, useProtocol
                ))
                break;
            case IPFSOperation.Reset:
                console.log("reset the record account")
                IPFSOperationTransaction.add(createResetIPFSInstruction(
                    accounts, cid, RecordType.DNS, useProtocol
                ))
                break
            default:  
                console.log("no other operation")
                break
        }
    }else{
        console.log("no cid")
    }

    return IPFSOperationTransaction;
}   