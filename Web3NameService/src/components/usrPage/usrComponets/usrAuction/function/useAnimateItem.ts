import { animate } from "animejs"
import { useEffect, useRef, useState } from "react"



export function useAnimateItem(
    showTheBills: boolean,
    setShowTheBills: React.Dispatch<React.SetStateAction<boolean>>,
    itemsRef: React.RefObject<HTMLDivElement | null>,
    arrowRef: React.RefObject<HTMLDivElement | null>
){

    const [animateClose, setAnimateClose] = useState(false)
    const itemHeight = useRef(0)
    const recordedHeight = useRef(false)

    useEffect(() => {
        if(itemsRef.current && !recordedHeight.current){
            itemHeight.current = itemsRef.current.clientHeight
            recordedHeight.current = true
        }
    }, [itemsRef.current])

    const animating = useRef(false)
    useEffect(() => {
        if(!animating.current){
            if(animateClose && recordedHeight.current){
                if(itemsRef.current && arrowRef.current){
                    animating.current = true
                    animate(itemsRef.current, {
                        height: [itemHeight.current , 0],
                        duration: 500,
                        onComplete: () => {
                            setAnimateClose(false)
                            setShowTheBills(false)
                            animating.current = false
                        }
                    })
                    animate(arrowRef.current, {
                        rotate: [0, 180],
                        duration: 300,
                    })
                }
            }else if(showTheBills && recordedHeight.current && !animateClose){
                if(itemsRef.current?.clientHeight === 0 && arrowRef.current){
                    animating.current = true
                    animate(itemsRef.current, {
                        height: [0, itemHeight.current],
                        duration: 500,
                        onComplete: () => {
                            animating.current = false
                        }
                    })
                    animate(arrowRef.current, {
                        rotate: [180, 0],
                        duration: 300,
                    })
                }
            }
        }
    }, [animateClose, showTheBills, itemHeight.current])

    const clinckSettle = () => {
        if(!animating.current){
            if(showTheBills && !animateClose){
                console.log("close the item")
                setAnimateClose(true)
            }else if(!showTheBills){
                console.log("open item")
                setShowTheBills(true)
            }
        }
    }

    return { clinckSettle }
}