import { RecommendSortWay } from "../sortButton";


export function sortMapDomains(
    domainMap: Map<string, number>,
    sortWay: RecommendSortWay,
): string[] {
    // [domain price]
    const domainArray = Array.from(domainMap.entries());

    switch (sortWay) {
        case RecommendSortWay.PriceToHigh:
            domainArray.sort((a, b) => a[1] - b[1]);
            break;

        case RecommendSortWay.PriceToLow:
            domainArray.sort((a, b) => b[1] - a[1]); 
            break;

        case RecommendSortWay.AtoZ:
            domainArray.sort((a, b) => a[0].localeCompare(b[0])); 
            break;

        case RecommendSortWay.ZtoA:
            domainArray.sort((a, b) => b[0].localeCompare(a[0]));
            break;

        default:
            break;
    }

    return domainArray.map(([domain]) => domain);
}