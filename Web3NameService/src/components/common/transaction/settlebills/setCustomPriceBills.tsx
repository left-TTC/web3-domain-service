import { useTranslation } from "react-i18next"

import "@/style/components/commonStyle/transaction/settleBills/settleDomainBills.css"

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
                    <h1>{t("final")}:</h1>
                </div>
                <h1></h1>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                </div>
                <button className={`cryptoconfirmbutton ${canBeConfirm? "":"cannotclinck"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default SetCustomPriceBills;