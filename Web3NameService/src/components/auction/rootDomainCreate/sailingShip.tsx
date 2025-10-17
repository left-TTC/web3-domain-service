
import "@/style/components/auction/rootDomainCreate/sailShip.css"
import type { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { useEffect, useState } from "react";
import RootDomainInfo from "./children/rootDomainInfo";
import { findCreatingRoot } from "@/utils/net/findCreatingRoot";
import { useConnection } from "@solana/wallet-adapter-react";
import RootNameChange from "./children/rootNameChange";

const SailingShip = () => {

    const {connection} = useConnection();

    const [sailingRootDomains, setSailingRootDomains] = useState<rootStateAccount[]> ([])
    const [activeCreatingRoot, setActiveCreatingRoot] = useState<rootStateAccount | null>(null)
    const [activeLoaded, setActiveLoaded] = useState(false)

    useEffect(() => {
        const getAllCreatingRootDomains = async() => {
            const allRoots = await findCreatingRoot(connection)
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
            <div className="changeshipBl">
                <RootNameChange 
                    creatingAccounts={sailingRootDomains} 
                    setActiveRoot={setActiveCreatingRoot}
                    setLoadingState={() => setActiveLoaded(false)}    
                    loaded={activeLoaded}
                />
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
            </div>
            <div className="shipbl">
                <RootDomainInfo 
                    activeDomain={activeCreatingRoot}
                    ifActiveRootLoaded={activeLoaded}
                />
            </div>
        </div>
    )
}

export default SailingShip;