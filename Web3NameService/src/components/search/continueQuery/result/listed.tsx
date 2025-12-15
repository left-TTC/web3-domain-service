import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { Tag, User } from "lucide-react"


interface ListedProps {
    domainInfo: NameRecordState | null,
    openSettlePage: () => void,
}

const Listed: React.FC<ListedProps> = ({
    domainInfo, openSettlePage
}) => {
    

    return(
        <div className="bg-orange-900/10 border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                        <User size={16} />
                    </div>
                    <div>
                        <p className="text-xs text-orange-300 uppercase">当前持有者</p>
                        <p className="text-sm font-mono text-white">{domainInfo!.owner.toBase58()}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-orange-300 uppercase">起拍价</p>
                    <p className="text-2xl font-mono font-bold text-white">{(domainInfo!.customPrice.toNumber()).toFixed(4)} SOL</p>
                </div>
            </div>
            <button 
                onClick={() => openSettlePage()}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
                <Tag size={18} /> 立即购买
            </button>
        </div>
    )
}

export default Listed;
