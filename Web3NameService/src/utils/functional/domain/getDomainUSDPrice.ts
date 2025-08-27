


//usdt
export function getDomainUSDPrice(
    domainName: string
): number {
    switch(domainName.length){
        case 1:
            return 750;
        case 2:
            return 700;
        case 3:
            return 640;
        case 4:
            return 160;
        default:
            return 20 
    }
}