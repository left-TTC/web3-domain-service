import { animate } from "animejs"
import type { OpacityArray } from "./downAnimate"



export function upAnimation(
    animatingRef: HTMLDivElement | null,
    translate: number,
    opacityChange: OpacityArray,
    duration: number,
): () => void {
    if(!animatingRef) return () => {
        console.log("no this ref")
    }

    const animationUp = () => {
        animate(animatingRef, {
            translateY: [translate, 0],
            opacity: [opacityChange.Min, opacityChange.Max],
            duration: duration,
        })
    }
    
    return animationUp
}