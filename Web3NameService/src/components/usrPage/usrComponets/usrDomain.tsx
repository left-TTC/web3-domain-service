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


export interface UsrDomainProps{
    domainNumber: number,
}

export const usrPreferShow = atomWithStorage<SortStyle>(
    "usrSortShow",
    SortStyle.Simple
) 

const UsrDomain: React.FC<UsrDomainProps> = ({
    domainNumber
}) => {

    const {t} = useTranslation()
    const { publicKey: wallet } = useWalletEnv()
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
        if(!wallet || rootDomains.length === 0) return

        hasFetched.current = true;
        const fetchUsrDomains = async() => {

            const rootKeyToNameMap = new Map<string, string>()
            for(const rootName of rootDomains){
                const rootKey = getNameAccountKey(getHashedName(rootName))
                rootKeyToNameMap.set(rootKey.toBase58(), rootName)
            }

            const [usrDomains, nameStateMap] = await getAllUsrDomains(
                connection, wallet, rootKeyToNameMap
            )
            setUsrDomainLoaded(true)
            console.log("mydomain:", usrDomains)
            setUsrDomains(usrDomains)
            setDomainStateMap(nameStateMap)
        }

        fetchUsrDomains()
    }, [wallet, rootDomains])

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
                nowShowWay={showWay}
                setShowWay={setShowWay}
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
