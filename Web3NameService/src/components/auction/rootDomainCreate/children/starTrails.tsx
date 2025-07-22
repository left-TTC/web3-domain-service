
import "@/style/components/auction/rootDomainCreate/children/starTrails.css"
import { CREATE_ROOT_FEE } from "@/utils/constants/constants";
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react"

export interface StarTrailsProps {
    nowStorageLamports: number
}


const StarTrails: React.FC<StarTrailsProps> = ({
    nowStorageLamports
}) => {

    const processRef = useRef<HTMLDivElement | null>(null);

    const [lastTravelProcess, setLastTravelProcess] = useState(0)
    const [travelProcess, setTravelProcess] = useState(0);

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        setTravelProcess(nowStorageLamports / CREATE_ROOT_FEE);
    }, [nowStorageLamports])

    const startTimestampRef = useRef<number | null>(null);
    useEffect(() => {
        const duration = 600;
        
        function step(timestamp: number) {
        if (!startTimestampRef.current) {
            startTimestampRef.current = timestamp;
        }
        const progress = timestamp - startTimestampRef.current;
        const progressRatio = Math.min(progress / duration, 1); 

        const newCount = Math.floor(progressRatio * travelProcess * 100);
        setDisplayValue(newCount);

        if (progress < duration) {
            requestAnimationFrame(step);
        } else {
            setDisplayValue(travelProcess * 100); // 确保最终值准确
        }
        }

        requestAnimationFrame(step);

        return () => {
        startTimestampRef.current = null;
        };
    }, [travelProcess])

    useEffect(() => {
        if(processRef.current){
            animate(processRef.current, {
                width: [`${lastTravelProcess * 100}%`, `${travelProcess * 100}%`],
                duration: 500,
                onComplete: () => {
                    setLastTravelProcess(travelProcess);
                }
            })
        }
    }, [travelProcess])



    return(
        <div className="processblock">
            <h1>{displayValue}%</h1>
            <div className="startrails pixel">
                <div className="pixel-fill" style={{width:`0%`}} ref={processRef}/>
            </div>
        </div>
    )
}

export default StarTrails;
