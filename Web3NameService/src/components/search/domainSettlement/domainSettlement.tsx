
import "@/style/components/search/domainSettlement/domainSettlement.css"


import back from "@/assets/backwhite.svg"
import { useTranslation } from "react-i18next"
import { PublicKey } from "@solana/web3.js"
import ChoosePayment, { PaymentMethod } from "./choosePayment"
import { useEffect, useState } from "react"
import Crypto, { MainFint, OrtherFint } from "./paymentMethod/crypto"
import PaymentInterface from "./paymentInterface"
import Back from "@/components/common/functional/back"

export interface DomainSettlementProps{
    domainName: string,
    domainKey: PublicKey | null,
    backToSearchResult: ()=>void
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, domainKey, backToSearchResult
}) => {

    const {t} = useTranslation()
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Crypto);
    const [showPayPage, setShowPayPage] = useState(false)

    const [cryptoFint, setCryptoFint] = useState<MainFint | OrtherFint | null> (null)
    const [domainPrice, setDomainPrice] = useState<number | null>(10)

    let payBlock;
    switch(paymentMethod){
        case PaymentMethod.Crypto:
            payBlock = <Crypto openWaitingWallet={() => setShowPayPage(true)}/>
            break;
        case PaymentMethod.a:
            break;
    }

    return(
        <div className="settlement">
            <div className="domainandpayment">
                <Back backFun={backToSearchResult} />
            </div>
            <div className="domainName">
                <h1>{domainName}</h1>
            </div>
            <ChoosePayment chooseMethod={setPaymentMethod} activingMethod={paymentMethod}/>
            {payBlock}
            {showPayPage && 
                <PaymentInterface 
                    useFint={cryptoFint} 
                    thisDomainPrice={domainPrice} 
                    cancleTransaction={()=>setShowPayPage(false)}
                    creatingDomainName={domainName}
                    creatingDomainKey={domainKey}
                />
            }
        </div>
    )
}

export default DomainSettlement;
