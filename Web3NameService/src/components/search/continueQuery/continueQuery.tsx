

import "@/style/components/search/continueQuery/continueQuery.css"
import DomainShowAndQueryAgain from "./component/domainShowAndQueryAgain";
import RegisterDomainPixel from "./component/registerDomainPixel";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";

export interface ContinueQueryProps{
    domainName: string,
    domainInfo: NameRecordState | null,
    ifDomainInfoLoaded: boolean,
    openDomainSettle: () => void,
    domainPrice: number | null,
}

const ContinueQuery: React.FC<ContinueQueryProps> = ({
    domainName, domainInfo, ifDomainInfoLoaded, openDomainSettle, domainPrice
}) => {

    return (
        <div className="continuequery">
            <DomainShowAndQueryAgain 
                domainInfo={domainInfo}
                ifDomainInfoLoaded={ifDomainInfoLoaded}
                domainName={domainName}
                domainPrice={domainPrice}
            /> 

            <RegisterDomainPixel
                ifDomainInfoLoaded={ifDomainInfoLoaded}
                openSettlePage={openDomainSettle}
            />
        </div>
    )
}


export default ContinueQuery;