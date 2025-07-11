

import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import "@/style/components/index/queryResult/queryResult.css"
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { ReverseKeyState } from "@/utils/functional/common/reverseKeyState";
import { getQueryDomainInfo } from "@/utils/net/getQueryDomainInfo";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export interface QueryResultProps{
    queryingDomain: string,
}

const QueryResult: React.FC<QueryResultProps> = ({queryingDomain}) =>{
    
    const [queryedDomain, setQueryedDomain] = useState("");
    const [ifDomainCouldBuy, setIfDomainCouldBuy] = useState(false);
    const [queryDomainInfo, setQueryDomainInfo] = useState<ReverseKeyState | null>(null)

    const {rootDomainsPubKey, rootDomains} = useRootDomain();
    const {connection} = useConnection()

    useEffect(() => {
        const fetchDomainInfo = async() => {
            if(queryingDomain == queryedDomain) return;

            const domainBlock = cutDomain(queryingDomain);
            const rootDomainKey = 
                rootDomainsPubKey[rootDomains.indexOf(queryingDomain[queryingDomain.length - 1])];

            const domainNameAccountInfo = await getQueryDomainInfo(domainBlock, rootDomainKey, connection);

            if(!domainNameAccountInfo){
                setIfDomainCouldBuy(true)
            }

            setQueryDomainInfo(domainNameAccountInfo);
        }

        fetchDomainInfo();
        setQueryedDomain(queryingDomain)
    })

    return(
        <div className="queryresult">

        </div>
    )
}


export default QueryResult;

