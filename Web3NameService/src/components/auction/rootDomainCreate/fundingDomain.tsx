import { useTranslation } from "react-i18next";

import RollStar from "./children/rollStar";
import StarTrails from "./children/starTrails";

import "@/style/components/auction/rootDomainCreate/fundingDomain.css"


import { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { PublicKey } from "@solana/web3.js";
import { Numberu64 } from "@/utils/functional/common/number/number64";

import { useEffect, useState } from "react";
import RootDomainInfo from "./children/rootDomainInfo";
import AddFuel from "./addFuel/addFuel";
import { findCreatingRoot } from "@/utils/net/findCreatingRoot";
import { useConnection } from "@solana/wallet-adapter-react";

const FundingDomain = () => {

    const {t} = useTranslation();
    const {connection} = useConnection()

    const [ifAddFuelSuccess, setIfAddFuelSucess] = useState(false)

    const [ifAllRootLoaded, setIfAllRootLoaded] = useState(false)
    const [flyingRootDomains, setFlyingRootDomains] = useState<FundingAccountState[]> ([])

    useEffect(() => {
        const getAllCreatingRootDomains = async() => {
            const allRoots = await findCreatingRoot(connection)
            console.log(allRoots[0].creatingName)
            setFlyingRootDomains(allRoots);
        }

        getAllCreatingRootDomains()
    }, [])

    const [activeCreatingRoot, setActiveCreatingRoot] = useState<FundingAccountState | null>(null)

    useEffect(() => {
        if(flyingRootDomains && !activeCreatingRoot){
            setActiveCreatingRoot(flyingRootDomains[0])
        }
    }, [flyingRootDomains])

    const rootDomainContent = (
        activeCreatingRoot ? (
            <div className="fundingdomain">
                <div className="creatingName">
                    <h2>destination: </h2>
                    <h1>{activeCreatingRoot?.creatingName}</h1>
                </div>
                <div className="rootDomaininfo">
                    <div className="travleprocess">
                        <RollStar ifAddedFuel={ifAddFuelSuccess}/>
                        <StarTrails nowStorageLamports={activeCreatingRoot?.fundState.toNumber()}/>
                    </div>
                    <RootDomainInfo creatingAccounts={flyingRootDomains} setActiveDomain={setActiveCreatingRoot} activeDomain={activeCreatingRoot}/>
                </div>
            </div>
        ):(
            <div className="fundingdomain">
                
            </div>
        )
    )

    return(
        <div>
            {rootDomainContent}
        </div>
    )
}


export default FundingDomain;
