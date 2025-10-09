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

    const domains: string[] = []
    const domainState: NameRecordState[] = []
    const domainMap = new Map<string, NameRecordState>();

    // get all the usr domain
    const filters = [
        {
            dataSize: 104,
        },
        {
            memcmp: {
                offset: 32,
                bytes: walletKey.toBase58(),
            },
        }
    ]

    const allUsrDomainAccounts = await connection.getProgramAccounts(
        WEB3_NAME_SERVICE_ID,
        // need get account info
        { filters }
    );

    // index is right
    const accountKeys = allUsrDomainAccounts.map((account) => account.pubkey);
    const accountsInfo  = allUsrDomainAccounts.map((account) => account.account);

    // get domain State
    for (const info of accountsInfo){
        console.log("info length: ", info.data.length)
        domainState.push(new NameRecordState(info))
    }

    // get domain name
    const domainReversesKeys = getMultipleReverseKeys(
        accountKeys, CENTRAL_STATE_REGISTER
    )
    const reverseDatas = await connection.getMultipleAccountsInfo(domainReversesKeys);
    if(reverseDatas){
        for(const data of reverseDatas){
            if(data){
                const state = new ReverseKeyState(data)
                const domainName = state.storagedData;

                const thisNameState = domainState[reverseDatas.indexOf(data)]

                const rootName = rootDomainMap.get(thisNameState.parentName.toBase58())
                if (rootName) {
                    const fullName = `${domainName}.${rootName}`;
                    domains.push(fullName);
                    domainMap.set(fullName, thisNameState);
                }
            }
        }
    }

    return [domains, domainMap]

}