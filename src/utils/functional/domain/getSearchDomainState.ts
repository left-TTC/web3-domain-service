import type { NameAuctionState } from "../common/class/nameAuctionState";
import type { NameRecordState } from "../common/class/nameRecordState";
import { DomainState, getDomainTimeState } from "../common/time/getDomainTimeState";


export enum SearchDomainResult {
    uninitialized,
    auction,
    settling,
    listed,
    error,
    loading
}


export function getSearchDomainState(
    domainInfo: NameRecordState | null,
    auctionState: NameAuctionState | null,
): SearchDomainResult {

    if(domainInfo){
        console.log("get account info")
        // means it can't be uninitialized
        if(auctionState){
            console.log("get auction info")
            switch(getDomainTimeState(auctionState)){
                case DomainState.Auctioning:
                    // This means it is being auctioned.
                    return SearchDomainResult.auction
                case DomainState.Saling:
                    return SearchDomainResult.listed
                case DomainState.Settling:
                    // This means it was bought, but the owner didn't pay it
                    return SearchDomainResult.settling
                default:
                    return SearchDomainResult.error
                    break;
            }
        }else{
            console.log("impossible")
            return SearchDomainResult.error
        }
    }else{
        console.log("no account info")
        if(auctionState){
            console.log("get auction info")
            switch(getDomainTimeState(auctionState)){
                case DomainState.Auctioning:
                    return SearchDomainResult.auction
                case DomainState.Saling:
                    console.log("impossible")
                    return SearchDomainResult.error
                case DomainState.Settling:
                    return SearchDomainResult.settling
                default:
                    break;
            }
        }else{
            console.log("no auction info")
            return SearchDomainResult.uninitialized
        }
    }

    console.log("error")
    return SearchDomainResult.error
}