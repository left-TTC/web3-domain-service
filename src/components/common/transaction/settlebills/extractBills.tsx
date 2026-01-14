import { useTranslation } from "react-i18next"

import "@/style/components/commonStyle/transaction/settleBills/extractBills.css"

export interface ExtractBillsProps {
    confirmFunction: () => void,
    canBeConfirm: boolean,
    willExtract: number,
}

const ExtractBills: React.FC<ExtractBillsProps> = ({
    confirmFunction, canBeConfirm, willExtract
}) => {

    const {t} = useTranslation()

    return(
        <div className="extractbills">
            <h1>{t("extract")}</h1>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h1 className="extractAdd">
                        + {willExtract.toFixed(4)} SOL
                    </h1>
                </div>
                <button className={`setcustompricecryptoconfirmbutton ${canBeConfirm? "":"cannotsetthecustom"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default ExtractBills;