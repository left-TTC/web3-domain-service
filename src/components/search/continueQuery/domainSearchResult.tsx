import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import ContinueQuery from "./component/continueQuery";
import DomainCard from "./component/domainCard";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState";


interface DomainSearchResultProps {
    domainInfo: NameRecordState | null,
    domainName: string,
    auctionState: NameAuctionState | null,
    openSettlePage: () => void,
    resultState: SearchDomainResult | null,
}


const DomainSearchResult: React.FC<DomainSearchResultProps> = ({
    domainInfo, domainName, auctionState, openSettlePage, resultState
}) => {

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 relative overflow-x-hidden">

            <main className="max-w-4xl mx-auto px-6 pt-12 mt-40">  
                <ContinueQuery
                    searchingName={domainName}
                />
                <DomainCard 
                    domainInfo={domainInfo}
                    domainName={domainName}
                    auctionState={auctionState}
                    openSettlePage={openSettlePage}
                    resultState={resultState}
                />
            </main>
        </div>
    )
}

export default DomainSearchResult;
