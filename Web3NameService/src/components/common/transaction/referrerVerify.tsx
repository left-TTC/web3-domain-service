import type { PublicKey } from "@solana/web3.js";
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/referrerVerify.css"

export interface ReferrerVerifyProps {
    setReferrerKey: React.Dispatch<React.SetStateAction<PublicKey | null>>,
}

const ReferrerVerify: React.FC<ReferrerVerifyProps> = ({
    setReferrerKey
}) => {

    const {t} = useTranslation()

    const [referrerValue, setReferrerValue] = useState("");
    const [isReferrerFocus, setIsReferrerFocus] = useState(false)

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

    const handReferrer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferrerValue(e.target.value)
    }


    return(
        <div className={`referrer`} ref={refereerRef} onFocus={() => setIsReferrerFocus(true)} onBlur={() => setIsReferrerFocus(false)}>
            <input  
                type="text"
                placeholder={t("enterinvitation")}
                value={referrerValue}
                onChange={handReferrer}
                className={`referrerinput ${isReferrerFocus ? 'referrerinputfocus' : ''}`}
            />
            <button className={`referrerverify ${isReferrerFocus ? 'referrerverifyfocus' : ''}`}>
                <h2 className="verifyword">{t("verify")}</h2>
            </button>
        </div>
    )
}

export default ReferrerVerify;
