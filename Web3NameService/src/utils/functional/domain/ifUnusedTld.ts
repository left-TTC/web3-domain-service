



import type { Connection } from "@solana/web3.js";
import { getHashedName } from "../solana/getHashedName";
import { getNameAccountKey } from "../solana/getNameAccountKey";

// 0 -- ok
// 1 -- can't use
// 2 -- created
export async function isUnusedTld(
    rootName: string, 
    connection: Connection,
): Promise<number> {
    const response = await fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
    const text = await response.text();

    const validTLDs = new Set(
        text
        .split("\n")
        .filter(line => line && !line.startsWith("#"))
        .map(line => line.trim().toUpperCase())
    );

    if(validTLDs.has(rootName.toUpperCase())){
        return 1
    }else{
        const rootKey = getNameAccountKey(
            getHashedName(rootName)
        )
        const rootInfo = await connection.getAccountInfo(rootKey)

        if(rootInfo){
            return 2
        }else return 0
    }
}