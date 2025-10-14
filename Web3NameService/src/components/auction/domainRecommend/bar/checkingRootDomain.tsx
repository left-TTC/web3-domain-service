
import "@/style/components/auction/domainRecommend/bar/checkingRootDomain.css"
import { useEffect, useRef, useState } from "react";

import open from "@/assets/whitego.svg"
import { animate } from "animejs";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useAuctionStore } from "@/components/store/auctionRecommendStore";

export interface CheckingRootDomainProps {
    checkingRoot: string,
    setReloadFlag: () => void,
}

const CheckingRootDomain: React.FC<CheckingRootDomainProps> = ({
    checkingRoot, setReloadFlag
}) => {

    const {rootDomains} = useRootDomain()

    const [showChangeRoot, setShowChangeRoot] = useState(false)
    const [animateCloseRoot, setAnimateCloseRoot] = useState(false)

    const setData = useAuctionStore((store) => store.setData);
    const handleChangeRoot = (newRoot: string) => {
        setData({ checkingRoot: newRoot, ifDomainGenerated: false });
        setReloadFlag()
    };

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

    const chooseRoot = (root: string) => {
        handleChangeRoot(root)
        setShowChangeRoot(false)
    }

    return(
        <div className="checkingroot">
            <button className="checkingrootcontent" onClick={() => checkBuClick()}>
                <h1>{checkingRoot}</h1>
                <img src={open} className="checkingrootgo" ref={imgRef}/>
            </button>
            {showChangeRoot &&
                <div className="changerootdrop" ref={dropRef} >
                    {rootDomains.map((rootDomain, index) => (
                        <button className="chooseRootDomaininchecking" key={index} onClick={() => chooseRoot(rootDomain)}>
                            <h1>{rootDomain}</h1>
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}

export default CheckingRootDomain;