

import Back from "@/components/common/functional/back";
import "@/style/components/usrPage/usrComponents/usrDomain/setpage/domainSet.css"
import DomainSetHead from "./com/domainSetHead";
import DomainPriceSet from "./com/ domainPriceSet";
import DomainUrlSet from "./com/domainUrlSet";
import DomainAuctionStateShow from "./com/domainAuctionStateShow";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { useEffect } from "react";

export interface DomainSetProps {
    domainName: string,
    backToDomainPage: () => void,
    domainState: NameRecordState | null | undefined,
    ifIpfsLoading: boolean,
    domainRecordState: IPFSRecordState | undefined,
}

const DomainSet: React.FC<DomainSetProps> = ({
    domainName, backToDomainPage, domainState, ifIpfsLoading, domainRecordState
}) => {

    useEffect(() => {
        if(domainRecordState){
            console.log(
                "updatetime:", domainRecordState.updateTime,
                "length: ", domainRecordState.length,
                "data: ", domainRecordState.recordData
            )
        }
    }, [domainRecordState])

    return(
        <div className="domainSetPage">
            <div className="domainSetcontent">
                <Back backFun={backToDomainPage}/>
                <DomainSetHead 
                    domainIdentity={domainName}
                />
            </div>
            <div className="setfunctioncom">
                <div className="priceandurl">
                    <DomainPriceSet 
                        domainState={domainState}
                        domainName={domainName}
                    />
                    <DomainUrlSet 
                        domainName={domainName}
                        ifLoading={ifIpfsLoading}
                        domainRecordState={domainRecordState}
                    />
                </div>
                <div className="auctionStateshow">
                    <DomainAuctionStateShow 
                        domainName={domainName}
                        domainState={domainState}
                    />
                </div>
            </div>
        </div>
    )
}

export default DomainSet;
