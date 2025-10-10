import { CENTRAL_STATE_RECORDS, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { createDeleteIPFSInstruction } from "@/utils/functional/instructions/createInstruction/createDeleteRecordInstruction";
import { createInitIPFSInstruction, type IPFSInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createInitIPFSInstruction";
import { createResetIPFSInstruction } from "@/utils/functional/instructions/createInstruction/createResetIPFSInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getRecordKey, RecordType } from "@/utils/functional/solana/getRecordKey";
import { SystemProgram, Transaction, type PublicKey } from "@solana/web3.js";

export enum IPFSOperation {
    Init, 
    Reset,
    Delete,
}


export function setDomainIPFS(
    extireDomain: string,
    usr: PublicKey,
    cid: string | null,
    operation: IPFSOperation
): Transaction {

    const nameAndRoot = cutDomain(extireDomain)

    const nameAccount = getNameAccountKey(
        getHashedName(nameAndRoot[0]), null, getNameAccountKey(getHashedName(nameAndRoot[1]))
    )
    const recordKey = getRecordKey(nameAccount, RecordType.IPFS)

    const accounts: IPFSInstructionAccounts = {
        systemAccount: SystemProgram.programId,
        web3NameService: WEB3_NAME_SERVICE_ID,
        feePayer: usr,
        recordAccount: recordKey,
        domainAccount: nameAccount,
        centralState: CENTRAL_STATE_RECORDS,
    }

    console.log("record: ", recordKey.toBase58())
    console.log("domainAccount: ", nameAccount.toBase58())
    console.log("centralState: ", CENTRAL_STATE_RECORDS.toBase58())

    let IPFSOperationTransaction = new Transaction();

    if(!cid && operation===IPFSOperation.Delete){
        IPFSOperationTransaction.add(createDeleteIPFSInstruction(
            accounts
        ))
    }else if(cid){
        switch (operation){
            case IPFSOperation.Init:
                IPFSOperationTransaction.add(createInitIPFSInstruction(
                    accounts, cid, RecordType.IPFS
                ))
                break;
            case IPFSOperation.Reset:
                IPFSOperationTransaction.add(createResetIPFSInstruction(
                    accounts, cid, RecordType.IPFS
                ))
                break
            default: 
                break
        }
    }

    return IPFSOperationTransaction;
}   