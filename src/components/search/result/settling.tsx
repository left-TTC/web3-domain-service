import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { Gavel } from "lucide-react"


interface SettlingProps {
    domainInfo: NameRecordState | null,
    auctionState: NameAuctionState | null,
    openSettlePage: () => void,
}

const Settling: React.FC<SettlingProps> = ({
    domainInfo, auctionState, openSettlePage
}) => {
    return(
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4 md:p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-500 mb-2 md:mb-3">
                <Gavel size={24} />
            </div>
            <h4 className="text-yellow-500 font-bold text-[15px] md:text-lg mb-1">最后加价阶段</h4>
            <p className="text-gray-400 text-[11px] font-normal md:text-sm mb-3 md:mb-4 max-w-sm">
                结算中，仍可加价，结算后无法追加
            </p>
            <button 
                onClick={openSettlePage}
                className="px-6 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/50 rounded-lg text-yellow-500 font-bold text-sm transition-colors"
            >
                继续加价
            </button>
        </div>
    )
}

export default Settling;
