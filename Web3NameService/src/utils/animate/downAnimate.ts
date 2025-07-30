import { animate } from "animejs"


export interface OpacityArray{
    Min: number,
    Max: number,
}

export function downAnimation(
    animatingRef: HTMLDivElement | null,
    translate: number,
    opacityChange: OpacityArray,
    duration: number,
): () => void {
    if(!animatingRef) return () => {
        console.log("no this ref")
    }

    const animationDown = () => {
        animate(animatingRef, {
            translateY: [0, translate],
            opacity: [opacityChange.Max, opacityChange.Min],
            duration: duration,
        })
    }
    
    return animationDown
}