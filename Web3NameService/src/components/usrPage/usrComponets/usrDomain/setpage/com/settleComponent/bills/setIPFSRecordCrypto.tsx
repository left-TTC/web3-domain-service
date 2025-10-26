import MintChooser from "@/components/common/transaction/mintChooser"
import { SupportedMint, usePrice } from "@/provider/priceProvider/priceProvider"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/settleComponent/bills/setIPFSRecordCrypto.css"

import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState"
import { getTimeDay } from "@/utils/functional/common/time/getTimeDay"
import IPFSVerify from "@/components/common/transaction/ipfsVerify"
import SetIPFSRecordBills from "@/components/common/transaction/settlebills/setIPFSRecordBills"
import { useConnection } from "@solana/wallet-adapter-react"
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState"
import { toTokenPerUsd } from "@/utils/functional/common/number/toTokenPerUsd"
import IPFSOperationChooser from "./tool/IPFSOperationChooser"
import { IPFSOperation } from "@/utils/net/mainFunction/usrOperation/setDomainIPFSRecord"
import { setIPFS } from "../function/setIPFS"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider"
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider"


export interface SetIPFSRecordCryptoProps{
    domainRecordState: IPFSRecordState | undefined,
    ifLoading: boolean,
    domainName: string,
    
}

const SetIPFSRecordCrypto: React.FC<SetIPFSRecordCryptoProps> = ({
    domainRecordState, ifLoading, domainName
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()
    const {price, expo} = usePrice()
    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {rootDomains} = useRootDomain()
    const solanaToast = useSolanaToast()

    const [usdPrice, setUsdPrice] = useState<number | null>(null)
    useEffect(() => {
        if(price && expo){
            setUsdPrice(toTokenPerUsd(price, expo, SupportedMint.SOL))
        }
    }, [price, expo])

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    const [cidInput, setCidInput] = useState("")
    const [cidValid, setCidValid] = useState(false)

    const [ifNeedCreateAccount, setIfNeedCreateAccount] = useState(false)
    const [rentExemption, setRentExemption] = useState<number | null>(null)
    const [reallocFee, setReallocFee] = useState<number | null>(null)
    const calculated = useRef(false)
    useEffect(() => {
        const fetch = async() => {
            // load over
            if(domainRecordState)return
            calculated.current = true
            setIfNeedCreateAccount(true)
            const recordBase = await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH)
            if(rentExemption){
                setRentExemption(rentExemption + recordBase)
            }else setRentExemption(recordBase)
        }

        if(!ifLoading && !calculated.current){
            fetch()
        }
    }, [ifLoading])

    const [ifDeleteRecord, setIfDeleteRecord] = useState(false)

    const [totalLamports, setTotalLamports] = useState(0)
    useEffect(() => {
        if(reallocFee && !rentExemption){
            setTotalLamports(reallocFee)
        }else if(rentExemption && !reallocFee){
            setTotalLamports(rentExemption)
        }
    }, [rentExemption, reallocFee])

    const confirmToRecordIPFS = async() => {
        let operation: IPFSOperation;
        if(ifDeleteRecord){
            operation = IPFSOperation.Delete
        }else{
            if(domainRecordState){
                operation = IPFSOperation.Reset
            }else{
                operation = IPFSOperation.Init
            }
        }

        let inputCId: string | null = null
        if(cidInput != "")inputCId = cidInput

        await setIPFS(
            inputCId, operation, totalLamports, domainName,
            usr, rootDomains, solanaToast, connection, signTransaction
        )
    }

    const [ifLessThan1024, setIfLessThan1024] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIfLessThan1024(window.innerWidth < 1024);
        };
        
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return(
        <div className="setIPFSCrypto">
            <div className="ipfsinfoabout">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="steIPFSine"/>
                <div className="updateTimeShow">
                    <h3>{t("lastup")}:</h3>
                    {ifLoading? (
                        <div className="updatetimeLaod">
                            <div className="loadingtime"/>
                        </div>
                    ):(
                        domainRecordState? (
                            <h4>{getTimeDay(domainRecordState.updateTime.toNumber())}</h4>
                        ):(
                            <h4>{t("Uninitialized")}</h4>
                        )
                    )}
                </div>
                <div className="ipfsetordeleteblock">
                    <div className="nameandchooseoperation">
                        <h3>{t("urlset")}:</h3>
                        <IPFSOperationChooser
                            domainRecordState={domainRecordState}
                            ifChooseDelete={ifDeleteRecord}
                            setIfChooseDelete={setIfDeleteRecord}
                        />
                    </div>
                    {ifDeleteRecord? (
                        <div className="showThewillDelete">
                            <div className="showthewilldeleteword">
                                <h3>{t("lastRecord")}:</h3>
                                {ifLessThan1024? (
                                    <button className="checkrecord">
                                        <h3>{t("check")}</h3>
                                    </button>
                                ):(
                                    <h4>{domainRecordState!.recordData}</h4>
                                )}
                            </div>
                            <div className="showThewillDeleteLine" />
                        </div>
                    ):(
                        <IPFSVerify
                            domainName={domainName}
                            cid={cidInput}
                            setCid={setCidInput}
                            setCidValid={setCidValid}
                            ifNeedCreateAccount={ifNeedCreateAccount}
                            setRent={setRentExemption}
                            setRealloc={setReallocFee}
                            domainRecordState={domainRecordState}
                        />
                    )}
                </div>
                <div className="downloadipfstool">
                    <h3>{t("troubleIPFS")}</h3>
                    <h4>Download our
                        <a href="#"> IPFS plugins</a>
                    </h4>
                </div>
            </div>
            <SetIPFSRecordBills
                canBeConfirm={cidValid}
                confirmFunction={() => {confirmToRecordIPFS()}}
                rentExemption={rentExemption}
                reallocFee={reallocFee}
                usdPrice={usdPrice}
                ifDeleteTheRecord={ifDeleteRecord}
            />
        </div>
    )
}

export default SetIPFSRecordCrypto;
