import "@/style/components/usrPage/usrDomain/domainSort.css"
import AllMyDomain, { MyDomainFilter } from "./sort/allMyDomain";
import SortMyDomain, { SortWay } from "./sort/sortMyDomain";


export interface DomainSortProps{
    domainNumber: number
    domainFilter: MyDomainFilter,
    setDomainFilter: React.Dispatch<React.SetStateAction<MyDomainFilter>>,
    sortWay: SortWay,
    setSortWay: React.Dispatch<React.SetStateAction<SortWay>>,
}

const DomainSort: React.FC<DomainSortProps> = ({
    domainNumber, domainFilter, setDomainFilter, sortWay, setSortWay
}) => {


    return(
        <div className="domainsort">
            <div className="sortdomainsortbl">
                <AllMyDomain 
                    domainNumber={domainNumber}
                    domainFilter={domainFilter}
                    setDomainFilter={setDomainFilter}    
                />
                <SortMyDomain 
                    sortingWay={sortWay}
                    setSortWay={setSortWay}
                />
            </div>
            <div className="sortsearchbl">

            </div>
        </div>
    )
}

export default DomainSort;
