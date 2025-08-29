


import "@/style/components/search/domainSettlement/paymentMethod/crypto.css"
import { useTranslation } from "react-i18next";


import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import MintChooser from "@/components/common/transaction/mintChooser";
import CreateDomainSettleBills from "@/components/common/transaction/createDomainSettleBills";

export enum MainMint{
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
}

export enum OtherMint{
    FWC = "FWC",
}

export interface CryptoProps{
    openWaitingWallet: () => void,
    domainPriceMap: Map<MainMint | OtherMint, number> | null,
    setUseMint: React.Dispatch<React.SetStateAction<MainMint | OtherMint>>,
    rentExemption: number
}

const Crypto: React.FC<CryptoProps> = ({
    openWaitingWallet, domainPriceMap, setUseMint, rentExemption
}) => {

    useEffect(() => {
        console.log(domainPriceMap)
    }, [domainPriceMap])

    const {t} = useTranslation()

    const [referrerValue, setReferrerValue] = useState("");
    const [isReferrerFocus, setIsReferrerFocus] = useState(false)

    const [activeMint, setActiveMint] = useState<MainMint | OtherMint>(MainMint.SOL)
    const setWillUseMint = (mint: MainMint | OtherMint) => {
        setActiveMint(mint)
        setUseMint(mint)
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
        switch(activeMint){
            case MainMint.SOL:
                setDomainPriceShow(domainPriceMap.get(activeMint)?.toFixed(4) + " SOL")
                break
            case MainMint.USDC:
                setDomainPriceShow(domainPriceMap.get(activeMint) + " USDC")
                break
            case MainMint.USDT:
                setDomainPriceShow(domainPriceMap.get(activeMint) + " USDT")
                break
        }
    }, [activeMint, domainPriceMap])
        

    return(
        <div className="paymentBlock">
            <div className="paymintchoose cryptopaymint">
                <h1>{t("settlementInfo")}</h1>
                <h2>{t("paymint")}</h2>
                <MintChooser activeMint={activeMint} setActiveMint={setWillUseMint}/>
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
