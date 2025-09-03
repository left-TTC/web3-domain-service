import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import type { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

import "@/style/components/commonStyle/transaction/ownerWriter.css"
import { useTranslation } from "react-i18next";

export interface OwnerWriterProps {
    // domainOwner: PublicKey,
    setDomainOwner: React.Dispatch<React.SetStateAction<PublicKey | null>>,
}

const OwnerWriter: React.FC<OwnerWriterProps> = ({
    setDomainOwner
}) => {

    const {publicKey: usr} = useWalletEnv() 
    const {t} = useTranslation()

    const [inputOwner, setInputOwner] = useState("")
    const [ifLengthEnough, setIfLengthEnough] = useState(false)
    const [ifInputFocus, setIfInputFocus] = useState(false)

    const handInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputOwner(e.target.value)
        if(e.target.value.length === 32){
            setIfLengthEnough(true)
        }else{
            setIfLengthEnough(false)
        }
    }

    const [ifShowWalletKeyToast, setIfShowWalletKeyToast] = useState(false)
    useEffect(() => {
        if(ifInputFocus && inputOwner === ""){
            setIfShowWalletKeyToast(true)
        }
    }, [ifInputFocus])

    return (
        <div className="ownerwriter">
            <div className="ownerwritertitle">
                <h1>{t("buyfor")}:</h1>
            </div>
            <div className="ownerinputer">
                <input  
                    type="text"
                    placeholder={t("enterdomainowner")}
                    value={inputOwner}
                    onChange={handInput}
                    className={`ownerinput ${ifInputFocus? "ownerinputfocus":""}`}
                    onFocus={() => setIfInputFocus(true)}
                    onBlur={() => setIfInputFocus(false)}
                />
                <button className={`${ifLengthEnough? "canbecheck":""} ownerinputcheck`}>
                    <h2>{t("check")}</h2>
                </button>

                {ifShowWalletKeyToast &&
                    <button className="choosewalletkey">

                    </button>
                }
            </div>
        </div>
    )
}

export default OwnerWriter;
