import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills.css"

export interface CreateDomainSettleBillsProps {
    confirmFunction: () => void;
    rentExemption: number;
    domainPrice: string
}


const CreateDomainSettleBills: React.FC<CreateDomainSettleBillsProps> = ({
    confirmFunction, rentExemption, domainPrice
}) => {

    const {t} = useTranslation()

    const calculateTotal = () => {
        if(rentExemption === 0 || domainPrice === "Loading"){
            return "Loading"
        }
        if(domainPrice.includes("SOL")){
            const match = domainPrice.match(/[\d.]+/);
            if(match){
                const totalfees = parseFloat(match[0]) + rentExemption
                return totalfees + " SOL"
            }else{
                return "Error"
            }
        }
    }

    return(
        <div className="totalfees">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("domainprice")}</h1>
                </div>
                <h1>{domainPrice}</h1>
            </div>
            <div className="rentfee">
                <h1>{t("rent")}</h1>
                <h2>{rentExemption} SOL</h2>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{calculateTotal()}</h2>
                </div>
                <button className="cryptoconfirmbutton" onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default CreateDomainSettleBills;