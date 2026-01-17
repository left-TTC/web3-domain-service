import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";

// import { useTranslation } from "react-i18next";

import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";

import { useClinkQueryDomain } from "./functionalComponents/clinkQueryDomain";
import { Globe, X, Search, PlusCircle, ArrowRight } from "lucide-react";
import { NiceSelect } from "./childComponents/selector";
import { useNavigate } from "react-router-dom";
import { getDeviceTypeByUA } from "@/utils/functional/wallet/isPhone";
import { useTranslation } from "react-i18next";

export interface BrowserDomainQueryProps{
    ifShowTheQueryPage: boolean,
    setQueryPage: React.Dispatch<React.SetStateAction<boolean>>,
    backOriginPosition: () => void | null,
}

const PRIMARY_COLOR = '#B4FC75'; 

const BrowserDomainQuery: React.FC<BrowserDomainQueryProps> = ({
    ifShowTheQueryPage, setQueryPage, backOriginPosition
}) => {

    const {t} = useTranslation();

    const browseDomainRef = useRef<HTMLDivElement | null> (null);

    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [queryDomainValue, setQueryDomainValue] = useState("");
    const [ifInputFocus, setIfInputFocus] = useState(false);

    const { activeRootDomain, rootDomains, setActiveRootDomain, } = useRootDomain();

    const [selectedRoot, setSelectedRoot] = useState<string>(activeRootDomain? activeRootDomain:"")
    useEffect(() => {
        if(selectedRoot != activeRootDomain){
            setActiveRootDomain(selectedRoot)
        }
    }, [selectedRoot])

    useEffect(() => {
        if(ifShowTheQueryPage){
            setShouldAnimate(true)
        }
    }, [ifShowTheQueryPage])

    const { ClinkQuery } = useClinkQueryDomain(queryDomainValue, activeRootDomain)
    useEffect(() => {
        const handleQuery = (e: KeyboardEvent) => {
            if(e.key === "Enter" && ifInputFocus){
               ClinkQuery() 
            }
        }

        window.addEventListener("keydown", handleQuery);
        return () => window.removeEventListener("keydown", handleQuery);
    })

    useEffect(() => {
        const queryPage = browseDomainRef.current;
        if(!queryPage)return;
        if(!ifShowTheQueryPage)return;

        if(ifShowTheQueryPage){
            animate(queryPage, {
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 600,
            })
        }
    }, [shouldAnimate])

    const clickExitQueryPage = () => {
        const queryPage = browseDomainRef.current
        if(queryPage){
            if(backOriginPosition)backOriginPosition()
            animate(queryPage, {
                opacity: [1, 0],
                scale: [1, 0.9],
                duration: 800,
                onComplete: () => {
                    setQueryPage(false)
                }
            })
        }
    }

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryDomainValue(e.target.value)
    }

    const navigate = useNavigate()
    const goToCreateRoot = () => {
        navigate("/auction/createRoot")
    }

    const ifPhone = getDeviceTypeByUA()

    return(
        <div
            ref={browseDomainRef} 
            className="fixed inset-0 z-[100] flex justify-center items-center p-4"
        >
            <div  className="absolute inset-0 bg-[#050505] backdrop-blur-xl transition-opacity" />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#B4FC75] rounded-full opacity-[0.09] blur-[120px] mix-blend-screen animate-pulse-slow"/>
                <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-600 rounded-full opacity-[0.05] blur-[100px] mix-blend-screen"/>
            </div>
            <div className="relative w-full max-w-3xl flex flex-col gap-6 z-10 transform transition-all scale-100">
            
            <div className="bg-[#111] border border-white/10 rounded-3xl shadow-2xl relative group md:mb-30">
                
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B4FC75]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>

                <div className="flex justify-between items-center px-4 md:px-8 py-2 md:py-6 border-b border-white/5">
                    <h2 className="text-[14px] md:text-xl font-bold flex items-center gap-2 text-white">
                        <Globe size={ifPhone==="desktop"? 20:16} style={{ color: PRIMARY_COLOR }} /> 
                        Domain Search
                    </h2>
                    <button 
                        onClick={() => clickExitQueryPage()}
                        className="p-2 rounded-fullhover:bg-white/10 text-gray-400 hover:text-black transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8">
                    <div className="flex-grow relative group/input">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B4FC75] to-purple-600 rounded-xl opacity-20 blur transition duration-500 group-hover/input:opacity-40"></div>
                        <div className="relative flex items-center bg-[#0a0a0a] rounded-xl border border-white/10">
                            <Search className="w-5 h-5 text-gray-500 ml-4" />
                            <input 
                                type="text" 
                                placeholder={`Search for .${activeRootDomain} domain`} 
                                className="w-full bg-transparent border-none py-3 md:py-4 px-2 md:px-3 text-white text-[13px] md:text-lg placeholder-gray-500 focus:ring-0 outline-none font-mono font-bold"
                                onChange={(e) => handDomainInput(e)}
                                value={queryDomainValue}
                                autoFocus
                                onFocus={() => setIfInputFocus(true)}
                                onBlur={() => setIfInputFocus(false)}
                            />
                        </div>
                    </div>

                    <div className="relative md:w-40 group/select">
                        <div className="absolute -inset-0.5 bg-white/10 rounded-xl opacity-0 group-hover/select:opacity-100 blur transition duration-300"/>
                        <div className="relative bg-[#0a0a0a] border-2 border-white/20 rounded-xl flex items-center h-full hover:border-[#B4FC75]/50 transition-colors">
                            <NiceSelect
                                options={rootDomains}
                                value={selectedRoot}
                                onChange={(value) => setSelectedRoot(value)}                                  
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div 
                onClick={() => goToCreateRoot()}            
                className="relative group cursor-pointer rounded-2xl md:mt-10"
            >
                <div className="absolute rounded-2xl inset-0 bg-gradient-to-r from-purple-900/60 to-black border-2 border-white/10 group-hover:border-purple-500/50 transition-colors duration-300"/>
                
                <div className="relative flex items-center justify-between py-5 md:py-6 px-3 md:px-8">
                    <div className="flex items-center gap-5">
                        <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                            <PlusCircle size={ifPhone==="desktop"? 24:16} className="text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-[14px] md:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                                {t("cutomweb3")}
                            </h3>
                            <p className="text-[10px] md:text-sm text-gray-400 mt-0.5 font-normal">
                                {t("notld")}
                            </p>
                            <p className="text-[10px] md:text-sm text-gray-400 mt-0.5 font-normal">
                                {t("newroot")}
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-purple-500 group-hover:text-black transition-all duration-300 transform group-hover:translate-x-1">
                        <ArrowRight size={18} />
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default BrowserDomainQuery;
