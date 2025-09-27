import type { NameAuctionState } from "../class/nameAuctionState";


export enum DomainState {
    Saling,
    Auctioning,
    Settling,
    Eroor
}

const AUCTION_TIME = 2400;
const SETTLE_TIME = 2400;

export function getDomainTimeState(
    domainState: NameAuctionState
): DomainState {
    const nowTime = Date.now()

    const updateTime = domainState.updateTime.toNumber();

    if(updateTime > nowTime) return DomainState.Eroor
    
    if((updateTime + AUCTION_TIME) > nowTime) return DomainState.Auctioning

    if((updateTime + AUCTION_TIME) < nowTime && nowTime < (updateTime + AUCTION_TIME + SETTLE_TIME)) return DomainState.Settling

    return DomainState.Saling
}