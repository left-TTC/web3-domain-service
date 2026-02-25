import {Coins} from "lucide-react"
import { SettleType } from "../settlement"


interface SuccessViewProps {
    value: number,
    action: SettleType,
    onChange: (v: number) => void
}

const CustomPriceInput: React.FC<SuccessViewProps> = ({
    value, onChange, action
}) => {

    const getInfo = () => {
        switch(action){
            case SettleType.STAKEROOT:
                return "stake for root name"
            case SettleType.SETTLE:
                return "custom domain price"
        }
    }

    const ifMd = window.innerWidth >= 768;

    // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
    const solValue = value / 1e9;
    
    // Format SOL value with appropriate decimal places
    const formatSolValue = (sol: number): string => {
        if (sol === 0) return "0 SOL";
        if (sol < 0.001) return sol.toExponential(4) + " SOL";
        if (sol < 1) return sol.toFixed(6) + " SOL";
        if (sol < 1000) return sol.toFixed(4) + " SOL";
        return sol.toFixed(2) + " SOL";
    };

    return(
        <div className="mb-3 md:mb-6 animate-fade-in">
            <label className="text-[9px] md:text-xs font-bold text-gray-500 uppercase mb-2 block">{getInfo()} (Lamports)</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#B4FC75] transition-colors">
                    <Coins size={ifMd? 18:15} />
                </div>
                <div className="relative">
                    <input 
                        type="text"
                        inputMode="decimal"
                        value={value}
                        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                        className="w-full bg-white/5 border-[2px] border-white/10 rounded-xl py-2 md:py-4 pl-12 pr-32 text-[13px] md:text-xl font-mono font-bold text-white focus:outline-none focus:border-[#B4FC75]/50 focus:bg-white/[0.08] transition-all"
                        placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <span className="text-xs md:text-sm text-gray-400 font-mono">
                            ≈ {formatSolValue(solValue)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CustomPriceInput;