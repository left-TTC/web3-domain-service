import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { Clock, Gavel } from "lucide-react"


interface AuctionProps {
    domainInfo: NameRecordState | null,
    auctionState: NameAuctionState | null,
    openSettlePage: () => void,
}

const Auction: React.FC<AuctionProps> = ({
    domainInfo, auctionState, openSettlePage
}) => {
    
    console.log(typeof domainInfo)

    return(
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div>
                    <p className="text-xs text-purple-300 uppercase mb-1">当前最高出价</p>
                    <p className="text-3xl font-mono font-bold text-white">{(auctionState!.highestPrice.toNumber() / 1e9).toFixed(4)} SOL</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-purple-300 uppercase mb-1">剩余时间</p>
                    <p className="text-3xl font-mono font-bold text-white flex items-center justify-end gap-2">
                        <Clock size={24} className="text-purple-400 animate-pulse" />
                        1
                    </p>
                </div>
            </div>

            <div className="w-full h-1.5 bg-gray-700 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-purple-500 w-[75%] rounded-full"></div>
            </div>

            <button 
                onClick={() => openSettlePage()}    
                className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
            >
                <Gavel size={18} /> 参与竞价
            </button>`
        </div>
    )
}

export default Auction;
