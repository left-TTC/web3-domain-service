import { useState } from "react";

import "@/style/components/usrPage/usrComponents/usrDomain/sort/searchMyDomain.css"

import query from "@/assets/query868E9B.svg"


const SearchMyDomain = () => {

    const [inputDomainaName, setInputDomainName] = useState("")

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputDomainName(e.target.value)
    }

    return(
        <div className="SearchMyDomain">
            <img src={query} className="searchmyquerticon" />
            <input 
                type="text"
                placeholder="Search"
                value={inputDomainaName}
                onChange={handDomainInput}
                className="queryagaininput"
            />
        </div>
    )
}

export default SearchMyDomain;