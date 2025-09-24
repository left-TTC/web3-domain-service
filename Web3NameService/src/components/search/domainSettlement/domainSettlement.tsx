
import "@/style/components/search/domainSettlement/domainSettlement.css"

import ChoosePayment, { PaymentMethod } from "./choosePayment"
import { useEffect, useState } from "react"
import Crypto, { MainMint } from "./paymentMethod/crypto"
import Back from "@/components/common/functional/back"
import { useConnection } from "@solana/wallet-adapter-react"
import { cutDomain } from "@/utils/functional/common/cutDomain"
import { checkRentExemption } from "@/utils/net/otherFunction/checkRentExemption"
import { sendCreateDomainTransaction } from "./functionComponents/transaction/sendDomainCreateTransaction"
import { PublicKey } from "@solana/web3.js"
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { usePrice } from "@/provider/priceProvider/priceProvider"

export interface DomainSettlementProps{
    domainName: string,
    backToSearchResult: ()=>void,
    domainInfo: NameRecordState | null,
    domainPrice: number | null,
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, backToSearchResult, domainInfo, domainPrice
}) => {

    const [cryptoMint, setCryptoMint] = useState<MainMint > (MainMint.SOL)
    const {connection} = useConnection()
    const {price} = usePrice()

    const [rentExemption, setRentExemption] = useState(0)
    useEffect(() => {
        const fetchDomainRent = async() => {
            const domain = cutDomain(domainName)[0]
            setRentExemption(await checkRentExemption(connection, domain))
        }
        fetchDomainRent()
    },[domainName])

    

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
                />
            </div>
        </div>
    )
    
}

export default DomainSettlement;


