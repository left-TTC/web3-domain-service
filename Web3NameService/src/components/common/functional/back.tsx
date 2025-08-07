import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/functional/back.css"

import back from "@/assets/backwhite.svg"


export interface BackProps {
    backFun: () => void,
    className?: string,
}

const Back: React.FC<BackProps> = ({
    backFun, className
}) => {

    const {t} = useTranslation()

    return(
        <button className={`backtoLastPage ${className}`} onClick={backFun}>
            <img src={back} className="backtoLastPageimg" />
            <h1>{t("back")}</h1>
        </button>
    )
}


export default Back;