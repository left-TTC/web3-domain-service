import "@/style/components/usrPage/usrComponents/usrDomain.css"
import { useTranslation } from "react-i18next";
import DomainSort from "./usrDomain/domainSort";
import { useEffect, useRef, useState } from "react";
import { MyDomainFilter } from "./usrDomain/sort/allMyDomain";
import { SortWay } from "./usrDomain/sort/sortMyDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useConnection } from "@solana/wallet-adapter-react";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import DomainBlock, { SortStyle } from "./usrDomain/domainBlock";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { getAllUsrDomains } from "@/utils/net/getUsrDomains";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { getUsrDomainsRecord } from "@/utils/net/getUsrDomiansRecord";
import type { PublicKey } from "@solana/web3.js";


export interface UsrDomainProps{
    domainNumber: number,
    ifCheckingOtherUsr: boolean,
    setDomainNumber: React.Dispatch<React.SetStateAction<number>>,
    searchKey: PublicKey | null,
}

export const usrPreferShow = atomWithStorage<SortStyle>(
    "usrSortShow",
    SortStyle.Simple
)   

const UsrDomain: React.FC<UsrDomainProps> = ({
    domainNumber, ifCheckingOtherUsr, setDomainNumber, searchKey
}) => {

    const {t} = useTranslation()
    const { connection } = useConnection()
    const { rootDomains } = useRootDomain()

    const [sortType, setSortType] = useState<MyDomainFilter>(MyDomainFilter.All)
    const [sortWay, setSortWay] = useState<SortWay>(SortWay.FromA)

    const [usrDomainLoaded, setUsrDomainLoaded] = useState(false)

    const [usrDomains, setUsrDomains] = useState<string[]>([])
    const [domainStateMap, setDomainStateMap] = useState<Map<string, NameRecordState> | null>(null)
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        if(!searchKey || rootDomains.length === 0) return

        hasFetched.current = true;
        const fetchUsrDomains = async() => {

            const rootKeyToNameMap = new Map<string, string>()
            for(const rootName of rootDomains){
                const rootKey = getNameAccountKey(getHashedName(rootName))
                rootKeyToNameMap.set(rootKey.toBase58(), rootName)
            }

            const [usrDomains, nameStateMap] = await getAllUsrDomains(
                connection, searchKey, rootKeyToNameMap
            )
            setUsrDomainLoaded(true)
            console.log("domains:", usrDomains)
            setDomainNumber(usrDomains.length)
            setUsrDomains(usrDomains)
            setDomainStateMap(nameStateMap)
        }

        fetchUsrDomains()
    }, [searchKey, rootDomains])

    const [recordMap, setRecordMap] = useState<Map<string, IPFSRecordState> | null>(null)
    const [isLoadingRecordData, setIsLoadingRecordDate] = useState(false)
    const recordLoaded = useRef(false)
    useEffect(() => {
        if(recordLoaded.current)return
        if(!usrDomains || !domainStateMap)return

        const fetchAllIPFSRecord = async() => {
            recordLoaded.current = true
            setIsLoadingRecordDate(true)
            setRecordMap(await getUsrDomainsRecord(usrDomains, domainStateMap, connection))
            setIsLoadingRecordDate(false)
        }

        fetchAllIPFSRecord()
    }, [usrDomains])

    const [showWay, setShowWay] = useAtom(usrPreferShow)

    const [sortedDomains, setSortedDomains] = useState<string[]>(usrDomains)
    const [recordedNumber, setRecordedNumber] = useState(0)
    useEffect(() => {
        // sort the domain
    }, [sortWay, sortType])

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
                        {usrDomains.map((usrDomain, index) => (
                            <DomainBlock 
                                key={index}
                                domainName={usrDomain}
                                sortStyle={showWay}  
                                domainState={domainStateMap?.get(usrDomain)} 
                                ifDomainRecordLoading={isLoadingRecordData}
                                domainRecordState={recordMap?.get(usrDomain)}
                            />
                        ))}
                    </div>
                    ):(
                        <div className="loaingusrDomain" />
                    )
                }
            </div>
        </div>
    )
}

export default UsrDomain;
