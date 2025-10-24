

import exit from "@/assets/Check-Out.svg"
import array from "@/assets/arrow.svg"

import { cutDomain } from "@/utils/functional/common/cutDomain";
import { useStarDomains } from "./useStarDomains";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { animate } from "animejs";

interface StarDomainItemProps{
    domainName: string,
    starDomainsInfo: number,
    index: number
}

const StarDomainItem: React.FC<StarDomainItemProps> = ({
    domainName, starDomainsInfo
}) => {

    const {t} = useTranslation()
    const {starDomains, setStarDomains} = useStarDomains()

    const deleteItem = (item: string) => {
        const newDomains = starDomains.filter(domain => domain !== item);
        setStarDomains(newDomains);
    }

    const itemRef = useRef<HTMLDivElement | null>(null)
    const arrowRef = useRef<HTMLImageElement | null>(null)
    const [showDelete, setShowDelete] = useState(false)
    const outed = useRef(false)

    useEffect(() => {
        if(showDelete && !outed.current){
            animate(itemRef.current!, {
                translateX: [0, "-50%"],
                duration: 300,
                onComplete: () => outed.current = true
            })
            animate(arrowRef.current!, {
                rotate: [0, 180],
                scaleY: 2,
                duration: 300
            })
        }else if(!showDelete && outed.current){
            animate(itemRef.current!, {
                translateX: ["-50%", 0],
                duration: 300,
                onComplete: () => outed.current = false
            })
            animate(arrowRef.current!, {
                rotate: [180, 0],
                scaleY: 2,
                duration: 300
            })
        }
    }, [showDelete])

    return(
        <div 
            className="cartitem" 
            ref={itemRef}
        >
            <div className="contouchbl">
                <div className="domainitemcart">
                    <div className="nameandpricecart">
                        <div className="nameart">
                            <div className="artball" />
                            <h1>{cutDomain(domainName)[0]}</h1>
                            <h2>.{cutDomain(domainName)[1]}</h2>
                        </div>
                        <h2>${(starDomainsInfo/1e6).toFixed(2)}</h2>
                    </div>
                    <div className="carttwobu">
                        <button className="deletethecartitem" onClick={() => {}}>
                            <img src={exit} className="cartexitimg" />
                        </button>   
                        <div className="showDeleteBl" onClick={() => setShowDelete(!showDelete)}>
                            <img src={array} className="cartarrayimg" ref={arrowRef}/>
                        </div>                               
                    </div>
                </div>
                <div className="greendelete" onClick={() => deleteItem(domainName)}>
                    <h1>{t("delete")}</h1>
                </div>
            </div>
            <div className="cartitemline" />
        </div>
    )   
}

export default StarDomainItem;
