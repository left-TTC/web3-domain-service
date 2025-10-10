import { useTranslation } from "react-i18next"

import "@/style/components/commonStyle/transaction/settleBills/settleDomainBills.css"
import "@/style/components/commonStyle/transaction/settleBills/setCustomPriceBills.css"

export interface SetCustomPriceBillsProps {
    confirmFunction: () => void,
    canBeConfirm: boolean,
}

const SetCustomPriceBills: React.FC<SetCustomPriceBillsProps> = ({
    confirmFunction, canBeConfirm
}) => {

    const {t} = useTranslation()

    return(
        <div className="totalfees settletotal">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule settlebillsomeword">
                    <h1>{t("ComputeUnit")}:</h1>
                </div>
                <h1>{t("negligible")}</h1>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h1>{t("negligible")}</h1>
                </div>
                <button className={`setcustompricecryptoconfirmbutton ${canBeConfirm? "":"cannotsetthecustom"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default SetCustomPriceBills;