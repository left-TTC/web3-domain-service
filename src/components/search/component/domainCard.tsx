import { Globe, Share2 } from "lucide-react"
import SearchResult from "../result/searchResult"
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { type SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState"
import StatusBadge from "./domainShow/statuBadge"
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider"


interface DomainCardProps {
    domainInfo: NameRecordState | null,
    domainName: string,
    auctionState: NameAuctionState | null,
    openSettlePage: () => void,
    resultState: SearchDomainResult | null,
}

const DomainCard: React.FC<DomainCardProps> = ({
    domainInfo, domainName, auctionState, openSettlePage, resultState
}) => {

    const {activeRootDomain} = useRootDomain()

    return(
        <div className="bg-[#111] border border-white/10 rounded-3xl p-1 shadow-2xl max-w-2xl mx-auto animate-fade-in-up mt-10 md:mt-16">
            
            <div className="bg-[#0a0a0a] rounded-[22px] p-5 md:p-8">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 md:mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-300 border border-white/10">
                            <Globe size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">{domainName}</h2>
                            <div className="flex items-center gap-2 mt-2 text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">
                                <span className="bg-white/5 px-2 py-0.5 rounded font-bold">Root: {activeRootDomain}</span>
                            </div>
                        </div>
                    </div>
                    <StatusBadge status={resultState} />
                </div>

                <div className="mb-3 md:mb-5">
                    <SearchResult
                        resultState={resultState}
                        domainInfo={domainInfo}
                        auctionState={auctionState}
                        openSettlePage={openSettlePage}
                    />
                </div>

                <div className="flex pl-4 w-full pt-2">
                    <button className="text-xs text-gray-500 font-bold hover:text-[#B4FC75] transition-colors flex items-center gap-1 justify-left md:justify-start w-full h-full">
                        <Share2 size={12}/> 分享此域名
                    </button>
                </div>

            </div>
        </div>
    )
}

export default DomainCard;
