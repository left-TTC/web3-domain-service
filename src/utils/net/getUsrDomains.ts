import { PublicKey, type Connection } from "@solana/web3.js";
import { CENTRAL_STATE_REGISTER, WEB3_NAME_SERVICE_ID } from "../constants/constants";
import { getMultipleReverseKeys } from "../functional/solana/getMultipleReverseKeys";
import { ReverseKeyState } from "../functional/common/class/reverseKeyState";
import { NameRecordState } from "../functional/common/class/nameRecordState";


export async function getAllUsrDomains(
    connection: Connection,
    walletKey: PublicKey,
    // the reflection of all the rootdomains
    // param1 string use  base 58 key
    rootDomainMap: Map<string, string>,
): Promise<[string[], Map<string, NameRecordState>]> {

    const domains: string[] = [];
    const domainMap = new Map<string, NameRecordState>();

    // Get all user domains where owner matches walletKey
    // owner is at offset 32, length 32
    const filters = [
        {
            dataSize: 137,
        },
        {
            memcmp: {
                offset: 32,
                bytes: walletKey.toBase58(),
            },
        }
    ];

    const allUsrDomainAccounts = await connection.getProgramAccounts(
        WEB3_NAME_SERVICE_ID,
        { filters }
    );

    const accountKeys = allUsrDomainAccounts.map((account) => account.pubkey);
    const accountsInfo = allUsrDomainAccounts.map((account) => account.account);

    // Parse domain states
    const domainStates = accountsInfo.map((info) => new NameRecordState(info));

    // Get domain names from reverse accounts
    const domainReversesKeys = getMultipleReverseKeys(
        accountKeys,
        CENTRAL_STATE_REGISTER
    );

    const reverseDatas = await connection.getMultipleAccountsInfo(domainReversesKeys);

    if(reverseDatas){
        reverseDatas.forEach((data, index) => {
            if(!data) return;

            const reverseState = new ReverseKeyState(data);
            const domainName = reverseState.storagedData;
            const nameState = domainStates[index];

            const rootName = rootDomainMap.get(nameState.parentName.toBase58());
            if (rootName) {
                const fullName = `${domainName}.${rootName}`;
                domains.push(fullName);
                domainMap.set(fullName, nameState);
            }
        });
    }

    return [domains, domainMap];
}