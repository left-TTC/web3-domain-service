

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/domainUrlSet.css"
import { useTranslation } from "react-i18next"

import loading from "@/assets/loading.svg"
import ipfs from "@/assets/ipfsdisable.svg"
import ipfsok from "@/assets/ipfsable.svg"
import ipfshead from "@/assets/ipfs.svg"
import copy from "@/assets/copyblue.svg"
import { cutString } from "@/utils/functional/common/cutString"
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState"

export interface DomainUrlSetProps {
    ifLoading: boolean,
    domainRecordState: IPFSRecordState | undefined,
}

const DomainUrlSet: React.FC<DomainUrlSetProps> = ({
    ifLoading, domainRecordState
}) => {

    const {t} = useTranslation()

    const testCid = "bafybeigdyrztw3n3r7v6c5rpp5aw5yml7ksfhtg6kcfmfqgkt2l4r2l5ty"

    return(
        <div className="domainurlset">
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
                                <h1>{cutString(testCid, 5, 5, "...")}</h1>
                                <img className="coppipfs" src={copy} />
                            </div>
                        ):(
                            <div className="cidshow">
                                <h1>NULL</h1>
                            </div>
                        )} 
                    </div>
                </div>
                <button className="setButton">
                    <h1>Set</h1>
                </button>
            </div>
        </div>
    )
}

export default DomainUrlSet