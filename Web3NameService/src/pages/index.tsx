

import BrowserDomain from "@/components/index/browseDomain/browseDomain"
import BrowserDomainQuery from "@/components/index/browseDomain/browserDomainQuery"
import QueryResult from "@/components/index/queryResult/queryResult";
import "@/style/pages/index.css"
import { useState } from "react"


export function Index() {

    const [showBrowserDomainQuery, setShowBrowserDomainQuery] = useState(false);
    const [showQueryResult, setShowQueryResult] = useState(false);

    const [queryingDomain, setQueryingDomain] = useState("");

    return(
        <div className="index">
            <BrowserDomain setQueryPage={setShowBrowserDomainQuery}/>

            {/* fixed content */}
            {showBrowserDomainQuery &&
                <BrowserDomainQuery 
                    ifShowTheQueryPage={showBrowserDomainQuery} 
                    setQueryPage={setShowBrowserDomainQuery} 
                    setQueryingDoamin={setQueryingDomain}
                    setShowQueryPage={setShowQueryResult}
                />
            }
            {showQueryResult &&
                <QueryResult queryingDomain={queryingDomain}/>
            }
        </div>
    )
}
