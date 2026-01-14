import { Flame } from "lucide-react"
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import HotAuctionItem from "./components/hotAuctionItem";



interface AuctionRecommendProps {
    hotItems: NameAuctionState[],
    itemNames: string[],
}

export interface AuctionDomain {
    name: string;
    currentBidSOL: number;
    timeRemaining: string;
    bidsCount: number;
}


const AuctionRecommend: React.FC<AuctionRecommendProps> = ({
    hotItems, itemNames
}) => {
    

    return(
        <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                    <Flame size={12} className="animate-pulse" /> 实时拍卖进行中
                </div>
                <h2 className="text-4xl font-bold tracking-tight">热门高价拍卖</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {itemNames.map((item, idx) => (
                    <HotAuctionItem item={hotItems[idx]} idx={idx} name={item} key={idx} />
                ))}
            </div>
        </section>
    )
}

export default AuctionRecommend;
