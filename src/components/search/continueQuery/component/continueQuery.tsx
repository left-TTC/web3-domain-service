import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { Search } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ContinueQueryProps {
    searchingName: string
}

const PRIMARY_COLOR = '#B4FC75';

const ContinueQuery: React.FC<ContinueQueryProps> = ({
    searchingName
}) => {

    const navigate = useNavigate();
    const {activeRootDomain} = useRootDomain();

    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const name = cutDomain(searchingName)[0]
        setSearchTerm(name)
    }, [])

    const clickQueryDomain = () => {
        if(searchTerm === "") return;

        let queryingDomain
        if(searchTerm.includes(".")){
            queryingDomain = searchTerm;
        }else{
            queryingDomain = searchTerm + "." + activeRootDomain;
        }

        navigate("/search", {
            state: {
                queryingDomain: queryingDomain,
            }
        })
    }

    return(
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-6">域名查询</h1>
            <div className="relative group max-w-2xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B4FC75] to-green-900 rounded-xl opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex items-center bg-[#111] border border-white/10 rounded-xl p-2">
                    <Search className="ml-4 text-gray-500" />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-white text-lg px-4 py-3 outline-none font-mono placeholder-gray-600 text-center"
                    />
                    <button 
                        onClick={() => clickQueryDomain()}
                        className="px-6 py-2.5 rounded-lg font-bold text-black transition-opacity hover:opacity-90 whitespace-nowrap"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                        搜索
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContinueQuery;
