
import "@/style/components/commonStyle/transaction/ipfsVerify.css"
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { checkCidFormat } from "@/utils/functional/common/ipfs/checkCidFormat";
import { getRecordKey, RecordType } from "@/utils/functional/solana/getRecordKey";
import { useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export interface IPFSVerify{
    domainName: string,
    cid: string,
    setCid: React.Dispatch<React.SetStateAction<string>>,
    setCidValid: React.Dispatch<React.SetStateAction<boolean>>,
    ifNeedCreateAccount: boolean,
    setRent: React.Dispatch<React.SetStateAction<number | null>>,
    setRealloc: React.Dispatch<React.SetStateAction<number | null>>,
    domainRecordState: IPFSRecordState | undefined,
}

const IPFSVerify: React.FC<IPFSVerify> = ({
    cid, setCid, setCidValid, ifNeedCreateAccount, setRent, setRealloc, domainRecordState
}) =>{
 
    const {t} = useTranslation()
    const {connection} = useConnection()

    const [formatValid, setFormatValid] = useState(false)

    // test: k51qzi5uqu5dgr5f93y812ungff8y9evtkntr9gi2ctc0ze8o3ncs6vj2szer2
    const [inputFocus, setInputFocus] = useState(false)
    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCid(e.target.value)
        if(checkCidFormat(cid)){
            console.log("ok")
            setFormatValid(true)
        }
    }

    const verify = async() => {
        if(ifNeedCreateAccount){
            const rent = await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH + cid.length);
            setRent(rent)
            setCidValid(true)
        }else{
            if(!domainRecordState){
                console.log("accouunt err")
            }else{
                if((domainRecordState.length - NAME_RECORD_LENGTH) >= cid.length) return
                const recordKey = getRecordKey(
                    domainRecordState.parentName, RecordType.IPFS
                )
                const nowLamports = (await connection.getAccountInfo(recordKey))?.lamports
                if(nowLamports){
                    const need = await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH + cid.length)
                    if(need > nowLamports){
                        setRealloc(need - nowLamports)
                        setCidValid(true)
                    }
                }
            }
        }
    }

    return(
        <div className="ipfsverify">
            <div className="inputCidbl">
                <div className={`inputcidcontent ${inputFocus? "greenborder":""}`}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                >
                    <input
                        type="text"
                        placeholder={t("inputcid")}
                        value={cid}
                        onChange={handDomainInput}
                        className={`cidinput`}
                    />
                </div>
                <button 
                    className={`verifycidbu ${formatValid? "formatvalidbu":"unvalidbu"}`}
                    onClick={() => verify()}    
                >
                    <h3>{t("verify")}</h3>
                </button>
            </div>
        </div>
    )
}

export default IPFSVerify;
