
import { useTranslation } from "react-i18next"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { animate } from "animejs"
import { useNavigate } from "react-router-dom"
import { Compass, Gavel, PlusSquare } from "lucide-react"

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
                if(marketplaceRef.current && !marketButtonRef.current.contains(target) && !marketplaceRef.current.contains(target)){
                    setAnimate(true)
                    console.log("yes")
                }
            }
        }

        document.addEventListener("click", handleClickOutside);

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

    const marketIconMap: Record<MarketChoose, ReactNode> = {
        [MarketChoose.DomainRecommend]: <Compass size={18} />,
        [MarketChoose.AuctionHouse]: <Gavel size={18} />,
        [MarketChoose.CreateRootDomain]: <PlusSquare size={18} />,
    };

    return(
        <div
            ref={marketplaceRef}
            className="absolute top-20 z-950 opacity-0"
        >
            <div className="bg-[#0a0a0a] border border-white/30 rounded-2xl p-4 shadow-xl shadow-black/40 space-y-3 min-w-[250px]">
                {Object.values(MarketChoose).map((marketType) => (
                    <div
                        key={marketType}
                        className="flex items-center justify-between gap-3"
                    >
                        <button
                            onClick={() => marketNavi(marketType)}
                            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors w-full text-left"
                        >
                            <span className="text-[#B4FC75]">
                                {marketIconMap[marketType]}
                            </span>

                            <span className="text-sm font-bold text-white">
                                {returnTitle(marketType)}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default MarketplaceDropDown;
