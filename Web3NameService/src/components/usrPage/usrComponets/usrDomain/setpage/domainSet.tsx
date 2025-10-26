

import Back from "@/components/common/functional/back";
import "@/style/components/usrPage/usrComponents/usrDomain/setpage/domainSet.css"
import DomainSetHead from "./com/domainSetHead";
import DomainPriceSet from "./com/ domainPriceSet";
import DomainUrlSet from "./com/domainUrlSet";
import DomainAuctionStateShow from "./com/domainAuctionStateShow";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { useEffect, useState } from "react";

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
    
    const [ifLessThan640, setIfLessThan640] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIfLessThan640(window.innerWidth < 640);
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <div className="domainSetPage">
            <div className="domainSetcontent">
                <Back backFun={backToDomainPage}/>
                <DomainSetHead 
                    domainIdentity={domainName}
                    ifLessThan640={ifLessThan640}
                />
            </div>
            <div className="setfunctioncom">
                <div className="priceandurl">
                    <DomainPriceSet 
                        domainState={domainState}
                        domainName={domainName}
                        ifLessThan640={ifLessThan640}
                    />
                    <DomainUrlSet 
                        domainName={domainName}
                        ifLoading={ifIpfsLoading}
                        domainRecordState={domainRecordState}
                        ifLessThan640={ifLessThan640}
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
