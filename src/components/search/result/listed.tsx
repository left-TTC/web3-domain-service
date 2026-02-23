import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { cutString } from "@/utils/functional/common/cutString";
import { Tag, User } from "lucide-react"
import { useTranslation } from "react-i18next"


interface ListedProps {
    domainInfo: NameRecordState | null,
    openSettlePage: () => void,
}

const Listed: React.FC<ListedProps> = ({
    domainInfo, openSettlePage
}) => {
    
    const { t } = useTranslation();
    console.log(domainInfo?.customPrice.toNumber())

    return(
        <div className="bg-orange-900/10 border border-orange-500/30 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                        <User size={16} />
                    </div>
                    <div>
                        <p className="text-xs text-orange-300 uppercase">{t("currentHolder")}</p>
                        <p className="text-sm font-mono text-white">{cutString(domainInfo!.owner.toBase58(), 3, 3, "...")}</p>
                    </div>
                </div>
                <div className="text-left">
                    <p className="text-xs text-orange-300 uppercase">{t("startingPrice")}</p>
                    <p className="text-sm md:text-2xl font-mono font-bold text-white">{(domainInfo!.customPrice.toNumber() / 1e9).toFixed(4)} SOL</p>
                </div>
            </div>
            <button 
                onClick={() => openSettlePage()}
                className="text-[13px] md:text-[15px] w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
                <Tag size={18} /> {t("buyNow")}
            </button>
        </div>
    )
}

export default Listed;
