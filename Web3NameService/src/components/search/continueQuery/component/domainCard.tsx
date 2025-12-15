import { Globe, Share2 } from "lucide-react"
import SearchResult from "../result/searchResult"
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { useEffect, useState } from "react"
import { getSearchDomainState, type SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState"
import StatusBadge from "./domainShow/statuBadge"
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider"


interface DomainCardProps {
    domainInfo: NameRecordState | null,
    domainName: string,
    auctionState: NameAuctionState | null,
    openSettlePage: () => void,
}

const DomainCard: React.FC<DomainCardProps> = ({
    domainInfo, domainName, auctionState, openSettlePage
}) => {

    const {activeRootDomain} = useRootDomain()

    const [resultState, setResultState] = useState<SearchDomainResult | null>(null)

    useEffect(() => {
        setResultState(getSearchDomainState(domainInfo, auctionState))
    }, [domainInfo])

    return(
        <div className="bg-[#111] border border-white/10 rounded-3xl p-1 shadow-2xl max-w-2xl mx-auto animate-fade-in-up mt-16">
            
            <div className="bg-[#0a0a0a] rounded-[22px] p-6 md:p-8">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-300 border border-white/10">
                            <Globe size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">{domainName}</h2>
                            <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs uppercase tracking-wider">
                                <span className="bg-white/5 px-2 py-0.5 rounded">Root: {activeRootDomain}</span>
                            </div>
                        </div>
                    </div>
                    <StatusBadge status={resultState} />
                </div>

                <div className="mb-8">
                    <SearchResult
                        resultState={resultState}
                        domainInfo={domainInfo}
                        auctionState={auctionState}
                        openSettlePage={openSettlePage}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                    <div className="text-center md:text-left border-l border-white/5 pl-4">
                        <button className="text-xs text-gray-500 hover:text-[#B4FC75] transition-colors flex items-center gap-1 justify-center md:justify-start w-full h-full">
                            <Share2 size={12}/> 分享此域名
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DomainCard;
