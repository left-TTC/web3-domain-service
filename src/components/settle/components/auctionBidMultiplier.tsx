import { TrendingUp } from "lucide-react";
import { useRef } from "react";

interface AuctionBidMultiplierProps {
  currentPrice: number;
  onUpdate: (v: number) => void;
}

const AuctionBidMultiplier: React.FC<AuctionBidMultiplierProps> = ({
  currentPrice,
  onUpdate,
}) => {
    const multipliers = [0.05, 0.1, 0.25];

    const startPrice = useRef(currentPrice);

    const calcNextBid = (rate: number) => {
        const percentageIncrement = startPrice.current * rate;
        return startPrice.current + percentageIncrement
    };

    return (
        <div className="mb-4 md:mb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-[#B4FC75]" />
                <span className="text-[12px] md:text-[16px] font-bold text-gray-500 uppercase">
                    快速加价(SOL)
                </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {multipliers.map((m) => {
                    const nextBid = calcNextBid(m);

                    return (
                        <button
                            key={m}
                            onClick={() => onUpdate(nextBid)}
                            className="py-2 bg-white/5 border border-white/5 rounded-lg text-sm font-mono hover:bg-[#B4FC75]/10 hover:border-[#B4FC75]/30 hover:text-[#B4FC75] transition-all"
                        >
                            +{m * 100}% <span className="text-xs opacity-60">({(nextBid/1e9).toFixed(4)})</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AuctionBidMultiplier;
