

import BrowserDomain from "@/components/index/browseDomain/browseDomain"
import BrowserDomainQuery from "@/components/index/browseDomain/browserDomainQuery"
import "@/style/pages/index.css"
import { useState } from "react"


export function Index() {

    const [showBrowserDomainQuery, setShowBrowserDomainQuery] = useState(false);


    return(
        <div className="index">
            <BrowserDomain setQueryPage={setShowBrowserDomainQuery}/>

            {/* fixed content */}
            {showBrowserDomainQuery &&
                <BrowserDomainQuery 
                    ifShowTheQueryPage={showBrowserDomainQuery} 
                    setQueryPage={setShowBrowserDomainQuery} 
                />
            }
        </div>
    )
}
