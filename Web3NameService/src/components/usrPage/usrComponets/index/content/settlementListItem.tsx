import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { CheckCircle } from "lucide-react";



export interface SettlementItem {
    id: number;
    name: string;
    amount: number;
}

interface SettlementListItemProps {
    name: string,
    item: NameAuctionState
}


const SettlementListItem: React.FC<SettlementListItemProps> = ({
    item, name
}) => {

    return(
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10 border-l-4 border-l-[#B4FC75]">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-[#B4FC75]/20 text-[#B4FC75]">
                    <CheckCircle size={20} />
                </div>
                <div>
                    <p className="text-lg font-bold text-white">{name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        '竞拍成功，等待领取 NFT'
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="px-4 py-2 rounded-lg border border-[#B4FC75] text-[#B4FC75] text-xs font-bold hover:bg-[#B4FC75] hover:text-black transition-all flex items-center gap-1">
                    '领取域名'
                </button>
            </div>
        </div>
    )
}

export default SettlementListItem;
