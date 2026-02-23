import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState";
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ContinueQueryProps {
    searchingName: string,
    setResultState: React.Dispatch<React.SetStateAction<SearchDomainResult>>,
}

const PRIMARY_COLOR = '#B4FC75';

const ContinueQuery: React.FC<ContinueQueryProps> = ({
    searchingName, setResultState
}) => {

    const {t} = useTranslation()
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const {activeRootDomain} = useRootDomain();

    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const name = cutDomain(searchingName)[0]
        setSearchTerm(name)
        // Auto focus on input when component mounts
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove any dots from input
        const value = e.target.value.replace(/\./g, '');
        setSearchTerm(value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            clickQueryDomain();
        }
    }

    const clickQueryDomain = () => {
        if(searchTerm === "") return;

        setResultState(SearchDomainResult.loading)
        {() => {}}
        let queryingDomain
        if(searchTerm.includes(".")){
            queryingDomain = searchTerm;
        }else{
            queryingDomain = searchTerm + "." + activeRootDomain;
        }

        navigate(`/search?q=${encodeURIComponent(queryingDomain)}`);
    }

    return(
        <div className="mb-8 text-center">
            <h3 className="text-[20px] md:text-4xl font-bold mb-6 md:mb-12">{t("search")}</h3>
            <div className="relative group max-w-2xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B4FC75] to-green-900 rounded-xl opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex items-center bg-[#111] border border-white/10 rounded-xl p-1 md:p-2">
                    <Search className="ml-4 text-gray-500" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none focus:ring-0 text-white text-lg px-4 py-3 outline-none font-mono placeholder-gray-600 text-center"
                        placeholder={t("searchDomain") || "Search Domain..."}
                        autoFocus
                    />
                    <button 
                        onClick={() => clickQueryDomain()}
                        className="px-6 py-2.5 rounded-lg font-bold text-black transition-opacity hover:opacity-90 whitespace-nowrap"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                        {t("search")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContinueQuery;
