import { useTranslation } from "react-i18next";
import "@/style/components/auction/rootDomainCreate/launch/launchFeeCrypto/tool/rootNameVerify.css"
import { useRef, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { isUnusedTld } from "@/utils/functional/domain/ifUnusedTld";

import ok from "@/assets/ok.svg"
import load from "@/assets/loadingFFF.svg"
 
interface RootNameVerifyProps {
    setRootName: React.Dispatch<React.SetStateAction<string>>,
    setNamaValid: React.Dispatch<React.SetStateAction<boolean>>,
    nameValid: boolean
}

const RootNameVerify: React.FC<RootNameVerifyProps> = ({
    setRootName, setNamaValid, nameValid
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()

    const [keyInValue, setKeyInValue] = useState("")

    const [inputvalue, setInputValue] = useState("")
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lower = e.target.value.toLowerCase();
        if(lower != inputvalue)setNamaValid(false)
        setInputValue(lower);
        if(lower.length !=0){
            rootCanCheck.current = true
        }else rootCanCheck.current = false
    };

    const [showOther, setShowOther] = useState(false)
    const [rootNameVerifying, setRootNameVerifying] = useState(false)
    const rootCanCheck = useRef(false)

    const [errorReason, setErrorReason] = useState(0)

    const verifyRootName = async() => {
        setKeyInValue(inputvalue)
        setRootNameVerifying(true)
        switch(await isUnusedTld(inputvalue, connection)){
            case 0:
                setNamaValid(true)
                setRootName(keyInValue)
                break;
            case 1:
                setNamaValid(false)
                setShowOther(true)
                setTimeout(() => {
                    setShowOther(false)
                }, 2000)
                setErrorReason(0)
                break;
            case 2:
                setNamaValid(false)
                setShowOther(true)
                setTimeout(() => {
                    setShowOther(false)
                }, 2000)
                setErrorReason(1)
                break;
        }
        setRootNameVerifying(false)
    }

    return(
        <div className="rootnameInputbl">
            <h3>{t("rootName")}:</h3>
            <div className="rootnameinputbl">
                <div className="rootnameinputcontent">
                    <input
                        type="text"
                        placeholder={t("inputroot")}
                        value={inputvalue}
                        onChange={handleInput}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                verifyRootName();
                            }
                        }}
                        className={`rootnamecomtaincontentinput`}
                    />
                </div>
                <button 
                    className={`RootnameVerifybu ${rootCanCheck.current? "rootNameValid":"rootNameInvalid"} ${showOther&&"red"}`}
                    onClick={() => verifyRootName()}    
                >
                    {rootNameVerifying? (
                        <img src={load} className="rootnameverifyimg" />
                    ):(
                        nameValid? (
                            <img src={ok} className="rootnameokimg" />
                        ):(
                            <h3>{t("verify")}</h3>
                        )
                    )}
                    {showOther&&
                        <div className="rootnameerrorshow">
                            {errorReason===0?(
                                <h3>{t("nousecommon")}</h3>
                            ):(
                                <h3>{t("created")}</h3>
                            )}
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}

export default RootNameVerify;

