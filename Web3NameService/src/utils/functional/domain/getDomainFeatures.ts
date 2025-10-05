import { DomainState } from "../common/time/getDomainTimeState";



export function getDomainFeatures(
    domainBlock: string[],
    domainPrice: number | undefined,
    domainState: DomainState | null,
): string[] {
    

    const features: string[] = ["beauti", "valuable"];

    if(domainState = DomainState.Auctioning){
        features.push("At Auction")
    }

    return features
}