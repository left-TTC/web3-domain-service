

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/domainUrlSet.css"
import { useTranslation } from "react-i18next"

import loading from "@/assets/loading.svg"
import ipfs from "@/assets/ipfsdisable.svg"
import ipfsok from "@/assets/ipfsable.svg"
import ipfshead from "@/assets/ipfs.svg"
import copy from "@/assets/copyblue.svg"
import { cutString } from "@/utils/functional/common/cutString"
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState"
import { useEffect, useRef, useState } from "react"
import IpfsSet from "./settleComponent/ipfsSet"

export interface DomainUrlSetProps {
    domainName: string,
    ifLoading: boolean,
    domainRecordState: IPFSRecordState | undefined,
    ifLessThan640: boolean,
}

const DomainUrlSet: React.FC<DomainUrlSetProps> = ({
    ifLoading, domainRecordState, domainName, ifLessThan640
}) => {

    const {t} = useTranslation()

    const [ifOpenUrlSet, setIfOpenUrlSet] = useState(false)

    const contentRef = useRef<HTMLDivElement | null>(null)
    const copyRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if(ifLessThan640){
            const handleClick = (e: MouseEvent) => {
            const contentEl = contentRef.current;
            const copyEl = copyRef.current;
            const target = e.target as Node;

            if (contentEl && contentEl.contains(target)) {
                if (!copyEl || !copyEl.contains(target)) {
                    setIfOpenUrlSet(true);
                }
            }
            };

            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        }
    }, [ifLessThan640])

    return(
        <div className={`domainurlset ${ifLessThan640&&"cusorclinck"}`} ref={contentRef}>
            <div className="deployhead">
                <h1>{t("deploy")}</h1>
                {ifLoading? (
                    <img src={loading} className="deployloading" />
                ):(
                    domainRecordState?.recordData? (
                        <img src={ipfsok} className="deployipfs true" />
                    ):(
                        <img src={ipfs} className="deployipfs" />
                    )
                )}
            </div>
            <div className="ipsfset">
                <div className="headandcid">
                    <div className="ipfshead">
                        <img src={ipfshead} className="deployipfs" />
                    </div>
                    <div className="ipfscontent">
                        <h1>CID:</h1>
                        {domainRecordState?.recordData? (
                            <div className="cidshow">
                                <h1>{cutString(domainRecordState.recordData, 5, 5, "...")}</h1>
                                <img className="coppipfs" src={copy} ref={copyRef}/>
                            </div>
                        ):(
                            <div className="cidshow">
                                <h1>NULL</h1>
                            </div>
                        )} 
                    </div>
                </div>
                <button className="setButton" onClick={() => setIfOpenUrlSet(true)}>
                    <h1>{t("set")}</h1>
                </button>
            </div>

            {ifOpenUrlSet && 
                <IpfsSet 
                    setName={domainName}
                    back={() => setIfOpenUrlSet(false)}
                    domainRecordState={domainRecordState}
                    ifLoadingRecord={ifLoading}
                />
            }
        </div>
    )
}

export default DomainUrlSet