
import "@/style/components/search/domainSettlement/domainSettlement.css"

import ChoosePayment, { PaymentMethod } from "./choosePayment"
import { useState } from "react"
import Crypto from "./paymentMethod/crypto"
import Back from "@/components/common/functional/back"
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"

export interface DomainSettlementProps{
    // this the entire domain
    domainName: string,
    backToSearchResult: ()=>void,
    domainPrice: number | null,
    domainInfo: NameRecordState | null,
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, backToSearchResult, domainPrice, domainInfo
}) => {    

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Crypto);

    return(
        <div className="settlement">
            <div className="settlemetcon">
                <div className="domainandpayment">
                    <Back 
                        backFun={backToSearchResult} 
                        className="querydomainSettlement"
                    />
                </div>
                <div className="domainName">
                    <h1>{domainName}</h1>
                </div>
                <ChoosePayment 
                    chooseMethod={setPaymentMethod} 
                    activingMethod={paymentMethod}
                />
                <Crypto 
                    domainName={domainName}
                    domainPrice={domainPrice!}
                    domainInfo={domainInfo}
                />
            </div>
        </div>
    )
    
}

export default DomainSettlement;


