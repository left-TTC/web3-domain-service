
import "@/style/components/auction/rootDomainCreate/sailShip.css"
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { useEffect, useState } from "react";
import RootDomainInfo from "./children/rootDomainInfo";
import { findCreatingRoot } from "@/utils/net/findCreatingRoot";
import { useConnection } from "@solana/wallet-adapter-react";
import RootNameChange from "./children/rootNameChange";

const SailingShip = () => {

    const {connection} = useConnection();

    const [sailingRootDomains, setSailingRootDomains] = useState<FundingAccountState[]> ([])
    const [activeCreatingRoot, setActiveCreatingRoot] = useState<FundingAccountState | null>(null)
    const [activeLoaded, setActiveLoaded] = useState(false)

    useEffect(() => {
        const getAllCreatingRootDomains = async() => {
            const allRoots = await findCreatingRoot(connection)
            console.log(allRoots[0].creatingName)
            setSailingRootDomains(allRoots);
        }

        getAllCreatingRootDomains()
    }, [])

    useEffect(() => {
        if(sailingRootDomains && !activeCreatingRoot){
            setActiveCreatingRoot(sailingRootDomains[0])
        }
    }, [sailingRootDomains])

    useEffect(() => {
        if(activeCreatingRoot){
            setActiveLoaded(true)
        }
    }, [activeCreatingRoot])

    return(
        <div className="sailship">
            <div className="shipbl">
                <RootDomainInfo 
                    setActiveDomain={setActiveCreatingRoot}
                    activeDomain={activeCreatingRoot}
                    ifActiveRootLoaded={activeLoaded}
                />
            </div>
            <div className="changeshipBl">
                <RootNameChange creatingAccounts={sailingRootDomains}/>
            </div>
        </div>
    )
}

export default SailingShip;