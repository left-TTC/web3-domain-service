import { Gavel } from "lucide-react";

export interface AuctionItem {
    id: number;
    name: string;
    currentPrice: number;
    myBid: number;
    endTime: string;
    status: 'winning' | 'outbid';
}

interface AuctionListItemProps {
    item: AuctionItem
}

const primaryColor = '#B4FC75'; 

const AuctionListItem: React.FC<AuctionListItemProps> = ({
    item
}) => {


    return (
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10 hover:border-[#B4FC75]/50 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${item.status === 'winning' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                <Gavel size={20} />
                </div>
                <div>
                <p className="text-lg font-bold text-white flex items-center gap-2">
                    {item.name}
                    {item.status === 'winning' 
                        ? <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">领先</span>
                        : <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">被超越</span>
                    }
                </p>
                <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-2">
                    剩余时间: <span className="text-white">{item.endTime}</span>
                </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">当前出价 / 我的出价</p>
                <p className="font-mono text-sm mt-1">
                    <span className={item.status === 'winning' ? 'text-[#B4FC75]' : 'text-red-400'}>{item.currentPrice} SOL</span> 
                    <span className="text-gray-600 mx-1">/</span> 
                    <span className="text-gray-400">{item.myBid} SOL</span>
                </p>
                </div>
                
                <button className={`px-4 py-2 rounded-lg text-black text-xs font-bold hover:opacity-90 transition-opacity ${item.status === 'outbid' ? 'animate-pulse' : ''}`}
                    style={{ backgroundColor: item.status === 'outbid' ? '#ef4444' : primaryColor, color: item.status === 'outbid' ? 'white' : 'black' }}
                >
                    {item.status === 'outbid' ? '加价' : '查看'}
                </button>
            </div>
        </div>
    )
}


export default AuctionListItem;
