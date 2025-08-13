import "@/style/components/usrPage/usrDomain.css"
import { useTranslation } from "react-i18next";
import DomainSort from "./usrDomain/domainSort";
import { useState } from "react";
import { MyDomainFilter } from "./usrDomain/sort/allMyDomain";
import { SortWay } from "./usrDomain/sort/sortMyDomain";


export interface UsrDomainProps{
    domainNumber: number,
}

const UsrDomain: React.FC<UsrDomainProps> = ({
    domainNumber
}) => {

    const {t} = useTranslation()

    const [sortType, setSortType] = useState<MyDomainFilter>(MyDomainFilter.All)
    const [sortWay, setSortWay] = useState<SortWay>(SortWay.FromA)

    return(
        <div className="usrdomain">
            <div className="mydomintitle">
                <h1>{t("mydomain")}</h1>
            </div>
            <div className="linedomain" />
            <DomainSort 
                domainNumber={domainNumber}
                domainFilter={sortType}
                setDomainFilter={setSortType}
                sortWay={sortWay}
                setSortWay={setSortWay}
            />
            <div className="mydomainsbl">
                
            </div>
        </div>
    )
}

export default UsrDomain;
