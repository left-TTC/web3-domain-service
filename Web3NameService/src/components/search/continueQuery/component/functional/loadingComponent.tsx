
import "@/style/components/search/continueQuery/components/functional/loaingComponent.css"
import { animate } from "animejs";
import { useEffect, useRef } from "react";


const LoadingComponent = () => {

    const dotRefOne = useRef<HTMLDivElement | null>(null)
    const dotRefTwo = useRef<HTMLDivElement | null>(null)
    const dotRefThree = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(dotRefOne.current){
            animate
        }
    }, [])

    return(
        <div className="loadcontent">
            <div className="loadDot" ref={dotRefOne}/>
            <div className="loadDot" ref={dotRefTwo}/>
            <div className="loadDot" ref={dotRefThree}/>
        </div>
    )
}

export default LoadingComponent;
