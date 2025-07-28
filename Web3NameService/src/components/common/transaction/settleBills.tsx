import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills.css"

export interface SettleBillsProps {
    confirmFunction: () => void;
}


const SettleBills: React.FC<SettleBillsProps> = ({
    confirmFunction
}) => {

    const {t} = useTranslation()

    return(
        <div className="totalfees">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("domainprice")}</h1>
                </div>
                <h1>20 SOL</h1>
            </div>
            <div className="rentfee">
                <h1>{t("rent")}</h1>
                <h2>1.98001</h2>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>20 SOL</h2>
                </div>
                <button className="cryptoconfirmbutton" onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default SettleBills;