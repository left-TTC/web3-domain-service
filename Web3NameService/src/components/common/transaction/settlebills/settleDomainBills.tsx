import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import "@/style/components/commonStyle/transaction/settleBills/settleDomainBills.css"

export interface SettleDomainBillsProps {
    confirmFunction: () => void,
    domainPrice: number,
    domainPriceLamports: number | null,
    rentExemption: number | null,
    depositRatio: number | null,
    totalLamports: number | null,
}

const SettleDomainBills: React.FC<SettleDomainBillsProps> = ({
    confirmFunction, domainPrice, domainPriceLamports, rentExemption, depositRatio, totalLamports
}) => {

    const {t} = useTranslation()

    const [canBeConfirm, setCanBeConfirm] = useState(false)
    useEffect(() => {
        if(totalLamports)setCanBeConfirm(true)
    }, [totalLamports])

    return(
        <div className="totalfees settletotal">
            <h1>{t("bill")}</h1>
            <div>
                <div className="registerfee settlebillsome">
                    <div className="registerrule settlebillsomeword">
                        <h1>{t("final")}:</h1>
                    </div>
                    <h1>
                        $ {(domainPrice/1e6).toFixed(2)}
                        ({domainPriceLamports? `${(domainPriceLamports/1e9).toFixed(4)} SOL`:"Loading"})
                    </h1>
                </div>
                <div className="registerfee settlebillsome">
                    <div className="registerrule settlebillsomeword">
                        <h1>{t("deposit")}({depositRatio? `${depositRatio*100}%`:".."}):</h1>
                    </div>
                    <h1>
                        - {domainPriceLamports? `${(domainPriceLamports/1e10).toFixed(4)} SOL`:"Loading"}
                    </h1>
                </div>
                <div className="registerfee settlebillsome">
                    <div className="registerrule settlebillsomeword">
                        <h1>{t("rent")}</h1>
                    </div>
                    <h1>{rentExemption? `${(rentExemption/1e9).toFixed(4)} SOL`:"Loading"}</h1>
                </div>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{totalLamports? `${(totalLamports/1e9).toFixed(4)} SOL`:"Checking"}</h2>
                </div>
                <button className={`cryptoconfirmbutton ${canBeConfirm? "":"cannotclinck"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default SettleDomainBills;