import CountdownTimer2 from "@/components/common/show/countdownTimer2";
import { biddingDomain } from "@/components/usrPage/function/useAuctioningDomain";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useAtom } from "jotai";
import { Check, Clock, Gavel } from "lucide-react"
import { useTranslation } from "react-i18next"


interface AuctionProps {
    auctionState: NameAuctionState | null,
    domainName: string,
}

const Auction: React.FC<AuctionProps> = ({
    auctionState, domainName
}) => {
    
    const { t } = useTranslation();
    const [auctioningDomain, setAuctioningDomain] = useAtom(biddingDomain)
    
    const isInAuctionList = domainName in auctioningDomain;
    
    const addToAuctionList = () => {
        if (!isInAuctionList) {
            setAuctioningDomain(prev => ({
                ...prev,
                [domainName]: auctionState?.highestPrice.toNumber() || 0,
            }))
        }
    }

    return(
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div>
                    <p className="text-xs text-purple-300 uppercase mb-1 font-bold">{t("currentHighestBid")}</p>
                    <p className="text-[13px] md:text-3xl font-mono font-bold text-white">{(auctionState!.highestPrice.toNumber() / 1e9).toFixed(4)} SOL</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-purple-300 uppercase mb-1 font-bold">{t("remainTime")}</p>
                    <div className="text-[13px] md:text-3xl font-mono font-bold text-white flex items-center justify-end gap-2">
                        <Clock size={24} className="text-purple-400 animate-pulse" />
                        {auctionState ? 
                            (<CountdownTimer2 targetTimestamp={auctionState?.updateTime.toNumber() + 100000}/>):
                            ("UNKNOW")    
                        }
                    </div>
                </div>
            </div>

            {isInAuctionList ? (
                <div 
                    onClick={() => {}}
                    className="text-[13px] md:text-[15px] w-full py-3.5 rounded-xl font-bold text-white bg-purple-400 border border-green-400/30 shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                >
                    <Check size={18} /> {t("alreadyInAuctionList")}
                </div>
            ) : (
                <button 
                    onClick={addToAuctionList}    
                    className="text-[13px] md:text-[15px] w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
                >
                    <Gavel size={18} /> {t("addToAuctionList")}
                </button>
            )}
        </div>
    )
}

export default Auction;
