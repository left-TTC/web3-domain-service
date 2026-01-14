
import array from "@/assets/arrrrray.svg"
import { animate } from "animejs";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export interface OptionalButtonProps {
    showMoreOrLess: () => void;
    moreOrLess: boolean
}

const OptionalButton: React.FC<OptionalButtonProps> = ({
    showMoreOrLess, moreOrLess
}) => {

    const {t} = useTranslation()

    const arrayRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if(moreOrLess){
            if(!arrayRef.current)return
            animate(arrayRef.current, {
                rotate: "180deg",
                duration: 300
            })
        }else{
            if(!arrayRef.current)return
            animate(arrayRef.current, {
                rotate: "0deg",
                duration: 300
            })
        }
    }, [moreOrLess])

    return(
        <div className="optionalwallet">
            <button className="optionalwalletbu" onClick={() => showMoreOrLess()}>
                {moreOrLess? 
                (<h1>{t("lessop")}</h1>)
                :
                (<h1>{t("moreop")}</h1>)}
                <img src={array} className="optionalarray" ref={arrayRef}/>
            </button>
        </div>
    )
}

export default OptionalButton;
