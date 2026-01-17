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
    setResultState: React.Dispatch<React.SetStateAction<SearchDomainResult | null>>,
}


const DomainSearchResult: React.FC<DomainSearchResultProps> = ({
    domainInfo, domainName, auctionState, openSettlePage, resultState, setResultState
}) => {

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 relative overflow-x-hidden">

            <main className="max-w-4xl mx-auto px-6 mt-32 md:mt-52">  
                <ContinueQuery
                    searchingName={domainName}
                    setResultState={setResultState}
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
