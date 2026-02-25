import type { NameAuctionState } from "../class/nameAuctionState";


export enum DomainState {
    Auctioning,
    Settling,
    Eroor
}

export const AUCTION_TIME = 300;

export function getDomainTimeState(
    domainState: NameAuctionState
): DomainState {
    const nowTime = Date.now() / 1000

    const updateTime = domainState.updateTime.toNumber();

    if(updateTime > nowTime){
        console.log("err")
        return DomainState.Eroor
    }
    
    if((updateTime + AUCTION_TIME) > nowTime) {
        console.log("auctioning")
        return DomainState.Auctioning
    }

    return DomainState.Settling
}