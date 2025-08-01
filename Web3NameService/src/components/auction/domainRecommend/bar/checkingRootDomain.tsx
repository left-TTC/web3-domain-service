
import "@/style/components/auction/domainRecommend/bar/checkingRootDomain.css"
import { useEffect, useRef, useState } from "react";

import open from "@/assets/whitego.svg"
import { animate } from "animejs";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";

export interface CheckingRootDomainProps {
    checkingRoot: string,
    setCheckingRoot: React.Dispatch<React.SetStateAction<string>>,
}

const CheckingRootDomain: React.FC<CheckingRootDomainProps> = ({
    checkingRoot, setCheckingRoot
}) => {

    const {rootDomains} = useRootDomain()

    const [showChangeRoot, setShowChangeRoot] = useState(false)
    const [animateCloseRoot, setAnimateCloseRoot] = useState(false)

    const imgRef = useRef<HTMLImageElement | null>(null)
    const dropRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(imgRef.current ){
            if(showChangeRoot){
                animate(imgRef.current, {
                    rotate: -90,
                    duration: 500,
                })
                if(dropRef.current){
                    animate(dropRef.current, {
                        scale: [0.9, 1],
                        opacity: [0, 1],
                        duration: 300,
                    })
                }
            }
        }
    }, [showChangeRoot])

    useEffect(() => {
        if(animateCloseRoot){
            if(imgRef.current && dropRef.current){
                animate(imgRef.current, {
                    rotate: 90,
                    duration: 500,
                })
                animate(dropRef.current, {
                    scale: [1, 0.9],
                    opacity: [1, 0],
                    duration: 300,
                    onComplete:() => {
                        setAnimateCloseRoot(false)
                        setShowChangeRoot(false)
                    }
                })
            }
        }
    }, [animateCloseRoot])

    const checkBuClick = () => {
        if(showChangeRoot){
            setAnimateCloseRoot(true)
        }else{
            setShowChangeRoot(true)
        }
    }

    return(
        <div className="checkingroot">
            <button className="checkingrootcontent" onClick={() => checkBuClick()}>
                <h1>{checkingRoot}</h1>
                <img src={open} className="checkingrootgo" ref={imgRef}/>
            </button>
            {showChangeRoot &&
                <div className="changerootdrop" ref={dropRef}>
                    {rootDomains.map(rootDomain => (
                        <button className="chooseRootDomaininchecking" key={rootDomain}>
                            <h1>{rootDomain}</h1>
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}

export default CheckingRootDomain;