import { cutDomain } from "@/utils/functional/common/cutDomain";
import { createSetPreviewInstruction, type SetPreviewInstructionAccounts } from "@/utils/functional/instructions/createInstruction/record/createSetPreviewInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getRecordKey, RecordType } from "@/utils/functional/solana/getRecordKey";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { WEB3_NAME_SERVICE_ID, CENTRAL_STATE_RECORDS } from "@/utils/constants/constants";
import type { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";

export async function setDomainPreview(
    domain: string,
    content: string,
    feePayer: PublicKey,
    lastSetter: PublicKey,
    protocol: UseProtocol,
    recordGate: RecordType = RecordType.DNS
): Promise<Transaction> {

    const setPreviewTransaction = new Transaction();

    const nameAndRoot = cutDomain(domain);

    const rootDomainKey = getNameAccountKey(
        getHashedName(nameAndRoot[1])
    );
    console.log("root domain: ", rootDomainKey.toBase58());

    const domainNameAccountKey = getNameAccountKey(
        getHashedName(nameAndRoot[0]), null, rootDomainKey
    );
    console.log("domain name account: ", domainNameAccountKey.toBase58());

    const domainNameStateKey = getNameStateKey(
        getHashedName(nameAndRoot[0]), rootDomainKey
    );
    console.log("domain name state: ", domainNameStateKey.toBase58());

    const recordKey = getRecordKey(
        domainNameAccountKey, recordGate
    );
    console.log("record key: ", recordKey.toBase58());

    const setPreviewInstructionAccounts: SetPreviewInstructionAccounts = {
        systemProgram: SystemProgram.programId,
        web3NameService: WEB3_NAME_SERVICE_ID,
        feePayer: feePayer,
        record: recordKey,
        domainAccount: domainNameAccountKey,
        rootAccount: rootDomainKey,
        domainNameState: domainNameStateKey,
        centralState: CENTRAL_STATE_RECORDS,
        lastSetter: lastSetter,
    };

    const instruction = createSetPreviewInstruction(
        setPreviewInstructionAccounts,
        recordGate,
        protocol,
        content,
        nameAndRoot[0],
        nameAndRoot[1],
    );

    return setPreviewTransaction.add(instruction);
}
