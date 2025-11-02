
import close from "@/assets/exit.svg"
import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface CommonToastProps{
    message: string,
    title: string,
    onClose: () => void,
    onConfirm?: () => void,
    confirmName?: string,
    duration: number,
}

const CommonToast: React.FC<CommonToastProps> = ({
    message, title, onClose, onConfirm, confirmName, duration
}) => {

    const toatsRef = useRef<HTMLDivElement | null>(null)
    const ined = useRef(false)

    useEffect(() => {
        if(ined.current)return
        if(toatsRef.current){
            ined.current = true
            animate(toatsRef.current, {
                translateX: ["-300%", "-50%"],
                duration: 200,
            })

            setTimeout(() => {
                if(toatsRef.current){
                    animate(toatsRef.current, {
                        translateX: ["-50%", "200%"],
                        duration: 200,
                        onComplete: () => {
                            onClose()
                        }
                    })
                }
            }, duration+1000)
        }
    }, [])

    const outed = useRef(false)
    const animateClose = () => {
        if(outed.current)return
        if(toatsRef.current){
            animate(toatsRef.current, {
                translateX: ["-50%", "200%"],
                duration: 500,
                onComplete: () => {
                    onClose()
                }
            })
        }
    }

    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (toatsRef.current && !toatsRef.current.contains(event.target as Node)) {
                animateClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toatsRef]);


    return(
        <div className="commontoastcontent" ref={toatsRef}>
            <button className="commontoastclose" onClick={() => animateClose()}>
                <img src={close} className="commontransactionclose" />
            </button>
            <h1>{title}:</h1>
            <div className="messageblock">
                <h2>{message}</h2>
            </div>
            {confirmName &&
            <button className="commonToastconfirm" onClick={() => {
                if(onConfirm){
                    onConfirm()
                }else{

                }
            }}>
                <h1>{confirmName}</h1>
            </button>
            }
        </div>
    )
}

export default CommonToast;
