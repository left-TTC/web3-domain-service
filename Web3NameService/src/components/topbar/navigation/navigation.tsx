
import "@/style/components/topbar/navigation/navigation.css"
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import { 
  Search
} from 'lucide-react';


import { useRef, useState } from "react";
import MarketplaceDropDown from "./marketPlaceDropdown";

export enum NavigationLists{
    Home = "Home",
    Auction = "Marketplace",
    Docus = "Docus",
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
                return t("home");
            case NavigationLists.Auction:
                return t("auction");
            case NavigationLists.Docus:
                return t("docus");
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
            case NavigationLists.Docus:
                return t("docus");
        } 
    }

    const returnSearchIcon = () => {
        if(ifSearchbarHover){
            return <Search style={{color: "#B4FC75"}}/>
        }
        return <Search style={{color: "rgb(214, 234, 234)"}}/>
    }

    const openSearchPage = () => {
        navigate('/');
        openDomainQueryPage();
    }

    const marketRef = useRef<HTMLButtonElement | null>(null)

    return(
        <div className="navigation">

            {Object.values(NavigationLists).map(navigateObject => (
                <div className="navigateobjectblock" key={navigateObject}>
                    <button 
                        className={`navigatebutton ${hoveredId === navigateObject? 'greenword' : ''} `}
                        key={navigateObject}
                        onClick={() => navigateTo(navigateObject)}
                        onMouseEnter={() => setHoveredId(navigateObject)}
                        onMouseLeave={() => setHoveredId(null)}
                        ref={navigateObject===NavigationLists.Auction ? marketRef : null}
                    >
                        <h1 className="text-gray-400">{returnNavigateName(navigateObject)}</h1>
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
            <div className="topbarlinenavi" />

            <button 
                className={`opensearchomit ${ifSearchbarHover? 'greenwordsearch' : ''} `} 
                onMouseEnter={() => setIfSearchbarHover(true)} 
                onMouseLeave={() => setIfSearchbarHover(false)}
                onClick={() => openSearchPage()}
            >
                {returnSearchIcon()}
                <h1>{t("searchDomain")}</h1>
            </button>
        </div>
    )
}

export default Navigation;
