import type { Connection, PublicKey } from "@solana/web3.js";
import { IPFSRecordState } from "../functional/common/class/ipfsRecordState";
import { cutDomain } from "../functional/common/cutDomain";
import type { NameRecordState } from "../functional/common/class/nameRecordState";
import { getNameAccountKey } from "../functional/solana/getNameAccountKey";
import { getHashedName } from "../functional/solana/getHashedName";
import { getRecordKey, RecordType } from "../functional/solana/getRecordKey";



export async function getUsrDomainsRecord(
    usrDomains: string[],
    usrDomianIofoMap: Map<string, NameRecordState>,
    connection: Connection,
): Promise<Map<string, IPFSRecordState>> {

    let usrDomainRecordAccounts: PublicKey[] = []
        for(const domain of usrDomains){
            const nameAndRoot = cutDomain(domain)

            const nameAccount = getNameAccountKey(
                getHashedName(nameAndRoot[0]), null, usrDomianIofoMap.get(domain)!.parentName
            )
            usrDomainRecordAccounts.push(getRecordKey(
                nameAccount, RecordType.DNS
            ))
        }

        const infos = await connection.getMultipleAccountsInfo(usrDomainRecordAccounts)

        const recordsMap = new Map<string, IPFSRecordState>()
        infos.forEach((info, index) => {
            if (info) {
                recordsMap.set(usrDomains[index], new IPFSRecordState(info));
            }
        });

        return recordsMap
}