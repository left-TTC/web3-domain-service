import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills/settleBills.css"
import "@/style/components/commonStyle/transaction/settleBills/increasePriceBills.css"
import { useEffect, useState } from "react";

export interface IncreasePriceSettleBills {
    confirmFunction: () => void;
    solPrice: number,
    increaseNumber: number,
    originalNumber: number,
    ifRefferrerValid: boolean,
    ifUsrSelf: boolean,
}


const IncreasePriceSettleBills: React.FC<IncreasePriceSettleBills> = ({
    confirmFunction, solPrice, originalNumber, ifRefferrerValid, increaseNumber, ifUsrSelf
}) => {

    const {t} = useTranslation()

    const [canBeConfirm, setCanBeConfirm] = useState(false)

    useEffect(() => {
        if(ifRefferrerValid){
            if(increaseNumber > 0){
                setCanBeConfirm(true)
            }else setCanBeConfirm(false)
        }else setCanBeConfirm(false)
    }, [increaseNumber, ifRefferrerValid])

    return(
        <div className="increasesettlebillcss">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule increaseDeposit">
                    <h3>{t("origin")}:</h3>
                </div>
                <h1 className={`${ifUsrSelf && "thispricedelete"}`}>
                    {`${(originalNumber/1e9).toFixed(4)} SOL ($ ${(originalNumber/1e9/solPrice).toFixed(2)})`}
                </h1>
            </div>
            <div className="registerfee">
                <div className="registerrule increaseDeposit">
                    <h3>{t("Increase")}:</h3>
                </div>
                <h1>
                    {`${(originalNumber * increaseNumber /1e9).toFixed(4)} SOL ($ ${(originalNumber*increaseNumber/1e9/solPrice).toFixed(2)})`}
                </h1>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{(originalNumber * (ifUsrSelf? increaseNumber:(1+increaseNumber)) / 1e9).toFixed(4)} SOL</h2>
                </div>
                <button className={`cryptoconfirmbutton ${canBeConfirm? "":"cannotclinck"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default IncreasePriceSettleBills;