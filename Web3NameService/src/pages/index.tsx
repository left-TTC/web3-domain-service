
import BrowserDomain from "@/components/index/browseDomain/browseDomain"
import BrowserDomainQuery from "@/components/index/browseDomain/browserDomainQuery"
import DomainUsrShow from "@/components/index/domainUsr/domainUsrShow"
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
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#B4FC75] selection:text-black pb-24 pl-10 pr-10 relative overflow-x-hidden">
            
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.10]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-900 rounded-full mix-blend-screen filter blur-[100px] opacity-[0.15]"></div>
            </div>
            
            <BrowserDomain 
                setQueryPage={setDomainQuery}
                setBackFn={setGetBackPositionFn}    
            />
            {/* fixed content */}
            {ifShowDomain &&
                <BrowserDomainQuery 
                    ifShowTheQueryPage={ifShowDomain} 
                    setQueryPage={setDomainQuery}
                    backOriginPosition={getBackPositionFn}
                />
            }

            <Web3CoreUtilities />
            <DomainUsrShow />
            
        </div>
    )
}

export default Index;
