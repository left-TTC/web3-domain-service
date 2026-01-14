import {DollarSign} from "lucide-react"


interface SuccessViewProps {
    value: number,
    onChange: (v: number) => void
}

const CustomPriceInput: React.FC<SuccessViewProps> = ({
    value, onChange
}) => {



    return(
        <div className="mb-6 animate-fade-in">
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">自定义出价金额 (SOL)</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#B4FC75] transition-colors">
                    <DollarSign size={18} />
                </div>
                <input 
                    type="number" 
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xl font-mono font-bold text-white focus:outline-none focus:border-[#B4FC75]/50 focus:bg-white/[0.08] transition-all"
                    placeholder="0.00"
                />
            </div>
        </div>
    )
}


export default CustomPriceInput;
