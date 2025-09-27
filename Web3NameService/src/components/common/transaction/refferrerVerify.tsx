import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/refferrerVerify.css"
import { useConnection } from "@solana/wallet-adapter-react";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { REFFERRER_RECORD_LENGTH, RefferrerRecordState } from "@/utils/functional/common/class/refferrerRecordState";

import loading from "@/assets/loading.svg"
import valid from "@/assets/valid.svg"
import invalid from "@/assets/invalid.svg"

import { ifStringPubkeyValid } from "@/utils/functional/common/ifStringPubkeyValid";
import { returnProjectVault } from "@/utils/constants/constants";
import { checkRefferrerValid } from "@/utils/functional/common/net/checkRefferrerValid";

export interface RefferrerVerifyProps {
    setRefferrerKey: React.Dispatch<React.SetStateAction<PublicKey | null>>,
    setReffererValid: React.Dispatch<React.SetStateAction<boolean>>,
    ifRefferValid: boolean,
}

const RefferrerVerify: React.FC<RefferrerVerifyProps> = ({
    setRefferrerKey, setReffererValid, ifRefferValid
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()
    const {publicKey: buyer} = useWalletEnv()

    const [refferrerValue, setRefferrerValue] = useState("");
    const [isRefferrerFocus, setIsRefferrerFocus] = useState(false)
    const [canReffererCheck, setCanReffererCheck] = useState(false)

    const handRefferrer = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(ifRefferValid && e.target.value != refferrerValue){
            setReffererValid(false)
            setIfRefferrerChecked(false)
        }
        setRefferrerValue(e.target.value)
    }

    useEffect(() => {
        const checkIfAccount = async() => {
            setIfRefferrerChecking(true)
            if(await ifStringPubkeyValid(refferrerValue, connection)){
                setCanReffererCheck(true)
            }else setCanReffererCheck(false)
            setIfRefferrerChecking(false)
        }

        checkIfAccount()
    }, [refferrerValue])

    const [fixedRefferrer, setFixRefferrer] = useState<PublicKey | null>()
    const [loadingFixedRefferrer, setLoadingFixedRefferrer] = useState(true)

    useEffect(() => {
        const getFixedRefferrer = async() => {
            if(!buyer) return

            const refferrerRecordData = await connection.getAccountInfo(
                getRefferrerRecordKey(buyer)
            )
            if(!refferrerRecordData){
                setFixRefferrer(null)
                setLoadingFixedRefferrer(false)
            }else{
                const refferrerRecordState = new RefferrerRecordState(refferrerRecordData)
                console.log("refferrer record: ", refferrerRecordState)
                setFixRefferrer(refferrerRecordState.refferrer)
                setRefferrerKey(refferrerRecordState.refferrer)
                setLoadingFixedRefferrer(false)
            }
        }

        if(buyer) getFixedRefferrer()
    }, [buyer])

    const [ifRefferrerChecked, setIfRefferrerChecked] = useState(false)
    const [ifRefferrerChecking, setIfRefferrerChecking] = useState(false)

    const verifyReffer = async() => {
        setIfRefferrerChecking(true)
        const refferrer = new PublicKey(refferrerValue)

        const ifValid = await checkRefferrerValid(refferrer, connection)
        console.log(ifValid)
        if (!ifValid) {
            setIfRefferrerChecking(false)
            setIfRefferrerChecked(true)
            setReffererValid(false)
        }else {
            setIfRefferrerChecking(false)
            setIfRefferrerChecked(true)
            setReffererValid(true)
            setRefferrerKey(refferrer)
        }
    }

    useEffect(() => {
        if(ifRefferrerChecked && !ifRefferValid){
            setTimeout(() => {
                setIfRefferrerChecked(false)
            }, 2000 )
        }
    }, [ifRefferrerChecked])

    return(
        <div className={`refferrer`} onFocus={() => setIsRefferrerFocus(true)} onBlur={() => setIsRefferrerFocus(false)}>
            {fixedRefferrer? (
                <div className="refferrerinput fixedRefferrershow">
                    <h2>{fixedRefferrer.toBase58()}</h2>
                </div>
            ): (
                <div className="inputbl">
                    <input  
                        type="text"
                        placeholder={loadingFixedRefferrer? "Loading...":t("enterinvitation")}
                        value={refferrerValue}
                        onChange={handRefferrer}
                        className={`refferrerinput ${isRefferrerFocus ? 'refferrerinputfocus' : ''}`}
                    />
                    {isRefferrerFocus && refferrerValue.length === 0 &&
                        <div className="defaultrecommend" onMouseDown={() => setRefferrerValue(returnProjectVault().toBase58())}>
                            <h4>{returnProjectVault().toBase58()}</h4>
                            <div className="defaulticon">
                                <h4>default</h4>
                            </div>
                        </div>
                    }
                </div>
            )}
            <button 
                className=
                    {`refferrerverify 
                        ${canReffererCheck ? 'refferrerverifyfocus' : 'cantclick'} 
                        ${ifRefferrerChecked? (ifRefferValid? "":"checkError"):""}
                    `}
                onClick={() => verifyReffer()}
            >
                {ifRefferrerChecking? (
                    <img src={loading} className="refferrerloading" />
                ):(
                    ifRefferrerChecked ? (
                        ifRefferValid? (
                            <img src={valid} className="refferrervalidimg" />
                        ):(
                            <img src={invalid} className="refferrervalidimg" />
                        )
                    ) : (
                        <h2 className="verifyword">{t("verify")}</h2>
                    )
                )}
            </button>
        </div>
    )
}

export default RefferrerVerify;
