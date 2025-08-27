


import "@/style/components/search/domainSettlement/paymentMethod/crypto.css"
import { useTranslation } from "react-i18next";


import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import FintChooser from "@/components/common/transaction/fintChooser";
import CreateDomainSettleBills from "@/components/common/transaction/createDomainSettleBills";

export enum MainFint{
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
}

export enum OtherFint{
    FWC = "FWC",
}

export interface CryptoProps{
    openWaitingWallet: () => void,
    domainPriceMap: Map<MainFint | OtherFint, number> | null,
    setUseFint: React.Dispatch<React.SetStateAction<MainFint | OtherFint | null>>,
    rentExemption: number
}

const Crypto: React.FC<CryptoProps> = ({
    openWaitingWallet, domainPriceMap, setUseFint, rentExemption
}) => {

    useEffect(() => {
        console.log(domainPriceMap)
    }, [domainPriceMap])

    const {t} = useTranslation()

    const [referrerValue, setReferrerValue] = useState("");
    const [isReferrerFocus, setIsReferrerFocus] = useState(false)

    const [activeFint, setActiveFint] = useState<MainFint | OtherFint>(MainFint.SOL)
    const setWillUseFint = (fint: MainFint | OtherFint) => {
        setActiveFint(fint)
        setUseFint(fint)
    }

    const handReferrer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferrerValue(e.target.value)
    }

    const refereerRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(isReferrerFocus){
            const refereerBlock = refereerRef.current
            if(refereerBlock){
                animate(refereerBlock, {
                    filter: 'blur(0)',
                    opacity: [0.4, 1],
                    duration: 500
                })
            }
        }else{
            const refereerBlock = refereerRef.current
            if(referrerValue) return;
            if(refereerBlock){
                animate(refereerBlock, {
                    filter: 'blur(0.4px)',
                    opacity: [1, 0.4],
                    duration: 500
                })
            }
        }
    }, [isReferrerFocus])

    const [domainPriceShow, setDomainPriceShow] = useState("")

    useEffect(() => {
        if(!domainPriceMap)return setDomainPriceShow(t("loading"))
        switch(activeFint){
            case MainFint.SOL:
                setDomainPriceShow(domainPriceMap.get(activeFint)?.toFixed(4) + " SOL")
                break
            case MainFint.USDC:
                setDomainPriceShow(domainPriceMap.get(activeFint) + " USDC")
                break
            case MainFint.USDT:
                setDomainPriceShow(domainPriceMap.get(activeFint) + " USDT")
                break
        }
    }, [activeFint, domainPriceMap])
        

    return(
        <div className="paymentBlock">
            <div className="payfintchoose cryptopayfint">
                <h1>{t("settlementInfo")}</h1>
                <h2>{t("payfint")}</h2>
                <FintChooser activeFint={activeFint} setActiveFint={setWillUseFint}/>
                <div className="priceBlock">
                    <h1>{t("domainprice")}</h1>
                    <h2>{domainPriceShow}</h2>
                </div>
                
                <div className="cryptodiliver"/>
                
                <h3>{t("optionaldisc")}</h3>
                <div className={`referrer`} ref={refereerRef} onFocus={() => setIsReferrerFocus(true)} onBlur={() => setIsReferrerFocus(false)}>
                    <input  
                        type="text"
                        placeholder={t("enterinvitation")}
                        value={referrerValue}
                        onChange={handReferrer}
                        className={`referrerinput ${isReferrerFocus ? 'referrerinputfocus' : ''}`}
                    />
                    <button className={`referrerverify ${isReferrerFocus ? 'referrerverifyfocus' : ''}`}>
                        <h1>{t("verify")}</h1>
                    </button>
                </div>
            </div>
            
            <CreateDomainSettleBills 
                confirmFunction={openWaitingWallet} 
                domainPrice={domainPriceShow}
                rentExemption={rentExemption}
            />
        </div>
    )
}

export default Crypto;
