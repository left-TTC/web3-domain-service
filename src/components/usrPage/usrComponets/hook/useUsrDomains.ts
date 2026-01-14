import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { DomainState, getDomainTimeState } from "@/utils/functional/common/time/getDomainTimeState";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getAllUsrDomains } from "@/utils/net/getUsrDomains";
import { getUsrDomainsRecord } from "@/utils/net/getUsrDomiansRecord";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";



export function useUsrDomains(
    searchKey: PublicKey | null,
    setUsrDomainLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    fetched: React.RefObject<boolean>
){

    const { rootDomains } = useRootDomain()
    const { connection } = useConnection()

    const [usrDomains, setUsrDomains] = useState<string[]>([])
    

    const [rootKeyMap, setRootKeyMap] = useState<Map<string, string> | null>(null)

    useEffect(() => {
        if (fetched.current) return;
        if(!searchKey || rootDomains.length === 0) return

        fetched.current = true
        const fetchUsrDomains = async() => {

            const rootKeyToNameMap = new Map<string, string>()
            for(const rootName of rootDomains){
                const rootKey = getNameAccountKey(getHashedName(rootName))
                rootKeyToNameMap.set(rootKey.toBase58(), rootName)
            }

            setRootKeyMap(rootKeyMap)

            const [usrDomains, nameStateMap] = await getAllUsrDomains(
                connection, searchKey, rootKeyToNameMap
            )
            setUsrDomainLoaded(true)
            console.log("domains:", usrDomains)
            setUsrDomains(usrDomains)
            setDomainStateMap(nameStateMap)
        }

        fetchUsrDomains()
    }, [searchKey, rootDomains])

    const [domainStateMap, setDomainStateMap] = useState<Map<string, NameRecordState> | null>(null)

    const [recordMap, setRecordMap] = useState<Map<string, IPFSRecordState> | null>(null)
    const [isLoadingRecordData, setIsLoadingRecordDate] = useState(false)
    const [recordLoaded, setRecordLoaded] = useState(false)
    useEffect(() => {
        if(recordLoaded)return
        if(!usrDomains || !domainStateMap)return

        const fetchAllIPFSRecord = async() => {
            setRecordLoaded(true)
            setIsLoadingRecordDate(true)
            setRecordMap(await getUsrDomainsRecord(usrDomains, domainStateMap, connection))
            setIsLoadingRecordDate(false)
        }

        fetchAllIPFSRecord()
    }, [usrDomains])

    const [usrDomainOnSale, setUsrDomainOnSale] = useState<string[]>([])
    const onSaleLoaded = useRef(false)
    useEffect(() => {
        const fetchOnSaleDomains = async() => {
            if(onSaleLoaded.current)return
            if(!rootKeyMap)return
            if(usrDomains.length > 0){
                onSaleLoaded.current = true
                const nameOnsaleDomains: string[] = []
                const nameAuctionStateKeys: PublicKey[] = []

                usrDomains.forEach((domain, _) => {
                    const nameAndRoot = cutDomain(domain)
                    const auctionStateKey = getNameStateKey(
                        getHashedName(nameAndRoot[0]), new PublicKey(rootKeyMap!.get(nameAndRoot[1])!)
                    )
                    nameAuctionStateKeys.push(auctionStateKey)
                })

                const infos = await connection.getMultipleAccountsInfo(nameAuctionStateKeys)
                infos.forEach((info, index) => {
                    if(info){
                        const nameAuctionState = new NameAuctionState(info)
                        switch(getDomainTimeState(nameAuctionState)){
                            case DomainState.Auctioning:
                                nameOnsaleDomains.push(usrDomains[index])
                                break
                            default: 
                                break
                        }
                    }
                })

                setUsrDomainOnSale(nameOnsaleDomains)
            }
        }
        fetchOnSaleDomains()
    }, [usrDomains, rootKeyMap])

    return {
        isLoadingRecordData, recordLoaded,
        domainStateMap, recordMap, usrDomains, usrDomainOnSale
    }
}