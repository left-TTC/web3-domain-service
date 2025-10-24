import { useEffect, useState } from "react";
import { MyDomainFilter } from "./allMyDomain";
import { SortWay } from "./sortMyDomain";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";



export function useSortNowDomain(
    allDomains: string[],
    domainClass: MyDomainFilter,
    domainSequenceWay: SortWay,
    domainContain: string,
    domainRecordMap: Map<string, IPFSRecordState> | null,
    recordLoaded: boolean
){
    const [sortedDomains, setSortedDomains] = useState<string[]>(allDomains)
    const [recordedNumber, setRecordedNumber] = useState(0)

    useEffect(() => {
        if(!recordLoaded)return
        if(!domainRecordMap || allDomains.length === 0)return
        let newSortDomainArray: string[] = []
        let recordNum = 0;
        switch(domainClass){
            case MyDomainFilter.All:
                newSortDomainArray = allDomains;
                for (const domain of allDomains){
                    if(domainRecordMap.get(domain)){
                        if(domainRecordMap.get(domain)?.recordData) recordNum += 1
                    }
                }
                break;
            case MyDomainFilter.Recorded:
                for(const domain of allDomains){
                    if(domainRecordMap.get(domain) != undefined && domainRecordMap.get(domain)?.recordData != null){
                        newSortDomainArray.push(domain)
                        recordNum += 1
                    }
                }
                break;
            case MyDomainFilter.NoRecord:
                for(const domain of allDomains){
                    if(domainRecordMap.get(domain) === undefined || domainRecordMap.get(domain)!.recordData === null){
                        newSortDomainArray.push(domain)
                    }else recordNum += 1
                }
                break;
        }
        switch(domainSequenceWay){
            case SortWay.FromA:
                newSortDomainArray.sort((a, b) => b.localeCompare(a)); // Z → A
                break;
            case SortWay.FromZ:
                newSortDomainArray.sort((a, b) => a.localeCompare(b)); // A → Z
                break;
                
        }
        let uitilmateResult: string[] = []
        if(domainContain.length > 0){
            uitilmateResult = newSortDomainArray.filter(domain => 
                cutDomain(domain)[0].includes(domainContain)
            )
        }else{
            uitilmateResult = newSortDomainArray
        }
        
        setRecordedNumber(recordNum)
        setSortedDomains(uitilmateResult)
    }, [domainClass, domainContain, domainSequenceWay, domainRecordMap, allDomains, recordLoaded])

    return { recordedNumber, sortedDomains}
}