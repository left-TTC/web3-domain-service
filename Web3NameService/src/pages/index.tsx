
import BrowserDomain from "@/components/index/browseDomain/browseDomain"
import BrowserDomainQuery from "@/components/index/browseDomain/browserDomainQuery"
import DomainUsrShow from "@/components/index/domainUsr/domainUsrShow"
import DownloadBrave from "@/components/index/downloadBrave/downloadBrave"
import IndexBackground from "@/components/index/indexBackground"
import Web3CoreUtilities from "@/components/index/web3CoreUtilities/web3CoreUtilities"
import "@/style/pages/index.css"
import { useState } from "react"

export interface IndexProps {
    ifShowDomain: boolean
    setDomainQuery: React.Dispatch<React.SetStateAction<boolean>>,
}

const Index: React.FC<IndexProps> = ({
    setDomainQuery, ifShowDomain
}) => {

    const [getBackPositionFn, setGetBackPositionFn] = useState<()=>void>(()=>{})

    
    return(
        <div className="index">
            <BrowserDomain 
                setQueryPage={setDomainQuery}
                setBackFn={setGetBackPositionFn}    
            />
            <IndexBackground />
            {/* fixed content */}
            {ifShowDomain &&
                <BrowserDomainQuery 
                    ifShowTheQueryPage={ifShowDomain} 
                    setQueryPage={setDomainQuery}
                    backOriginPosition={getBackPositionFn}
                />
            }

            <DomainUsrShow />
            <Web3CoreUtilities />
            <DownloadBrave />
        </div>
    )
}

export default Index;
