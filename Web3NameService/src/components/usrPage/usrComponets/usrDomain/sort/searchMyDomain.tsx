
import "@/style/components/usrPage/usrComponents/usrDomain/sort/searchMyDomain.css"

import query from "@/assets/query868E9B.svg"

interface SearchMyDomainProps {
    contain: string,
    setContain: React.Dispatch<React.SetStateAction<string>>,
}

const SearchMyDomain: React.FC<SearchMyDomainProps> = ({
    contain, setContain
}) => {

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContain(e.target.value)
    }

    return(
        <div className="SearchMyDomain">
            <img src={query} className="searchmyquerticon" />
            <input 
                type="text"
                placeholder="Search"
                value={contain}
                onChange={handDomainInput}
                className="mydomainsearchinput"
            />
        </div>
    )
}

export default SearchMyDomain;