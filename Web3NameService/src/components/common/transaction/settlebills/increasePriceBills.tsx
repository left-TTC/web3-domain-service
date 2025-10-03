import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills/settleBills.css"
import "@/style/components/commonStyle/transaction/settleBills/increasePriceBills.css"
import { useEffect, useState } from "react";

export interface IncreasePriceSettleBills {
    confirmFunction: () => void;
    totalDecimals: number,
    totalLamports: number | null,
    ratio: number | null,
    originalNumber: number,
}


const IncreasePriceSettleBills: React.FC<IncreasePriceSettleBills> = ({
    confirmFunction, totalDecimals, totalLamports, ratio, originalNumber
}) => {

    const {t} = useTranslation()

    const [canBeConfirm, setCanBeConfirm] = useState(false)

    useEffect(() => {
        if(ratio && totalLamports){
            if(totalDecimals > originalNumber){
                setCanBeConfirm(true)
            }else setCanBeConfirm(false)
        }else setCanBeConfirm(false)
    }, [ratio, totalLamports])

    return(
        <div className="totalfees">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("deposit")}:</h1>
                </div>
                <h1>
                    $ {ratio&&totalLamports ? 
                    `${(totalDecimals/1e6 * ratio).toFixed(3)} (${(totalLamports * ratio).toFixed(4)} SOL)`:
                    "Loading"
                    }
                </h1>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{ratio&&totalLamports&& (totalLamports * ratio).toFixed(4)} SOL</h2>
                </div>
                <button className={`cryptoconfirmbutton ${canBeConfirm? "":"cannotclinck"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default IncreasePriceSettleBills;