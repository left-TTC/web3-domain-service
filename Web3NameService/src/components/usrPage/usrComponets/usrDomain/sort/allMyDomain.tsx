import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrDomain/sort/allMyDomain.css"

import array from "@/assets/array.svg"
import { animate } from "animejs";

export enum MyDomainFilter {
    All = "All",
    Recorded = "Recorded",
    NoRecord = "NoRecord",
}

export interface AllMyDomainProps {
    domainNumber: number,
    domainFilter: MyDomainFilter,
    setDomainFilter: React.Dispatch<React.SetStateAction<MyDomainFilter>>,
    recordedNumber: number,
}

const AllMyDomain: React.FC<AllMyDomainProps> = ({
    domainNumber, domainFilter, setDomainFilter, recordedNumber
}) => {

    const {t} = useTranslation()

    const [showDomainFilter, setShowDomainFilter] = useState(false)

    const allMyDomainRef = useRef<HTMLButtonElement | null>(null)
    const allMyDomainImg = useRef<HTMLImageElement | null>(null)
    const sortBlcokRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(!allMyDomainImg.current)return
        if(showDomainFilter){
            animate(allMyDomainImg.current, {
                rotate: -180,
                duration: 200,
            })
        }else{
            animate(allMyDomainImg.current, {
                rotate: 0,
                duration: 200,
            })
        }
    }, [showDomainFilter])
    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            if(allMyDomainRef.current && !allMyDomainRef.current.contains(event.target as Node) &&
                sortBlcokRef.current && !sortBlcokRef.current.contains(event.target as Node)
            ){
                setShowDomainFilter(false)
            }
        }
        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [])

    useEffect(() => {
        if(showDomainFilter && sortBlcokRef.current){
            animate(sortBlcokRef.current, {
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 300
            })
        }
    }, [showDomainFilter])

    const returnSortType = (type: MyDomainFilter) => {
        switch(type){
            case MyDomainFilter.All:
                return t("all") + `(${domainNumber})`;
            case MyDomainFilter.Recorded:
                return t("recorded") + `(${recordedNumber})`;
            case MyDomainFilter.NoRecord:
                return t("norecored") + `(${domainNumber - recordedNumber})`;
        }
    }

    return(
        <div className="allmydomainbl">
            <button className="allmydomain" ref={allMyDomainRef} onClick={() => setShowDomainFilter(!showDomainFilter)}>
                <h1>{returnSortType(domainFilter)}</h1>
                <img src={array} className="arrayicon" ref={allMyDomainImg} />
            </button>
            {showDomainFilter && 
                <div className="mydomainfilterbl" ref={sortBlcokRef}>
                    {Object.values(MyDomainFilter).map(type => (
                        <button key={type} 
                            className={`mydomaintypebu ${(domainFilter === type)? "mydomainactive":""}`}
                            onClick={() => {setDomainFilter(type); setShowDomainFilter(false)}}    
                        >
                            <h1>{returnSortType(type)}</h1>
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}

export default AllMyDomain;
