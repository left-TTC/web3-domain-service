import { Award } from "lucide-react";
import CardContainer from "./cardContainer";
import { useState } from "react";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { CountDownTimer } from "@/components/common/show/countdownTimer";
import { getDeviceTypeByUA } from "@/utils/functional/wallet/isPhone";
import { useTranslation } from "react-i18next";



interface HotAuctionItemProps {
    idx: number,
    item: NameAuctionState,
    name: string,
}

const HotAuctionItem: React.FC<HotAuctionItemProps> = ({
    idx, item, name
}) => {

    const {t} = useTranslation()

    const [canParticipate, setCanParticipate] = useState(true)
    // const [remainTime, setRemainTime] = useState(0)

    const ifPhone = getDeviceTypeByUA()

    return (
        <CardContainer highlight={idx === 0}>
            {idx === 0 && (
                <div className="absolute top-0 right-0 p-4">
                    <Award className="text-[#B4FC75]" size={ifPhone==="desktop"? 32:28} />
                </div>
            )}
            
            <h3 className="text-[18px] md:text-2xl font-bold font-mono mb-1 text-white">{name}</h3>

            <div className="space-y-4 mb-4 md:mb-6">
                <div className="bg-white/5 rounded-2xl p-2 md:p-4 border border-white/5 group-hover:border-[#B4FC75]/20 transition-colors">
                    <p className="text-[8px] md:text-[11px] text-gray-500 uppercase font-bold mb-1">{t("nowhighest")}</p>
                    <p className="text-2xl md:text-3xl font-mono font-bold text-[#B4FC75]">{item.highestPrice.toNumber().toFixed(2)} <span className="text-xs ml-1">SOL</span></p>
                </div>
                <CountDownTimer initialMinutes={1} onFinish={() => setCanParticipate(false)}/>
            </div>

            <button 
                disabled={!canParticipate}
                className="w-full py-3 md:py-4 rounded-2xl font-bold text-black bg-[#B4FC75] hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-[#B4FC75]/10 disabled:bg-gray-200
                    disabled:text-gray-400
                    disabled:cursor-not-allowed
                    disabled:pointer-events-none
                    disabled:shadow-none
                    disabled:hover:opacity-100
                    disabled:active:scale-100"
                >
                {t("participatein")}
            </button>
        </CardContainer>
    )
}

export default HotAuctionItem;