
import "@/style/components/topbar/navigation/marketPlaceDropdown.css"

import diamond from "@/assets/diamond.svg"
import coin from "@/assets/coin.svg"
import champion from "@/assets/champion.svg"

import { useTranslation } from "react-i18next"
import Attention from "@/components/common/show/attention"
import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import { useNavigate } from "react-router-dom"

export enum MarketChoose {
    DomainRecommend = "DomainRecommend",
    AuctionHouse = "AuctionHouse",
    CreateRootDomain = "CreateRootDomain",
}

export interface MarketplaceDropDownProps {
    ifAnimateDown: boolean,
    closeMarketDrop: () => void,
    setAnimate: React.Dispatch<React.SetStateAction<boolean>>,
    marketButtonRef: React.RefObject<HTMLButtonElement | null>
}

const MarketplaceDropDown: React.FC<MarketplaceDropDownProps> = ({
    ifAnimateDown, closeMarketDrop, setAnimate, marketButtonRef
}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const returnTitle = (type: MarketChoose) => {
        switch(type){
            case MarketChoose.DomainRecommend:
                return t("redommend")
            case MarketChoose.AuctionHouse:
                return t("auctionhouse")
            case MarketChoose.CreateRootDomain:
                return t("launchroot")
        }
    }

    const returnWord = (type: MarketChoose) => {
        switch(type){
            case MarketChoose.DomainRecommend:
                return t("findrecommend")
            case MarketChoose.AuctionHouse:
                return t("findAuction")
            case MarketChoose.CreateRootDomain:
                return t("findcreate")
        }
    }

    const marketplaceRef = useRef<HTMLDivElement | null>(null)
    const [ifloaded, setIdloaded] = useState(false)

    useEffect(() => {
        if(marketplaceRef.current){
            setIdloaded(true)
        }
    }, [marketplaceRef.current])

    useEffect(() => {
        if(ifloaded && marketplaceRef.current){
            animate(marketplaceRef.current, {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 300
            })
        }

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node

            if(marketButtonRef.current){
                console.log(1)
                if(marketplaceRef.current && !marketButtonRef.current.contains(target) && !marketplaceRef.current.contains(target)){
                    setAnimate(true)
                    console.log("yes")
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ifloaded])

    const marketNavi = (direction: MarketChoose) => {
        switch(direction){
            case MarketChoose.DomainRecommend:
                navigate("/auction/recommend")
                setAnimate(true)
                break
            case MarketChoose.AuctionHouse:
                navigate("/auction/resale")
                setAnimate(true)
                break
            case MarketChoose.CreateRootDomain:
                navigate("/auction/createRoot")
                setAnimate(true)
                break
        }
    }

    useEffect(() => {
        if(ifAnimateDown && marketplaceRef.current){
            animate(marketplaceRef.current, {
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 300,
                onComplete: closeMarketDrop
            })
            setAnimate(false)
        }
    }, [ifAnimateDown])

    return(
        <div className="marketdown" ref={marketplaceRef}>
            <div className="marketdowncontent">
                {Object.values(MarketChoose).map(marketType => (
                    <div className="marketchoosebubl" key={marketType}>
                        <button className="marketchoosebu" onClick={() => marketNavi(marketType)}>
                            <img src={returnImg(marketType)} className="markettypeimg" />
                            <h1>{returnTitle(marketType)}</h1>
                        </button>
                        <Attention word={returnWord(marketType)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default MarketplaceDropDown;

const returnImg = (type: MarketChoose) => {
    switch(type){
        case MarketChoose.DomainRecommend:
            return diamond
        case MarketChoose.AuctionHouse:
            return coin
        case MarketChoose.CreateRootDomain:
            return champion
    }
}
