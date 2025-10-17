

import sort from "@/assets/sort.svg"

import "@/style/components/auction/domainRecommend/bar/sortButton.css"
import { useEffect, useRef, useState } from "react"

export enum RecommendSortWay {
    PriceToHigh = "Price: Low to hogh",
    PriceToLow = "Price: High to low",
    AtoZ = "Domain: A - Z",
    ZtoA = "Domain: Z - A",
}

interface SortButtonProps {
    nowWay: RecommendSortWay
    setSortWay: React.Dispatch<React.SetStateAction<RecommendSortWay>>
}

const SortButton: React.FC<SortButtonProps> = ({
    setSortWay, nowWay
}) => {

    const [showChooseSortway, setShowChooseSortWay] = useState(false)

    const chooseBlRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if(chooseBlRef.current){
                if(!chooseBlRef.current.contains(target) ){
                   setShowChooseSortWay(false)
                }
            }
        }

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    })

    return(
        <div className="sorcontenttbl" ref={chooseBlRef}>
            <button className="sortbl" onClick={() => setShowChooseSortWay(!showChooseSortway)}>
                <img src={sort} className="sortimg" />
            </button>

            {showChooseSortway && 
                <div className="chooseSortbl">
                    {Object.values(RecommendSortWay).map((way, index) => (
                        <button className="sortwaychoosebu" key={index} onClick={() => setSortWay(way)}>
                            <div className={`${nowWay === way&& "rightswayattention"}`} />
                            <h1>{way}</h1>
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}

export default SortButton;