import "@/style/components/usrPage/usrComponents/usrDomain/sort/sortMyDomain.css"
import { useTranslation } from "react-i18next"

import array from "@/assets/array.svg"
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export enum SortWay{
    FromA = "from A",
    FromZ = "from Z",
    Value = "by value"
}

export interface SortMyDomainProps{
    sortingWay: SortWay,
    setSortWay: React.Dispatch<React.SetStateAction<SortWay>>,
}

const SortMyDomain: React.FC<SortMyDomainProps> = ({
    sortingWay, setSortWay
}) => {

    const {t} = useTranslation();
    const [showSortWayChoose, setShowSortWayChoose] = useState(false)
    const sortWayBu = useRef<HTMLButtonElement | null>(null)

    const returnSortingWay = (sorting: SortWay) => {
        switch(sorting){
            case SortWay.FromA:
                return t("byletters") + "(A-Z)";
            case SortWay.FromZ:
                return t("byletters") + "(Z-A)";
            case SortWay.Value:
                return t("byvalue")
        }
    }

    const arrayRef = useRef<HTMLImageElement | null>(null)
    const sortWayRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(!arrayRef.current)return
        if(showSortWayChoose){
            animate(arrayRef.current, {
                rotate: -180,
                duration: 200,
            })
        }else{
            animate(arrayRef.current, {
                rotate: 0,
                duration: 200,
            })
        }
    }, [showSortWayChoose])
    useEffect(() => {
        if(showSortWayChoose && sortWayRef.current){
            animate(sortWayRef.current, {
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 300
            })
        }
    }, [showSortWayChoose])

    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            if(sortWayBu.current && !sortWayBu.current.contains(event.target as Node) &&
                sortWayRef.current && !sortWayRef.current.contains(event.target as Node)
            ){
                setShowSortWayChoose(false)
            }
        }
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [])

    return(
        <div className="SortMyDomain">
            <button className="sortwaybu" onClick={() => setShowSortWayChoose(!showSortWayChoose)} ref={sortWayBu}>
                <h1>{returnSortingWay(sortingWay)}</h1>
                <img src={array} className="arrayicon" ref={arrayRef}/>
            </button>
            {showSortWayChoose && 
                <div className="mydomainfilterbl" ref={sortWayRef}>
                    {Object.values(SortWay).map(way => (
                        <button key={way} 
                            className={`mydomaintypebu ${(sortingWay === way)? "mydomainactive":""}`}
                            onClick={() => {setSortWay(way); setShowSortWayChoose(false)}}    
                        >
                            <h1>{returnSortingWay(way)}</h1>
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}

export default SortMyDomain;