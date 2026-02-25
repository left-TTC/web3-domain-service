

import { useTranslation } from "react-i18next";

import { cutString } from "@/utils/functional/common/cutString";
import type { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { ArrowRight, Globe } from "lucide-react";
import { CREATE_ROOT_TARGET } from "@/utils/constants/constants";

export interface StakeItemProps{
    clink: (item: rootStateAccount) => void;
    item: rootStateAccount;
    progress: number
}

const primaryColor = '#B4FC75';

const StakeItem: React.FC<StakeItemProps> = ({
    clink, item, progress
}) => {

    const {t} = useTranslation();

    return(
        <div key={item.name} className="group relative bg-[#111] border border-white/10 rounded-2xl p-5 md:p-6 hover:border-[#B4FC75]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-1 md:mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#B4FC75] group-hover:text-black transition-colors duration-300">
                    <Globe size={20} />
                </div>
            </div>

            <h3 className="text-3xl font-bold mb-1 tracking-tight">.{item.name}</h3>
            <p className="text-sm text-gray-400 mb-4 md:mb-6 flex items-center gap-1">
                {t("from")} <span className="text-white underline decoration-dotted font-normal">{cutString(item.initiator.toBase58(), 5, 5, "...")}</span> 
            </p>

            <div className="mb-4">
                <div className="flex justify-between text-sm mb-2 font-mono">
                    <span className="text-white">{(item.amount.toNumber() / 1e9).toLocaleString()} SOL</span>
                    <span className="text-gray-400">of {(CREATE_ROOT_TARGET / 1e9).toLocaleString()} SOL</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%`, backgroundColor: primaryColor }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <button 
                    onClick={() => clink(item)}
                    className="text-sm font-bold hover:underline decoration-2 underline-offset-4 decoration-[#B4FC75] flex items-center gap-1 transition-all"
                >
                    Stake SOL <ArrowRight size={14} />
                </button>
            </div>
        </div>
    )
}

export default StakeItem;




