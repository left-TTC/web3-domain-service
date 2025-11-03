import "@/style/components/usrPage/usrComponents/usrDomain.css"
import { useTranslation } from "react-i18next";
import DomainSort from "./usrDomain/domainSort";
import { useState } from "react";
import { MyDomainFilter } from "./usrDomain/sort/allMyDomain";
import { SortWay } from "./usrDomain/sort/sortMyDomain";
import DomainBlock, { SortStyle } from "./usrDomain/domainBlock";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { useSortNowDomain } from "./usrDomain/sort/useSortNowDomain";
import LoadingComponent from "@/components/search/continueQuery/component/functional/loadingComponent";


export interface UsrDomainProps{
    domainNumber: number,
    ifCheckingOtherUsr: boolean,
    usrDomains: string[],
    recordMap: Map<string, IPFSRecordState> | null,
    recordLoaded: boolean,
    usrDomainLoaded: boolean,
    domainStateMap: Map<string, NameRecordState> | null,
    isLoadingRecordData: boolean,
    onSaleDomains: string[],
}

export const usrPreferShow = atomWithStorage<SortStyle>(
    "usrSortShow",
    SortStyle.Simple
)   

const UsrDomain: React.FC<UsrDomainProps> = ({
    domainNumber, ifCheckingOtherUsr, usrDomains, recordMap, recordLoaded,
    usrDomainLoaded, domainStateMap, isLoadingRecordData, onSaleDomains
}) => {

    const {t} = useTranslation()

    const [sortType, setSortType] = useState<MyDomainFilter>(MyDomainFilter.All)
    const [sortWay, setSortWay] = useState<SortWay>(SortWay.FromA)

    const [showWay, setShowWay] = useAtom(usrPreferShow)

    const [containCharacter, setContainCharacter] = useState("")
    const { recordedNumber, sortedDomains } = useSortNowDomain(
        usrDomains, sortType, sortWay, containCharacter, recordMap, recordLoaded
    )

    return(
        <div className="usrdomain">
            <div className="mydomintitle">
                {ifCheckingOtherUsr? (
                    <h1>{t("domains")}</h1>
                ):(
                    <h1>{t("mydomain")}</h1>
                )}
            </div>
            <div className="linedomain" />
            <DomainSort 
                domainNumber={domainNumber}
                domainFilter={sortType}
                setDomainFilter={setSortType}
                sortWay={sortWay}
                setSortWay={setSortWay}
                nowShowWay={showWay} 
                setShowWay={setShowWay}
                recordedNumber={recordedNumber}
                contain={containCharacter}
                setContain={setContainCharacter}
            />
            <div className="mydomainsbl">
                {
                usrDomainLoaded? (
                    usrDomains.length === 0? 
                    <div className="mydomainblno">
                        <h1>{t("nodomain")}</h1>
                    </div> 
                    :
                    <div className={`mydomainblco ${
                        showWay === SortStyle.Detail
                            ? "detailShow"
                            : "simpleShow"
                    }`}>
                        {sortedDomains.map((usrDomain, index) => (
                            <DomainBlock 
                                key={index}
                                domainName={usrDomain}
                                sortStyle={showWay}  
                                domainState={domainStateMap?.get(usrDomain)} 
                                ifDomainRecordLoading={isLoadingRecordData}
                                domainRecordState={recordMap?.get(usrDomain)}
                                onSaleDomains={onSaleDomains}
                                ifOtherUsr={ifCheckingOtherUsr}
                            />
                        ))}
                    </div>
                    ):(
                        <LoadingComponent 
                            contentClass="usrDomainLoading"
                            dotClass="usrDomainDot"
                        />
                    )
                }
            </div>
        </div>
    )
}

export default UsrDomain;
