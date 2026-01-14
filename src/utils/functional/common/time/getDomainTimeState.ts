import type { NameAuctionState } from "../class/nameAuctionState";


export enum DomainState {
    Saling,
    Auctioning,
    Settling,
    Eroor
}

export const AUCTION_TIME = 600;

export function getDomainTimeState(
    domainState: NameAuctionState
): DomainState {
    const nowTime = Date.now() / 1000

    console.log(domainState.settled);

    const updateTime = domainState.updateTime.toNumber();

    if(updateTime > nowTime){
        console.log("err")
        return DomainState.Eroor
    }
    
    if((updateTime + AUCTION_TIME) > nowTime) {
        console.log("auction")
        return DomainState.Auctioning
    }

    console.log(domainState)

    if (!domainState.settled) {
        return DomainState.Settling
    }

    return DomainState.Saling
}