import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "@/style/components/search/continueQuery/components/functional/queryAgainComponent.css"

import query from "@/assets/query.svg"
import enter from "@/assets/enter.svg"

const QueryAgainComponent = () => {

    const navigate = useNavigate()
    const {activeRootDomain} = useRootDomain();

    const clickQueryDomian = () => {
        if(queryAgainDomain === "") return;

        const queryingDomain = queryAgainDomain + "." + activeRootDomain;

        navigate("/search", {
            state: {
                queryingDomain: queryingDomain,
            }
        })
    }

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryAgainDomain(e.target.value)
    }

    const [queryAgainDomain, setQueryAgainDomain] = useState("")
    const [ifInputOnfocus, setIfInputOnfocus] = useState(false)

    const queryButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleQuery = (e: KeyboardEvent) => {
            if(e.key === "Enter" && ifInputOnfocus){
                queryButtonRef.current?.click(); 
            }
        }

        window.addEventListener("keydown", handleQuery);
        return () => window.removeEventListener("keydown", handleQuery);
    })

    return(
        <div className="queryagain">
            <input 
                type="text"
                className="queryagaininputs"
                placeholder={`Searching for .${activeRootDomain} Domain`}
                value={queryAgainDomain}
                onChange={handDomainInput}
                onFocus={() => setIfInputOnfocus(true)}
            />
            <div className="thequeryblockcontent">
                <div className="queryagaineenter">
                    <img src={enter} className="querypagenetericon" />
                    <h1>Enter</h1>
                </div>
                <button className="queryagainsubmitbutton" ref={queryButtonRef} onClick={() => clickQueryDomian()}>
                    <img src={query} className="querypagequericon" />
                </button>
            </div>
        </div>
    )
}


export default QueryAgainComponent;