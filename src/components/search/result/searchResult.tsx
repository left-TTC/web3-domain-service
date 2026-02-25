import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState";
import Unintialized from "./uninitialized";
import Auction from "./auction";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import Loading from "./loading";
import Settling from "./settling";
import Listed from "./listed";

interface SearchResultProps {
    domainInfo: NameRecordState | null,
    resultState: SearchDomainResult | null,
    auctionState: NameAuctionState | null,
    openSettlePage: () => void,
    domainName: string,
}

const SearchResult: React.FC<SearchResultProps> = ({
    domainInfo, resultState, auctionState, openSettlePage, domainName
}) => {


    switch(resultState){
        case SearchDomainResult.uninitialized:
            return(
                <Unintialized openSettlePage={openSettlePage} />
            )
        case SearchDomainResult.auction:
            return(
                <Auction 
                    auctionState={auctionState}
                    domainName={domainName} 
                />
            )
        case SearchDomainResult.settling:
            return(
                <Settling
                    auctionState={auctionState}
                    openSettlePage={openSettlePage}
                />
            )
        case SearchDomainResult.listed:
            return(
                <Listed 
                    domainInfo={domainInfo} 
                    openSettlePage={openSettlePage}
                />
            )
        default :
            return(
                <Loading />
            )
    }
}

export default SearchResult;
