

import "@/style/components/search/continueQuery/continueQuery.css"
import DomainShowAndQueryAgain from "./component/domainShowAndQueryAgain";
import RegisterDomainPixel from "./component/registerDomainPixel";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { getDomainTimeState, type DomainState } from "@/utils/functional/common/time/getDomainTimeState";
import { useEffect, useState } from "react";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";

export interface ContinueQueryProps{
    domainName: string,
    domainInfo: NameRecordState | null,
    ifDomainInfoLoaded: boolean,
    openDomainSettle: () => void,
    domainPrice: number | null,
    // null means this is a unintialized domain
    domainAuctionState: NameAuctionState | null,
}

const ContinueQuery: React.FC<ContinueQueryProps> = ({
    domainName, domainInfo, ifDomainInfoLoaded, openDomainSettle, domainPrice, domainAuctionState
}) => {

    const [domainState, setDomainState] = useState<DomainState | null>(null)

    useEffect(() => {
        if(domainAuctionState)setDomainState(getDomainTimeState(domainAuctionState))
    }, [domainAuctionState])

    return (
        <div className="continuequery">
            <DomainShowAndQueryAgain 
                domainInfo={domainInfo}
                ifDomainInfoLoaded={ifDomainInfoLoaded}
                domainName={domainName}
                domainPrice={domainPrice}
                domainSaleState={domainState}
            /> 

            <RegisterDomainPixel
                ifDomainInfoLoaded={ifDomainInfoLoaded}
                openSettlePage={openDomainSettle}
                domainSaleState={domainState}
            />
        </div>
    )
}


export default ContinueQuery;