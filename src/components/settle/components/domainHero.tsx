import { Globe } from "lucide-react"
import { SettleType } from "../settlement";


interface DomainHeroProps {
    title: string,
    type: SettleType,
}

const DomainHero: React.FC<DomainHeroProps> = ({
    title, type
}) => {

    const getBigTitle = () => {
        switch(type){
            case SettleType.buy:
                return "Target Domain";
            case SettleType.settle:
                return "Target Domain";
            case SettleType.createRoot:
                return "Target Domain";
            default:
                return "Target Domain";
        }
    }

    const ifMd = window.innerWidth >= 768;

    return(
        <div className="bg-white/5 border border-white/5 rounded-2xl py-2 px-4 md:py-4 flex items-center gap-4 mb-4 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#B4FC75]/20 flex items-center justify-center text-[#B4FC75]">
                <Globe size={ifMd? 24:16} />
            </div>
            <div>
                <p className="text-[9px] md:text-xs text-gray-500 uppercase font-normal">{getBigTitle()}</p>
                <p className="text-[14px] md:text-xl font-mono font-bold text-white tracking-tight">{title}</p>
            </div>
        </div>
    )
}

export default DomainHero;