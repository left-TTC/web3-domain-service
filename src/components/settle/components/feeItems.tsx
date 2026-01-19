import { Info } from "lucide-react"
import type { FeeItem } from "./function/useCalculateAllFee";


interface FeeItemsProps {
    feeItems: FeeItem[],
    total: number
}

const FeeItems: React.FC<FeeItemsProps> = ({
    feeItems, total
}) => {



    return(
        <div className="bg-black/40 rounded-xl py-2 px-4 md:py-4 border border-white/5 space-y-3">
            {feeItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-[12px] md:text-sm">
                    <div className="flex items-center gap-1 md:gap-1.5 text-gray-400 group relative">
                        {item.label}
                        {item.info && (
                        <>
                            <Info size={12} className="cursor-help hover:text-[#B4FC75]" />
                            <div className="absolute left-0 bottom-full mb-2 w-max max-w-[200px] px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {item.info}
                            </div>
                        </>
                        )}
                    </div>
                    <span className="font-mono text-white">{item.amount} SOL</span>
                </div>
            ))}
            
            <div className="h-px bg-white/10 my-1 md:my-2"></div>
            
            <div className="flex justify-between items-center">
                <span className="text-[14px] md:text-[16px] text-white font-bold">总计 (Total)</span>
                <span className="text-[16px] md:text-2xl font-mono font-bold text-[#B4FC75]">{(total/1e9).toFixed(4)} SOL</span>
            </div>
        </div>
    )
}

export default FeeItems;
