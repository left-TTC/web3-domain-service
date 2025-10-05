import "@/style/components/usrPage/usrComponents/usrDomain.css"
import { useTranslation } from "react-i18next";
import DomainSort from "./usrDomain/domainSort";
import { useEffect, useState } from "react";
import { MyDomainFilter } from "./usrDomain/sort/allMyDomain";
import { SortWay } from "./usrDomain/sort/sortMyDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { getUsrDomains } from "@/utils/net/getUsrDomains";
import { useConnection } from "@solana/wallet-adapter-react";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import DomainBlock, { SortStyle } from "./usrDomain/domainBlock";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";


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
    const {publicKey: wallet} = useWalletEnv()
    const {connection} = useConnection()
    const {activeRootDomain} = useRootDomain()

    const [sortType, setSortType] = useState<MyDomainFilter>(MyDomainFilter.All)
    const [sortWay, setSortWay] = useState<SortWay>(SortWay.FromA)

    const [usrDomainLoaded, setUsrDomainLoaded] = useState(false)

    const [usrDomains, setUsrDomains] = useState<string[]>([])

    useEffect(() => {
        if(!wallet || !activeRootDomain) return
        const fetchUsrDomains = async() => {
            // const usrDomains = await getUsrDomains(
            //     connection, wallet, getNameAccountKey(getHashedName(activeRootDomain))
            // )
            // setUsrDomainLoaded(true)
            // console.log("mydomain:", usrDomains)
            // setUsrDomains(usrDomains)
            setUsrDomainLoaded(true)
            setUsrDomains(["aaa.web3", "aa1.web3", "2.web3", "3.web3", "4.web3", "5.web3", "6.web3", "7.web3", "8.web3", ])
        }

        fetchUsrDomains()
    }, [wallet, activeRootDomain])

    

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
