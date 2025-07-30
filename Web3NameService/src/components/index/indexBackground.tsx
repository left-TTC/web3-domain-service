

import "@/style/components/index/indexBackground.css"
import Mountain from "./backgroud/mountain"
import { useEffect, useRef } from "react"
import { animate } from "animejs"

const IndexBackground = () => {

    const bg = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const animateScroll = () => {
            const scrollTop = window.scrollY;
            
            const start = 0;
            const end = 700;

            let progress = (scrollTop - start) / (end - start);
            progress = Math.min(Math.max(progress, 0), 1);

            if(bg.current){
                animate(bg.current, {
                    opacity: 1- progress,
                    duration: 0,
                })
            }
        }

        window.addEventListener("scroll", animateScroll);
        return () => window.removeEventListener("scroll", animateScroll);
    }, [])

    return(
        <div className="indexbg" ref={bg}>
            <Mountain />
        </div>
    )
}

export default IndexBackground