import "@/style/components/usrPage/usrDomain.css"
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


export interface UsrDomainProps{
    domainNumber: number,
}

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
            const usrDomains = await getUsrDomains(
                connection, wallet, getNameAccountKey(getHashedName(activeRootDomain))
            )
            console.log("mydomain:", usrDomains)
            setUsrDomains(usrDomains)
        }

        fetchUsrDomains()
    }, [wallet, activeRootDomain])

    const [sortStyle, setSortStyle] = useState<SortStyle>(SortStyle.One)

    useEffect(() => {
        const length = usrDomains.length;
        if (length <= 5) {
            setSortStyle(SortStyle.One);
        } else if (length > 10) {
            setSortStyle(SortStyle.Three);
        } else {
            setSortStyle(SortStyle.Two);
        }
    }, [usrDomains]);

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
                {(usrDomains.length === 0)? 
                    <div className="mydomainblno">
                        <h1>{t("nodomain")}</h1>
                    </div> :
                    <div className={`mydomainblco ${
                        sortStyle === SortStyle.One
                            ? "onelineone"
                            : sortStyle === SortStyle.Two
                            ? "onelinetwo"
                            : "onlinethree"
                    }`}>
                        {usrDomains.map(usrDomain => (
                            <div key={usrDomain} className="mydomaincontent">
                                <DomainBlock 
                                    domainName={usrDomain}
                                    sortStyle={sortStyle}    
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default UsrDomain;
