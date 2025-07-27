

import BrowserDomain from "@/components/index/browseDomain/browseDomain"
import BrowserDomainQuery from "@/components/index/browseDomain/browserDomainQuery"
import "@/style/pages/index.css"
import { useState } from "react"

export interface IndexProps {
    ifShowDomain: boolean
    setDomainQuery: React.Dispatch<React.SetStateAction<boolean>>,
}

const Index: React.FC<IndexProps> = ({
    setDomainQuery, ifShowDomain
}) => {

    
    return(
        <div className="index">
            <BrowserDomain setQueryPage={setDomainQuery}/>

            {/* fixed content */}
            {ifShowDomain &&
                <BrowserDomainQuery 
                    ifShowTheQueryPage={ifShowDomain} 
                    setQueryPage={setDomainQuery} 
                />
            }
        </div>
    )
}

export default Index;
