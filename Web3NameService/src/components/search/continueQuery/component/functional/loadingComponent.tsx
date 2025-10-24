
import "@/style/components/search/continueQuery/components/functional/loaingComponent.css"
import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface LoadingComponentProps{
    contentClass?: string,
    dotClass?: string
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
    contentClass, dotClass
}) => {

    const dotRefOne = useRef<HTMLDivElement | null>(null)
    const dotRefTwo = useRef<HTMLDivElement | null>(null)
    const dotRefThree = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(dotRefOne.current){
            animate
        }
    }, [])

    return(
        <div className={`loadcontent ${contentClass}`}>
            <div className={`loadDot ${dotClass}`} ref={dotRefOne}/>
            <div className={`loadDot ${dotClass}`} ref={dotRefTwo}/>
            <div className={`loadDot ${dotClass}`} ref={dotRefThree}/>
        </div>
    )
}

export default LoadingComponent;
