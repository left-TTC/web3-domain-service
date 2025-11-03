
import "@/style/components/topbar/navigation/navigation.css"
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import home from "@/assets/homeimg.svg";
import greenHome from "@/assets/homeimggreen.svg";
import auction  from "@/assets/auction white.svg";
import auctionGreen from "@/assets/auctiongreen.svg"
import searchGreen from "@/assets/searchpixelGreen.svg"
import search from "@/assets/pixelSearch.svg"
import file from "@/assets/file.svg"
import filegreen from "@/assets/filegreen.svg"

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

    const returnImg = (navigateObject: NavigationLists, ifHoverd: boolean) => {
        if(ifHoverd){
            switch(navigateObject){
                case NavigationLists.Home:
                    return greenHome
                case NavigationLists.Auction:
                    return auctionGreen
                case NavigationLists.Docus:
                    return filegreen
            } 
        }else{
            switch(navigateObject){
                case NavigationLists.Home:
                    return home
                case NavigationLists.Auction:
                    return auction
                case NavigationLists.Docus:
                    return file
            } 
        }
    }

    const returnSearchIcon = () => {
        if(ifSearchbarHover){
            return searchGreen
        }
        return search
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
                        {(hoveredId === navigateObject)? 
                        (
                            <img src={returnImg(navigateObject, true)} className="topbarhomeicon" />
                        ):
                        (
                            <img src={returnImg(navigateObject, false)} className="topbarhomeicon" />
                        )}
                        <h1>{returnNavigateName(navigateObject)}</h1>
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
                <img src={returnSearchIcon()} className="pixelsearch" /> 
                <h1>{t("serachDomain")}</h1>
            </button>
        </div>
    )
}

export default Navigation;
