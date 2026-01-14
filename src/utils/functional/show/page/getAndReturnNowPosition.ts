


export function getAndReturnNowPosition(
    ifSmooth: boolean
): () => void{
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    console.log(scrollY)

    return function scrollBack() {
        console.log("back position")
        window.scrollTo({
            top: scrollY,
            left: scrollX,
            behavior: ifSmooth ? "smooth" : "instant",
        });
    };
}