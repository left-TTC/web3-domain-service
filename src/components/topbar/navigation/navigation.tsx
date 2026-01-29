
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import { 
    Globe,
  Search
} from 'lucide-react';


import { useRef, useState } from "react";
import MarketplaceDropDown from "./marketPlaceDropdown";

export enum NavigationLists{
    Home = "Home",
    Auction = "Marketplace",
    DownLoad = "DownLoad",
}

export interface NavigationProps {
    openDomainQueryPage: () => void
}

const Navigation: React.FC<NavigationProps> = ({
    openDomainQueryPage
}) => {

    const navigate = useNavigate()
    const {t} = useTranslation()

    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [ifSearchbarHover, setIfSearchbarHover] = useState(false)
    const [showMarketType, setShowMarketType] = useState(false)

    const [marketDropAnimate, setMarketDropAnimate] = useState(false)

    const returnNavigateName = (navigateObject: NavigationLists) => {
        switch(navigateObject){
            case NavigationLists.Home:
                return t("Home");
            case NavigationLists.Auction:
                return t("Marketplace");
            case NavigationLists.DownLoad:
                return t("DownLoad");
        }
    }

    const navigateTo = (navigateObject: NavigationLists) => {
        switch(navigateObject){
            case NavigationLists.Home:
                navigate('/');
                break;
            case NavigationLists.Auction:
                if(!showMarketType){
                    setShowMarketType(true)
                }else{
                    setMarketDropAnimate(true)
                }
                break
            case NavigationLists.DownLoad:
                navigate('/download');
        } 
    }

    const returnSearchIcon = () => {
        if(ifSearchbarHover){
            return <Search size={20} style={{color: "#B4FC75"}}/>
        }
        return <Search size={20} style={{color: "rgb(214, 234, 234)"}}/>
    }

    const openSearchPage = () => {
        navigate('/');
        openDomainQueryPage();
    }

    const marketRef = useRef<HTMLButtonElement | null>(null)

    return(
        <div className="flex row gap-[10px] md:gap-[15px]">
            <div 
                className="flex items-center gap-3 cursor-pointer group pr-2 sm:pr-5" 
                onClick={() => window.location.reload()}
            >
                <div className="w-10 h-10 bg-[#B4FC75] rounded-xl flex items-center justify-center text-black shadow-[0_0_15px_rgba(180,252,117,0.3)] group-hover:scale-110 transition-transform">
                    <Globe size={22} strokeWidth={2.5} />
                </div>
                <div className="flex-col leading-none hidden sm:flex">
                    <span className="text-lg font-black tracking-tighter text-white">Kilo</span>
                    <span className="text-[10px] text-[#B4FC75] font-bold tracking-[0.2em]">DOMAINS</span>
                </div>
            </div>

            {Object.values(NavigationLists).map(navigateObject => (
                <div className="relative flex items-center" key={navigateObject}>
                    <button
                        key={navigateObject}
                        ref={navigateObject === NavigationLists.Auction ? marketRef : null}
                        onClick={() => navigateTo(navigateObject)}
                        onMouseEnter={() => setHoveredId(navigateObject)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="flex items-center justify-center"
                    >
                        <h3
                            className={`text-[12px] md:text-[14px] font-bold ${hoveredId === navigateObject ? 'text-[#B4FC75]' : 'text-gray-400'}`}
                        >
                            {returnNavigateName(navigateObject)}
                        </h3>
                    </button>
                    {navigateObject===NavigationLists.Auction && showMarketType &&
                        <MarketplaceDropDown 
                            ifAnimateDown={marketDropAnimate} 
                            closeMarketDrop={() => setShowMarketType(false)}
                            setAnimate={setMarketDropAnimate}
                            marketButtonRef={marketRef}
                        />
                    }
                </div>
            ))}
            <div className="w-[1px] h-[50px] bg-white hidden md:flex mx-0 md:mx-[8px] filter blur-[1px]" />

            <button 
                className={`hidden md:flex row items-center justify-center h-[50px] gap-[10px]`} 
                onMouseEnter={() => setIfSearchbarHover(true)} 
                onMouseLeave={() => setIfSearchbarHover(false)}
                onClick={() => openSearchPage()}
            >
                {returnSearchIcon()}
                <h3 className={`${ifSearchbarHover? "text-[#B4FC75]":"text-gray-400"} font-normal uppercase text-[13px] hidden lg:flex`}>{t("searchDomain")}</h3>
            </button>
        </div>
    )
}

export default Navigation;
