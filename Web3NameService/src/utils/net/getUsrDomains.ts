import { PublicKey, type Connection } from "@solana/web3.js";
import { CENTRAL_STATE_REGISTER, WEB3_NAME_SERVICE_ID } from "../constants/constants";
import { getMultipleReverseKeys } from "../functional/solana/getMultipleReverseKeys";
import { ReverseKeyState } from "../functional/common/class/reverseKeyState";



export async function getUsrDomains(
    connection: Connection,
    walletKey: PublicKey,
    rootDomainKey: PublicKey
): Promise<string[]> {
    const filters = [
        {
            memcmp: {
                offset: 32,
                bytes: walletKey.toBase58(),
            },
        },
        {
            memcmp: {
                offset: 0,
                bytes: rootDomainKey.toBase58(),
            },
        },
    ]

    const usrDomainAccounts = await connection.getProgramAccounts(
        WEB3_NAME_SERVICE_ID,
        {
            filters,
            dataSlice: { offset: 0, length: 0}
        }
    )
    const accountKeys = usrDomainAccounts.map((account) => account.pubkey);

    const domainReversesKeys = getMultipleReverseKeys(
        accountKeys, CENTRAL_STATE_REGISTER
    )

    const reverseDatas = await connection.getMultipleAccountsInfo(domainReversesKeys);

    console.log(reverseDatas[0])

    if(reverseDatas){
        let domains: string[] = []
        for(const data of reverseDatas){
            if(data){
                const state = new ReverseKeyState(data)
                console.log("data", state.storagedData)
                domains.push(state.storagedData);
            }
        }

        return domains;
    }

    return [""]
}