
import "@/style/components/search/domainSettlement/domainSettlement.css"


import back from "@/assets/backwhite.svg"
import { useTranslation } from "react-i18next"
import { PublicKey } from "@solana/web3.js"
import ChoosePayment, { PaymentMethod } from "./choosePayment"
import { useState } from "react"
import Crypto from "./paymentMethod/crypto"

export interface DomainSettlementProps{
    domainName: String,
    domainKey: PublicKey | null,
    backToSearchResult: ()=>void,
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, domainKey, backToSearchResult
}) => {

    const {t} = useTranslation()
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Crypto);

    let payBlock;
    switch(paymentMethod){
        case PaymentMethod.Crypto:
            payBlock = <Crypto />
            break;
        case PaymentMethod.a:
            break;
    }

    return(
        <div className="settlement">
            <div className="domainandpayment">
                <button className="settlementback" onClick={backToSearchResult}>
                    <img src={back} className="settlebackicon" />
                    <h1>{t("back")}</h1>
                </button>
            </div>
            <div className="domainName">
                <h1>{domainName}</h1>
            </div>
            <ChoosePayment chooseMethod={setPaymentMethod} activingMethod={paymentMethod}/>
            {payBlock}
        </div>
    )
}

export default DomainSettlement;
