import type { NameAuctionState } from "../common/class/nameAuctionState";
import type { NameRecordState } from "../common/class/nameRecordState";
import { DomainState, getDomainTimeState } from "../common/time/getDomainTimeState";


export enum SearchDomainResult {
    uninitialized,
    auction,
    settling,
    listed,
    set,
    loading
}


export function getSearchDomainState(
    domainInfo: NameRecordState | null,
    auctionState: NameAuctionState | null,
): SearchDomainResult | null {

    if(auctionState){
        switch(getDomainTimeState(auctionState)){
            case DomainState.Auctioning:
                return SearchDomainResult.auction
            case DomainState.Saling:
                return SearchDomainResult.listed
            case DomainState.Settling:
                return SearchDomainResult.settling
        }
    }

    if(!domainInfo) return SearchDomainResult.uninitialized;

    return SearchDomainResult.listed
}