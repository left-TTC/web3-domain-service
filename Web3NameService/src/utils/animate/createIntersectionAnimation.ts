


export function createIntersectionAnimation(
    animation: () => void,
    flipAnimation: () => void | null,
    //please add by yourself
    animateRef: HTMLDivElement | HTMLHeadingElement | null,
    lastYRef: React.RefObject<number | null>,
) {
    if(!animateRef)return

    const observe = new IntersectionObserver (
        ([entry]) => {
            const currentY = entry.boundingClientRect.y;
            const prevY = lastYRef.current;
            lastYRef.current = currentY;

            //scroll down
            if(entry.isIntersecting && entry.intersectionRatio >= 0.6){
                if(prevY != null && currentY < prevY){
                    animation()
                }
            }

            if(!entry.isIntersecting || entry.intersectionRatio < 0.6){
                if (prevY !== null && currentY > prevY) {
                    if(flipAnimation != null){
                        flipAnimation()
                    }
                }
            }
        },
        {
            threshold: 0.6
        }
    )

    observe.observe(animateRef)
    return observe
}