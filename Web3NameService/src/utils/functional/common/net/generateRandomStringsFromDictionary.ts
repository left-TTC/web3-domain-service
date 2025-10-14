
import { getNameAccountKey } from "../../solana/getNameAccountKey";
import { getHashedName } from "../../solana/getHashedName";
import type { Connection, PublicKey } from "@solana/web3.js";
import { NameRecordState } from "../class/nameRecordState";
import { INIT_DOMAIN_PRICE } from "@/utils/constants/constants";



export async function generateRandomStringsFromDictionary(
    charLength: number, 
    count: number,
    rootDomains: string[],
    checkingRoot: string,
    connection: Connection,
    mustInclude: string = "",
): Promise<Map<string, number>> {

    const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json");
    const dictionary: { [ word: string ]: boolean} = await response.json();
    const words = Object.keys(dictionary).filter(word => word.length === charLength);

    const resultString: string[] = [];

    while (resultString.length < count) {
        let current = "";
        while (current.length < charLength) {
            const word = words[Math.floor(Math.random() * words.length)];
            if (current.length + word.length <= charLength) {
                current += word;
            }
        }

        if (mustInclude === "" || current.includes(mustInclude.toLowerCase())) {
            resultString.push(current);
        }
    }

    if(rootDomains?.length === 0) throw new Error("no roots")
        console.log(rootDomains)
        console.log(checkingRoot)
    if(!rootDomains.includes(checkingRoot)) throw new Error("mo this root")

    const rootDomain = getNameAccountKey(getHashedName(checkingRoot))

    const startPriceMap = new Map<string, number>()
    const domainKeys: PublicKey[] = []
    resultString.forEach((domainName) => {
        domainKeys.push(getNameAccountKey(
            getHashedName(domainName), null, rootDomain
        ))
    })

    const infos = await connection.getMultipleAccountsInfo(domainKeys)
    infos.forEach((info, index) => {
        if(info){
            const nameState = new NameRecordState(info)
            startPriceMap.set(resultString[index], nameState.customPrice.toNumber())
        }else{
            startPriceMap.set(resultString[index], INIT_DOMAIN_PRICE)
        }
    })

    return startPriceMap;
}