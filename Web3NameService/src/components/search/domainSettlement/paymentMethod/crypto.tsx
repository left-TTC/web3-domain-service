


import "@/style/components/search/domainSettlement/paymentMethod/crypto.css"
import { useTranslation } from "react-i18next";


import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useConnection } from "@solana/wallet-adapter-react";
import FintChooser from "@/components/common/transaction/fintChooser";
import SettleBills from "@/components/common/transaction/settleBills";

export enum MainFint{
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
}

export enum OrtherFint{
    FWC = "FWC",
}

export interface CryptoProps{
    openWaitingWallet: () => void,
}

const Crypto: React.FC<CryptoProps> = ({
    openWaitingWallet
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()

    

    const [referrerValue, setReferrerValue] = useState("");
    const [isReferrerFocus, setIsReferrerFocus] = useState(false)

    const [activeFint, setActiveFint] = useState<MainFint>(MainFint.SOL)

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

    const [minRent, setMinRent] = useState(0)

    return(
        <div className="paymentBlock">
            <div className="payfintchoose cryptopayfint">
                <h1>{t("settlementInfo")}</h1>
                <h2>{t("payfint")}</h2>
                <FintChooser activeFint={activeFint} setActiveFint={setActiveFint}/>
                <div className="priceBlock">
                    <h1>{t("domainprice")}</h1>
                    <h2>20 SOL</h2>
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
            
            <SettleBills confirmFunction={openWaitingWallet} />
        </div>
    )
}

export default Crypto;
