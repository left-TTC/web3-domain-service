import { Award, Clock } from "lucide-react";
import CardContainer from "./cardContainer";
import { useState } from "react";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";



interface HotAuctionItemProps {
    idx: number,
    item: NameAuctionState,
    name: string,
}

const HotAuctionItem: React.FC<HotAuctionItemProps> = ({
    idx, item, name
}) => {

    const [canParticipate, setCanParticipate] = useState(true)
    const [remainTime, setRemainTime] = useState(0)



    return (
        <CardContainer highlight={idx === 0}>
            {idx === 0 && (
                <div className="absolute top-0 right-0 p-4">
                    <Award className="text-[#B4FC75]" size={32} />
                </div>
            )}
            
            <h3 className="text-2xl font-bold font-mono mb-1 text-white">{name}</h3>

            <div className="space-y-4 mb-8">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group-hover:border-[#B4FC75]/20 transition-colors">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">当前最高价</p>
                    <p className="text-3xl font-mono font-bold text-[#B4FC75]">{item.highestPrice.toNumber().toFixed(2)} <span className="text-xs ml-1">SOL</span></p>
                </div>
                <div className="flex justify-between items-center px-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1.5"><Clock size={12}/> 剩余时间</span>
                    <span className="text-xs font-bold font-mono text-white">{item.updateTime.toNumber()}</span>
                </div>
            </div>

            <button className="w-full py-4 rounded-2xl font-bold text-black bg-[#B4FC75] hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-[#B4FC75]/10">
                立即参与竞价
            </button>
        </CardContainer>
    )
}

export default HotAuctionItem;