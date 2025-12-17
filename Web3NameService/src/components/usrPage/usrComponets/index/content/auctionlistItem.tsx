import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { PublicKey } from "@solana/web3.js";
import { Gavel } from "lucide-react";
import { useEffect, useState } from "react";


interface AuctionListItemProps {
    item: NameAuctionState,
    name: string,
    localAuctionName: Record<string, number>,
    searchKey: PublicKey | null,
}

const primaryColor = '#B4FC75'; 

const AuctionListItem: React.FC<AuctionListItemProps> = ({
    item, name, localAuctionName, searchKey
}) => {

    const [statu, setStatu] = useState<'winning' | 'outbid' | null>(null)
    
    useEffect(() => {
        if(!searchKey) return
        if (searchKey.toBase58() === item.highestBidder.toBase58()){
            setStatu('winning')
        }else setStatu('outbid')
    }, [searchKey])

    const myPrice = localAuctionName[name] ?? "未知"

    return (
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10 hover:border-[#B4FC75]/50 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${statu === 'winning' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                <Gavel size={20} />
                </div>
                <div>
                <p className="text-lg font-bold text-white flex items-center gap-2">
                    {name}
                    {statu=== 'winning' 
                        ? <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">领先</span>
                        : <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">被超越</span>
                    }
                </p>
                <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-2">
                    剩余时间: <span className="text-white">{1}</span>
                </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">当前出价 / 我的出价</p>
                <p className="font-mono text-sm mt-1">
                    <span className={statu === 'winning' ? 'text-[#B4FC75]' : 'text-red-400'}>{(item.highestPrice.toNumber() /1e9).toFixed(4)} SOL</span> 
                    <span className="text-gray-600 mx-1">/</span> 
                    <span className="text-gray-400">{myPrice} SOL</span>
                </p>
                </div>
                
                <button className={`px-4 py-2 rounded-lg text-black text-xs font-bold hover:opacity-90 transition-opacity ${statu === 'outbid' ? 'animate-pulse' : ''}`}
                    style={{ backgroundColor: statu === 'outbid' ? '#ef4444' : primaryColor, color: statu === 'outbid' ? 'white' : 'black' }}
                >
                    {statu === 'outbid' ? '加价' : '查看'}
                </button>
            </div>
        </div>
    )
}


export default AuctionListItem;
