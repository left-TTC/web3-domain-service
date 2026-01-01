import {TrendingUp} from "lucide-react"


interface SuccessViewProps {
    currentPrice: number, 
    onUpdate: (v: number) => void 
}

const AuctionBidMultiplier: React.FC<SuccessViewProps> = ({
    currentPrice, onUpdate
}) => {

    const multipliers = [0.05, 0.1, 0.25];

    return(
        <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-[#B4FC75]" />
                <span className="text-xs font-bold text-gray-500 uppercase">快速加价</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {multipliers.map((m) => (
                    <button
                        key={m}
                        onClick={() => onUpdate(currentPrice * (1 + m))}
                        className="py-2 bg-white/5 border border-white/5 rounded-lg text-sm font-mono hover:bg-[#B4FC75]/10 hover:border-[#B4FC75]/30 hover:text-[#B4FC75] transition-all"
                    >
                        +{m * 100}%
                    </button>
                ))}
            </div>
        </div>
    )
}


export default AuctionBidMultiplier;
