import { INIT_DOMAIN_PRICE } from "@/utils/constants/constants"
import { ArrowRight, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"


interface UnintializedProps {
    openSettlePage: () => void,
}

const Unintialized: React.FC<UnintializedProps> = ({
    openSettlePage
}) => {

    const {t} = useTranslation()

    return(
        <div className="bg-[#B4FC75]/10 border border-[#B4FC75]/20 rounded-xl p-4 md:p-6">
            <h4 className="text-[#B4FC75] font-bold mb-2 flex items-center gap-2 text-[13px] md:text-[16px]">
                <Sparkles size={18} /> {t('unregisteredDomain')}
            </h4>
            <p className="text-gray-400 text-[11px] md:text-sm mb-4 md:mb-6 font-normal">
                {t('firstDiscoverDomain')}
            </p>
            <div className="flex items-center justify-between">
                <div className="gap-1">
                    <p className="text-xs text-gray-500 uppercase font-bold">{t('startingPrice')}</p>
                    <p className="text-[18px] md:text-2xl font-mono font-bold text-white">{INIT_DOMAIN_PRICE / 1e9} SOL</p>
                </div>
                <button
                    onClick={() => openSettlePage()} 
                    className="text-[12px] md:text-[16px] px-5 md:px-8 py-3 rounded-xl font-bold text-black bg-[#B4FC75] hover:opacity-90 transition-all shadow-lg shadow-[#B4FC75]/20 flex items-center gap-2"
                >
                    {t('startAuction')} <ArrowRight size={18} />
                </button>
            </div>
        </div>
    )
}

export default Unintialized;
