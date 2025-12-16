
import "@/style/components/search/domainSettlement/domainSettlement.css"

import Crypto from "./paymentMethod/crypto"
import Back from "@/components/common/functional/back"

export interface DomainSettlementProps{
    // this the entire domain
    domainName: string,
    backToSearchResult: ()=>void,
    domainPrice: number | null,
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, backToSearchResult, domainPrice
}) => {    

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
                {/* <ChoosePayment 
                    chooseMethod={setPaymentMethod} 
                    activingMethod={paymentMethod}
                /> */}
                <Crypto 
                    domainName={domainName}
                    domainPrice={domainPrice!}
                />
            </div>
        </div>
    )
    
}

export default DomainSettlement;


