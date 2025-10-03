import type { Connection } from "@solana/web3.js";
import { cutDomain } from "../cutDomain";
import { getNameAccountKey } from "../../solana/getNameAccountKey";
import { getHashedName } from "../../solana/getHashedName";


export async function getDomainDepositRatio(
    domainName: string,
    connection: Connection,
): Promise<number> {
    const domainAndRoot = cutDomain(domainName)

    const rootDomainName = getNameAccountKey(
        getHashedName(domainAndRoot[1])
    )

    const domainNameKey = getNameAccountKey(
        getHashedName(domainName), null, rootDomainName
    )

    const domainInfo = await connection.getAccountInfo(domainNameKey)
    if(!domainInfo){
        return 0.1
    }
    return 0.05
}