import { useEffect, useRef, useState } from "react";
import "@/style/components/auction/rootDomainCreate/children/flipCard.css";
import { animate } from "animejs";

import cardStar from "@/assets/cartStar.svg"
import joker from "@/assets/joker.svg"
import { useTranslation } from "react-i18next";
import { CREATE_ROOT_TARGET } from "@/utils/constants/constants";

interface FlipCardProps {
    frontText?: string;
    fundNumber?: number;
    loaded: boolean
}

export default function FlipCard({ frontText, fundNumber, loaded }: FlipCardProps) {

    const {t} = useTranslation()

    const [flipped, setFlipped] = useState(false);

    const [cardOnHover, setCardOnHover] = useState(false)
    const cardRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(cardOnHover){
            if(cardRef.current){
                animate(cardRef.current, {
                    scale: [1, 1.1],
                    duration: 300,
                })
            }
        }else{
            if(cardRef.current){
                animate(cardRef.current, {
                    scale: [1.1, 1],
                    duration: 300,
                })
            }
        }
    }, [cardOnHover])

    const [opacity, setOpacity] = useState(0.2)
    useEffect(() => {
        const opacity = 0.2 + (fundNumber! / CREATE_ROOT_TARGET) * (1 - 0.2);
        setOpacity(opacity) 
    }, [fundNumber])

    return (
        <div 
            className="flip-card" 
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={() => setCardOnHover(true)}
            onMouseLeave={() => setCardOnHover(false)}
            ref={cardRef}
        >
            {loaded? (
                <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
                    <div className="flip-face flip-front">
                        <div className="frontback">
                            <img src={cardStar} className="frontcardstar" style={{ opacity }}/>
                        </div>
                        <h1>{frontText}</h1>
                    </div>
                    <div className="flip-face flip-back" >
                        <h1>{t("collected")}:</h1>
                        <h2>$ {(fundNumber!/1e6).toFixed(2)}</h2>
                    </div>
                </div>
            ):(
                <div className={`flip-inner ${flipped ? "flipped" : ""} ${!loaded&& "continuerotate"}`}>
                    <div className="flip-face flip-front">
                        <div className="frontback">
                            <img src={joker} className="frontcardstarjoker"/>
                        </div>
                    </div>
                    <div className="flip-face flip-back" >
                        <h2>Loaing</h2>
                    </div>
                </div>
            )}
        </div>
    );
}
