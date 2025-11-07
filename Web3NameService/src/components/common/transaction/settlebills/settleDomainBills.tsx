import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import "@/style/components/commonStyle/transaction/settleBills/settleDomainBills.css"

export interface SettleDomainBillsProps {
    confirmFunction: () => void,
    domainPriceLamports: number,
    usdToSOL: number,
    rentExemption: number | null,
}

const SettleDomainBills: React.FC<SettleDomainBillsProps> = ({
    confirmFunction, domainPriceLamports, usdToSOL, rentExemption
}) => {

    const {t} = useTranslation()

    const [canBeConfirm, setCanBeConfirm] = useState(false)
    useEffect(() => {
        if(rentExemption)setCanBeConfirm(true)
    }, [rentExemption])

    return(
        <div className="settleDoamintotal">
            <h1>{t("bill")}</h1>
            <div>
                <div className="registerfee settlebillsome">
                    <div className="registerrule settlebillsomeword">
                        <h3>{t("final")}:</h3>
                    </div>
                    <h1 className="line-through">
                        {(domainPriceLamports/1e9).toFixed(4)} SOL
                        ($ {usdToSOL!=0? `${(domainPriceLamports/1e9/usdToSOL).toFixed(2)}`:"Loading"})
                    </h1>
                </div>
                <div className="registerfee settlebillsome">
                    <div className="registerrule settlebillsomeword">
                        <h3>{t("rent")}</h3>
                    </div>
                    <h1>{rentExemption? `${(rentExemption/1e9).toFixed(4)} SOL`:"Loading"}</h1>
                </div>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{rentExemption? `${(rentExemption/1e9).toFixed(4)} SOL`:"Checking"}</h2>
                </div>
                <button className={`cryptoconfirmbutton ${canBeConfirm? "":"cannotclinck"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default SettleDomainBills;