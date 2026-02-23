import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { Gavel } from "lucide-react"
import { useTranslation } from "react-i18next"


interface SettlingProps {
    domainInfo: NameRecordState | null,
    auctionState: NameAuctionState | null,
    openSettlePage: () => void,
}

const Settling: React.FC<SettlingProps> = ({
    domainInfo, auctionState, openSettlePage
}) => {
    const { t } = useTranslation();
    
    return(
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4 md:p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-500 mb-2 md:mb-3">
                <Gavel size={24} />
            </div>
            <h4 className="text-yellow-500 font-bold text-[15px] md:text-lg mb-1">{t("finalBiddingStage")}</h4>
            <p className="text-gray-400 text-[11px] font-normal md:text-sm mb-3 md:mb-4 max-w-sm">
                {t("settlingDescription")}
            </p>
            
            {auctionState && (
                <div className="mb-3 md:mb-4 w-full">
                    <p className="text-xs text-yellow-300 uppercase mb-1 font-bold">{t("currentHighestBid")}</p>
                    <p className="text-[16px] md:text-2xl font-mono font-bold text-white">
                        {(auctionState.highestPrice.toNumber() / 1e9).toFixed(4)} SOL
                    </p>
                </div>
            )}
            
            <button 
                onClick={openSettlePage}
                className="px-6 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/50 rounded-lg text-yellow-500 font-bold text-sm transition-colors"
            >
                {t("continueBidding")}
            </button>
        </div>
    )
}

export default Settling;
