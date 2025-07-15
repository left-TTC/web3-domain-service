


import "@/style/components/search/domainSettlement/paymentMethod/crypto.css"
import { useTranslation } from "react-i18next";

import Solana from "@/assets/solana.svg"
import USDC from "@/assets/usdc.svg"
import USDT from "@/assets/usdt.svg"
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useConnection } from "@solana/wallet-adapter-react";

export enum MainFint{
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
}

export interface CryptoProps{

}

const Crypto: React.FC<CryptoProps> = () => {

    const {t} = useTranslation()
    const {connection} = useConnection()

    const returnMainFint = (fintType: MainFint) => {
        switch(fintType){
            case MainFint.SOL:
                return Solana;
            case MainFint.USDC:
                return USDC;
            case MainFint.USDT:
                return USDT;
        }
    }

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
                <div className="fintChooser">
                    {Object.values(MainFint).map(mainFint => (
                        <button 
                            key={mainFint} 
                            className={`fintChoose ${mainFint===activeFint ? 'fintActive':''}`}
                            onClick={() => setActiveFint(mainFint)}
                        >
                            <img src={returnMainFint(mainFint)} className="finticon" />
                            <h1>{mainFint}</h1>
                        </button>
                    ))}
                </div>
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
            <div className="totalfees cryptofee">
                <h1>{t("bill")}</h1>
                <div className="registerfee">
                    <div className="registerrule">
                        <h1>{t("domainprice")}</h1>
                    </div>
                    <h1>20 SOL</h1>
                </div>
                <div className="rentfee">
                    <h1>{t("rent")}</h1>
                    <h2>1.98001</h2>
                </div>
                <div className="cryptodiliver"/>
                <div className="cryptoconfirm">
                    <div className="cryptototal">
                        <h1>{t("total")}</h1>
                        <h2>20 SOL</h2>
                    </div>
                    <button className="cryptoconfirmbutton">
                        <h1>{t("confirm")}</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Crypto;
