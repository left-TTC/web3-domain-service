import ContinueQuery from "@/components/search/continueQuery/continueQuery";
import { useLocation, useNavigate } from "react-router-dom";


import "@/style/pages/search.css"
import { useEffect, useState } from "react";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getQueryDomainInfo } from "@/utils/net/getQueryDomainInfo";
import { useConnection } from "@solana/wallet-adapter-react";
import type { ReverseKeyState } from "@/utils/functional/common/class/reverseKeyState";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";

import DomainSettlement from "@/components/search/domainSettlement/domainSettlement";
import { PublicKey } from "@solana/web3.js";
import Back from "@/components/common/functional/back";
import { getDomainUSDPrice } from "@/utils/functional/domain/getDomainUSDPrice";

export function Search() {

    const location = useLocation();

    const {connection} = useConnection();
    const navigate = useNavigate();

    const { queryingDomain } = location.state || {};

    const [ifCounldBuy, setIfCouldBuy] = useState(false)
    const [domainBlock, setDomainBlock] = useState<string[] | null> (null)
    const [queryDomainInfo, setQueryDomainInfo] = useState<ReverseKeyState | null>(null)
    const [queryingDomainKey, setQueryingDomainKey] = useState<PublicKey | null> (null)
    const [isDomainInfoLoaded, setIsDomainInfoLoaded] = useState(false)
    const [domainUsdc, setDomainUsdc] = useState(0)

    const [showSaleDomain, setShowSaleDomain] = useState(false)

    useEffect(() => {
        setIfCouldBuy(false)
        setIsDomainInfoLoaded(false)
        setDomainBlock(cutDomain(queryingDomain));
    } ,[queryingDomain])

    useEffect(() => {
        if(domainBlock){
            console.log(domainBlock[0])
            setDomainUsdc(getDomainUSDPrice(domainBlock[0]))
        }
    }, [domainBlock])

    useEffect(() => {
        const fetchDomainInfo = async() => {
            if((!domainBlock)) return;

            const rootDomainKey = getNameAccountKey(getHashedName(domainBlock[domainBlock.length - 1]))
            const accountInfo = await getQueryDomainInfo(domainBlock, rootDomainKey, connection);

            setIsDomainInfoLoaded(true)
            if(!accountInfo[0]){
                setIfCouldBuy(true)
            }

            setQueryDomainInfo(accountInfo[0])
            setQueryingDomainKey(accountInfo[1])
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
                    queryingDomain={queryingDomain} 
                    queryingDomainInfo={queryDomainInfo}
                    ifCouldBuy={ifCounldBuy}
                    ifDomainInfoLoaded={isDomainInfoLoaded}
                    setDomainSettlement={setShowSaleDomain}
                    domainUsdc={domainUsdc}
                />
            </div>
            {showSaleDomain &&
                <DomainSettlement 
                    domainName={queryingDomain} 
                    domainKey={queryingDomainKey} 
                    backToSearchResult={() =>setShowSaleDomain(false)}
                    domainPriceUsd={domainUsdc}
                />
            }
        </div>
    )
}