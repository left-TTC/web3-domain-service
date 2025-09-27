import ContinueQuery from "@/components/search/continueQuery/continueQuery";
import { useLocation, useNavigate } from "react-router-dom";


import "@/style/pages/search.css"
import { useEffect, useState } from "react";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getQueryDomainInfo } from "@/utils/net/getQueryDomainInfo";
import { useConnection } from "@solana/wallet-adapter-react";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";

import DomainSettlement from "@/components/search/domainSettlement/domainSettlement";
import Back from "@/components/common/functional/back";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { INIT_DOMAIN_PRICE } from "@/utils/constants/constants";

export function Search() {

    const location = useLocation();

    const {connection} = useConnection();
    const navigate = useNavigate();

    const { queryingDomain } = location.state || {};

    const [domainBlock, setDomainBlock] = useState<string[] | null> (null)
    const [queryDomainInfo, setQueryDomainInfo] = useState<NameRecordState | null>(null)
    
    const [isDomainInfoLoaded, setIsDomainInfoLoaded] = useState(false)
    const [domainStartPrice, setDomainStartPrice] = useState<number | null>(null)

    useEffect(() => {
        if(isDomainInfoLoaded){
            if(queryDomainInfo){
                // means the domain has already initialized
                setDomainStartPrice(queryDomainInfo.customPrice.toNumber())
            }else{
                setDomainStartPrice(INIT_DOMAIN_PRICE)
            }
        }
    }, [isDomainInfoLoaded])

    const [showSaleDomain, setShowSaleDomain] = useState(false)

    useEffect(() => {
        setIsDomainInfoLoaded(false)
        setDomainBlock(cutDomain(queryingDomain));
    } ,[queryingDomain])


    useEffect(() => {
        const fetchDomainInfo = async() => {
            if((!domainBlock)) return;

            const rootDomainKey = getNameAccountKey(getHashedName(domainBlock[domainBlock.length - 1]))
            const accountInfo = await getQueryDomainInfo(domainBlock, rootDomainKey, connection);

            setIsDomainInfoLoaded(true)
            setQueryDomainInfo(accountInfo[0])
        }

        fetchDomainInfo()

    }, [domainBlock])

    const backToIndex = () => {
        navigate("./index")
    }

    return(
        <div className="SearchPage">
            <div className="searchPageContent">
                <Back backFun={() => backToIndex()} />
                <ContinueQuery 
                    domainName={queryingDomain} 
                    domainInfo={queryDomainInfo}
                    ifDomainInfoLoaded={isDomainInfoLoaded}
                    openDomainSettle={() => setShowSaleDomain(true)}
                    domainPrice={domainStartPrice}
                />
            </div>
            {showSaleDomain &&
                <DomainSettlement 
                    domainName={queryingDomain}
                    backToSearchResult={() =>setShowSaleDomain(false)}
                    domainPrice={domainStartPrice}
                    domainInfo={queryDomainInfo}
                />
            }
        </div>
    )
}