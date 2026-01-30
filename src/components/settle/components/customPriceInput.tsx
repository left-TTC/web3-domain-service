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
            case SettleType.addRoot:
                return "stake for root name"
            case SettleType.settle:
                return "custom domain price"
        }
    }

    const ifMd = window.innerWidth >= 768;

    return(
        <div className="mb-3 md:mb-6 animate-fade-in">
            <label className="text-[9px] md:text-xs font-bold text-gray-500 uppercase mb-2 block">{getInfo()} (SOL)</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#B4FC75] transition-colors">
                    <Coins size={ifMd? 18:15} />
                </div>
                <input 
                    type="text"
                    inputMode="decimal"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border-[2px] border-white/10 rounded-xl py-2 md:py-4 pl-12 pr-4 text-[13px] md:text-xl font-mono font-bold text-white focus:outline-none focus:border-[#B4FC75]/50 focus:bg-white/[0.08] transition-all"
                    placeholder="0.00"
                />
            </div>
        </div>
    )
}


export default CustomPriceInput;
