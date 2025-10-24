import "@/style/components/usrPage/usrComponents/usrDomain/domainSort.css"
import AllMyDomain, { MyDomainFilter } from "./sort/allMyDomain";
import SortMyDomain, { SortWay } from "./sort/sortMyDomain";
import SearchMyDomain from "./sort/searchMyDomain";
import DetailOrSimple from "./sort/detailOrSimple";
import type { SortStyle } from "./domainBlock";


export interface DomainSortProps{
    domainNumber: number
    domainFilter: MyDomainFilter,
    setDomainFilter: React.Dispatch<React.SetStateAction<MyDomainFilter>>,
    sortWay: SortWay,
    setSortWay: React.Dispatch<React.SetStateAction<SortWay>>,
    nowShowWay: SortStyle,
    setShowWay: React.Dispatch<React.SetStateAction<SortStyle>>,
    recordedNumber: number,
}

const DomainSort: React.FC<DomainSortProps> = ({
    domainNumber, domainFilter, setDomainFilter, 
    sortWay, setSortWay, nowShowWay, setShowWay,
    recordedNumber
}) => {


    return(
        <div className="domainsort">
            <div className="sortdomainsortbl">
                <AllMyDomain 
                    domainNumber={domainNumber}
                    domainFilter={domainFilter}
                    setDomainFilter={setDomainFilter}    
                    recordedNumber={recordedNumber}
                />
                <SortMyDomain 
                    sortingWay={sortWay}
                    setSortWay={setSortWay}
                />
            </div>
            <div className="sortsearchbl">
                <SearchMyDomain />
                <DetailOrSimple 
                    nowShowWay={nowShowWay}
                    setShowWay={setShowWay}
                />
            </div>
        </div>
    )
}

export default DomainSort;
