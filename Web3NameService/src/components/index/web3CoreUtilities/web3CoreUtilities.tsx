import { useTranslation } from "react-i18next";

import "@/style/components/index/web3CoreUtilities/web3CoreUtilities.css"
import { useEffect, useRef, useState } from "react";
import { createIntersectionAnimation } from "@/utils/animate/createIntersectionAnimation";
import { animate } from "animejs";
import { upAnimation } from "@/utils/animate/upAnimate";
import { downAnimation } from "@/utils/animate/downAnimate";

const Web3CoreUtilities = () => {

    const {t} = useTranslation()

    const web3CoreUtilitiesTitle = useRef<HTMLHeadingElement | null>(null)
    const lineoneRef = useRef<HTMLDivElement | null> (null)
    const linetwoRef = useRef<HTMLDivElement | null> (null)
    const lastYRef = useRef<number | null>(null);
    const lastYRef1 = useRef<number | null>(null);
    const lastYRef2 = useRef<number | null>(null);

    const [ifAllComponentsLoaded, setIfAllComponentsLoaded] = useState(false)

    useEffect(() => {
        if(web3CoreUtilitiesTitle.current && lineoneRef.current && linetwoRef.current){
            setIfAllComponentsLoaded(true)
        }
    }, [web3CoreUtilitiesTitle.current, lineoneRef.current, linetwoRef.current])

    useEffect(() => {
        if(ifAllComponentsLoaded){
            console.log("load")
            const web3CoreUtilitiesTitleUp = () => {
                if(!web3CoreUtilitiesTitle.current) return
                animate(web3CoreUtilitiesTitle.current, {
                    scale: [0.6, 1],
                    opacity: [0, 1],
                    duration: 500,
                })
            }
            const web3CoreUtilitiesTitleDown = () => {
                if(!web3CoreUtilitiesTitle.current) return
                animate(web3CoreUtilitiesTitle.current, {
                    scale: [1, 0.6],
                    opacity: [1, 0],
                })
            }
            const web3Title = createIntersectionAnimation(
                web3CoreUtilitiesTitleUp, web3CoreUtilitiesTitleDown, web3CoreUtilitiesTitle.current, lastYRef
            )

            const lineOneIntersectionObserve = createIntersectionAnimation(
                upAnimation(lineoneRef.current, 100, {Min:0, Max:1}, 500),
                downAnimation(lineoneRef.current, 100, {Min:0, Max:1}, 500),
                lineoneRef.current, lastYRef1
            )

            const lineTwoIntersectionObserve = createIntersectionAnimation(
                upAnimation(linetwoRef.current, 100, {Min:0, Max:1}, 500),
                downAnimation(linetwoRef.current, 100, {Min:0, Max:1}, 500),
                linetwoRef.current, lastYRef2
            )

            return () => {
                web3Title?.disconnect()
                lineOneIntersectionObserve?.disconnect()
                lineTwoIntersectionObserve?.disconnect()
            }
        }
    }, [ifAllComponentsLoaded])

    return(
        <div className="web3coreutilities">
            <h1 ref={web3CoreUtilitiesTitle}>{t("web3coreutilities")}</h1>
            <div className="lineOnecore" ref={lineoneRef}>
                <div className="columnBox">
                    
                </div>
                <div className="columnBox">
                    
                </div>
            </div>
            <div className="linetowbox" ref={linetwoRef}>

            </div>
        </div>
    )
}

export default Web3CoreUtilities;


