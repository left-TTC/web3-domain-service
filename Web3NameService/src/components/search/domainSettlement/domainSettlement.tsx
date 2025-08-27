
import "@/style/components/search/domainSettlement/domainSettlement.css"

import { PublicKey } from "@solana/web3.js"
import ChoosePayment, { PaymentMethod } from "./choosePayment"
import { useEffect, useState } from "react"
import Crypto, { MainFint, OtherFint } from "./paymentMethod/crypto"
import PaymentInterface from "./paymentInterface"
import Back from "@/components/common/functional/back"
import { getDomainPrice } from "@/utils/functional/domain/getDomainPrice"
import { useConnection } from "@solana/wallet-adapter-react"
import { cutDomain } from "@/utils/functional/common/cutDomain"
import { checkRentExemption } from "@/utils/net/otherFunction/checkRentExemption"

export interface DomainSettlementProps{
    domainName: string,
    domainKey: PublicKey | null,
    backToSearchResult: ()=>void,
    domainPriceUsd: number,
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, domainKey, backToSearchResult, domainPriceUsd
}) => {

    const {connection} = useConnection()

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Crypto);
    const [cryptoFint, setCryptoFint] = useState<MainFint | OtherFint | null> (null)

    const [domainPriceMap, setDomainPriceMap] = useState<Map<MainFint | OtherFint, number> | null>(null)

    useEffect(() => {
        const fetchPythPrice = async () => {
            const domainPythMap = await getDomainPrice(domainPriceUsd, connection)
            if(domainPythMap.size > 0){
                setDomainPriceMap(domainPythMap)
            }
        }

        fetchPythPrice()
    }, [domainPriceUsd])

    const [rentExemption, setRentExemption] = useState(0)
    useEffect(() => {
        const fetchDomainRent = async() => {
            const domain = cutDomain(domainName)[0]
            setRentExemption(await checkRentExemption(connection, domain))
        }
        fetchDomainRent()
    },[domainName])

    const [confirmTransaction, setComfirmTransaction] = useState(false)
    useEffect(() => { 
        if(confirmTransaction){
            console.log("confirmed to buy the domain")
        }
    }, [confirmTransaction])

    let payBlock;
    switch(paymentMethod){
        case PaymentMethod.Crypto:
            payBlock = <Crypto 
                            openWaitingWallet={() => setComfirmTransaction(true)}
                            domainPriceMap={domainPriceMap}
                            setUseFint={setCryptoFint}
                            rentExemption={rentExemption}
                        />
            break;
    }

    return(
        <div className="settlement">
            <div className="settlemetcon">
                <div className="domainandpayment">
                    <Back backFun={backToSearchResult} className="querydomainSettlement"/>
                </div>
                <div className="domainName">
                    <h1>{domainName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPaymentMethod} activingMethod={paymentMethod}/>
                {payBlock}
            </div>
        </div>
    )
}

export default DomainSettlement;
