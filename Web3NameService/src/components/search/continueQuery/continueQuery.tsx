

import "@/style/components/search/continueQuery/continueQuery.css"
import type { ReverseKeyState } from "@/utils/functional/common/class/reverseKeyState";
import DomainShowAndQueryAgain from "./domainShowAndQueryAgain";
import RegisterDomainPixel from "./registerDomainPixel";

export interface ContinueQueryProps{
    queryingDomain: string,
    queryingDomainInfo: ReverseKeyState | null,
    ifCouldBuy: boolean,
    ifDomainInfoLoaded: boolean,
    setDomainSettlement: React.Dispatch<React.SetStateAction<boolean>>,
}

const ContinueQuery: React.FC<ContinueQueryProps> = ({
    queryingDomain, ifCouldBuy, queryingDomainInfo, ifDomainInfoLoaded, setDomainSettlement
}) => {

    return (
        <div className="continuequery">

            <DomainShowAndQueryAgain 
                queryingDomain={queryingDomain}
                ifCouldBuy={ifCouldBuy}
                ifDomainInfoLoaded={ifDomainInfoLoaded}
            /> 
            
            <div className="diliver"/>

            <RegisterDomainPixel
                ifDomainInfoLoaded={ifDomainInfoLoaded}
                ifCouldBuy={ifCouldBuy}
                openSettlePage={() => setDomainSettlement(true)}
                queryingDomainInfo={queryingDomainInfo}
            />
        </div>
    )
}


export default ContinueQuery;