import type { NameAuctionState } from "../class/nameAuctionState";


export enum DomainState {
    Saling,
    Auctioning,
    Settling,
    Eroor
}

export const AUCTION_TIME = 600;
const SETTLE_TIME = 24000;

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
        console.log("auction")
        return DomainState.Auctioning
    }

    // 1759575370
    // 1759576183013

    console.log("now time: ", nowTime)
    console.log("small: ", updateTime + AUCTION_TIME)
    console.log("big: ", updateTime + AUCTION_TIME + SETTLE_TIME)

    if((updateTime + AUCTION_TIME) < nowTime && nowTime < (updateTime + AUCTION_TIME + SETTLE_TIME)) {
        console.log("resale")
        return DomainState.Settling
    }

    return DomainState.Saling
}