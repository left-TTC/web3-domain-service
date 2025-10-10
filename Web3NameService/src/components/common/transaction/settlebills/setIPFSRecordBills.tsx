import { useTranslation } from "react-i18next"

import "@/style/components/commonStyle/transaction/settleBills/settleDomainBills.css"
import "@/style/components/commonStyle/transaction/settleBills/setIPFSBills.css"

import loading from "@/assets/loading.svg"
import { useEffect, useState } from "react"

export interface SetIPFSRecordBillsProps {
    confirmFunction: () => void,
    canBeConfirm: boolean,
    rentExemption: number | null,
    reallocFee: number | null,
    usdPrice: number | null,
    ifDeleteTheRecord: boolean,
}

const SetIPFSRecordBills: React.FC<SetIPFSRecordBillsProps> = ({
    confirmFunction, canBeConfirm, rentExemption, reallocFee, usdPrice, ifDeleteTheRecord
}) => {

    const {t} = useTranslation()

    const [totalFee, setTotalFee] = useState("")
    useEffect(() => {
        if(!rentExemption || !reallocFee)setTotalFee(t("negligible"))
        if(rentExemption)return setTotalFee(`${(rentExemption/1e9).toFixed(4)} SOL`)
        if(reallocFee)return setTotalFee(`${(reallocFee!/1e9).toFixed(4)} SOL`)
    }, [reallocFee, rentExemption])

    return(
        <div className="totalfees settletotal">
            <h1>{t("bill")}</h1>
            {usdPrice? (
                <div>
                    <div className={`registerfee ${rentExemption? "":"undisplay"}`}>
                        <div className="registerrule settlebillsomeword">
                            <h1>{t("rent")}:</h1>
                        </div>
                        <h1>{(rentExemption!/1e9).toFixed(4)} SOL</h1>
                    </div>
                    <div className={`registerfee ${reallocFee? "":"undisplay"}`}>
                        <div className="registerrule settlebillsomeword">
                            <h1>{t("reallocfee")}:</h1>
                        </div>
                        <h1>{(reallocFee!/1e9).toFixed(4)} SOL</h1>
                    </div>
                </div>
            ):(
                <div className="ipfsfeeloding">
                    <img src={loading} className="ipfsloadingimg" />
                </div>
            )}
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h1>{totalFee}</h1>
                </div>
                <button className={`setcustompricecryptoconfirmbutton ${(canBeConfirm || ifDeleteTheRecord)? "":"cannotsetthecustom"}`} onClick={confirmFunction}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default SetIPFSRecordBills;