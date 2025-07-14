
import "@/style/components/search/domainSettlement/domainSettlement.css"


import back from "@/assets/backwhite.svg"
import { useTranslation } from "react-i18next"
import type { ReverseKeyState } from "@/utils/functional/common/reverseKeyState"
import { PublicKey } from "@solana/web3.js"
import ChoosePayment, { PaymentMethod } from "./choosePayment"
import { useState } from "react"

export interface DomainSettlementProps{
    domainName: String,
    domainKey: PublicKey | null,
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, domainKey
}) => {

    const {t} = useTranslation()
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Crypto);

    return(
        <div className="settlement">
            <div className="domainandpayment">
                <button className="settlementback">
                    <img src={back} className="settlebackicon" />
                    <h1>{t("back")}</h1>
                </button>
            </div>
            <div className="domainName">
                <h1>{domainName}</h1>
            </div>
            <ChoosePayment chooseMethod={setPaymentMethod} activingMethod={paymentMethod}/>
        </div>
    )
}

export default DomainSettlement;
