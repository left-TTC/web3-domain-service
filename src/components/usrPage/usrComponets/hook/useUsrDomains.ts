import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getAllUsrDomains } from "@/utils/net/getUsrDomains";
import { getUsrDomainsRecord } from "@/utils/net/getUsrDomiansRecord";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";



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
    const [recordLoaded, setRecordLoaded] = useState(false)
    useEffect(() => {
        if(recordLoaded)return
        if(!usrDomains || !domainStateMap)return

        const fetchAllIPFSRecord = async() => {
            setRecordLoaded(true)
            setRecordMap(await getUsrDomainsRecord(usrDomains, domainStateMap, connection))
        }

        fetchAllIPFSRecord()
    }, [usrDomains])

    return { 
        recordLoaded, domainStateMap, recordMap, usrDomains
    }
}