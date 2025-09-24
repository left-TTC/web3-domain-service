import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills/settleBills.css"
import "@/style/components/commonStyle/transaction/settleBills/createDomainSettleBills.css"

export interface CreateDomainSettleBillsProps {
    confirmFunction: () => void;
    rentExemption: number;
    ifRefferverValid: boolean,
}


const CreateDomainSettleBills: React.FC<CreateDomainSettleBillsProps> = ({
    confirmFunction, rentExemption, ifRefferverValid
}) => {

    const {t} = useTranslation()


    return(
        <div className="totalfees">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("domainprice")}</h1>
                </div>
                <h1>{1}</h1>
            </div>
            <div className="rentfee">
                <h1>{t("rent")}</h1>
                <h2>{rentExemption} SOL</h2>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{1}</h2>
                </div>
                <button className={`cryptoconfirmbutton ${ifRefferverValid? "":"invalidrefferrer"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default CreateDomainSettleBills;