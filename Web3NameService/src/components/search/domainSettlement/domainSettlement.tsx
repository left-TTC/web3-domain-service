
import "@/style/components/search/domainSettlement/domainSettlement.css"

import ChoosePayment, { PaymentMethod } from "./choosePayment"
import { useEffect, useState } from "react"
import Crypto, { MainMint, OtherMint } from "./paymentMethod/crypto"
import Back from "@/components/common/functional/back"
import { getDomainPrice } from "@/utils/functional/domain/getDomainPrice"
import { useConnection } from "@solana/wallet-adapter-react"
import { cutDomain } from "@/utils/functional/common/cutDomain"
import { checkRentExemption } from "@/utils/net/otherFunction/checkRentExemption"
import { sendCreateDomainTransaction } from "./functionComponents/transaction/sendDomainCreateTransaction"
import { PublicKey } from "@solana/web3.js"

export interface DomainSettlementProps{
    domainName: string,
    backToSearchResult: ()=>void,
    domainPriceUsd: number,
}

const DomainSettlement: React.FC<DomainSettlementProps> = ({
    domainName, backToSearchResult, domainPriceUsd
}) => {

    const [cryptoMint, setCryptoMint] = useState<MainMint | OtherMint > (MainMint.SOL)
    const {connection} = useConnection()


    const [domainPriceMap, setDomainPriceMap] = useState<Map<MainMint | OtherMint, number> | null>(null)
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

    const [referrerKey, setReferrerKey] = useState<PublicKey | null>(null)

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.Crypto);
    const [domainOwner, setDomainOwner] = useState<PublicKey | null>(null)
    let payBlock;
    switch(paymentMethod){
        case PaymentMethod.Crypto:
            payBlock = <Crypto 
                            openWaitingWallet={() => setComfirmTransaction(true)}
                            domainPriceMap={domainPriceMap}
                            setUseMint={setCryptoMint}
                            rentExemption={rentExemption}
                            domainOwenr={domainOwner}
                            setDomainOwner={setDomainOwner}
                            referrerKey={referrerKey}
                            setReferrerKey={setReferrerKey}
                        />
            break;
    }

  
    const [confirmTransaction, setComfirmTransaction] = useState(false)
    sendCreateDomainTransaction(
        confirmTransaction, 
        setComfirmTransaction,
        cryptoMint,
        domainPriceMap,
        domainName,
        domainOwner,
    )


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
                {payBlock}
            </div>
        </div>
    )
    
}

export default DomainSettlement;


