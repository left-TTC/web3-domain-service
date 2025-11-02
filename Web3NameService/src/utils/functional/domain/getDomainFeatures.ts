import type { TFunction } from "i18next";
import { DomainState } from "../common/time/getDomainTimeState";



export async function getDomainFeatures(
    domainBlock: string[],
    domainPrice: number | undefined,
    domainState: DomainState | null,
    t: TFunction<"translation", undefined>,
): Promise<string[]> {

    const lengthPop = (features: string[]) => {
        if(features.length > 3){
            features.pop()
        }
    }

    const features: string[] = [];

    if(domainBlock[1] === "web3"){
        features.push(t("origin"))
    }
    if(/[\p{Emoji_Presentation}\p{Emoji}\u200d]+/u.test(domainBlock[0])){
        features.push(t("emoji"))
    }
    if(domainBlock[0].length <= 5){
        features.push(t("concise"))
    }
    if(domainPrice && domainPrice > 200000000){
        features.push(t("expensive"))
        lengthPop(features)
    }
    if(await isEnglishWord(domainBlock[0])){
        features.push(t("rare"))
        lengthPop(features)
    }
    if(domainState === DomainState.Auctioning){
        features.push("At Auction")
        lengthPop(features)
    }

    console.log("features: ", features)
    return features
}

async function isEnglishWord(word: string): Promise<boolean> {
    if (!/^[a-zA-Z]+$/.test(word)) return false;

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return response.ok; 
    } catch (err) {
        console.error("Word check failed:", err);
        return false;
    }
}