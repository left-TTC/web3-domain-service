import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/functional/back.css"

import back from "@/assets/backwhite.svg"


export interface BackProps {
    backFun: () => void,
}

const Back: React.FC<BackProps> = ({
    backFun
}) => {

    const {t} = useTranslation()

    return(
        <button className="backtoaddfuel" onClick={backFun}>
            <img src={back} className="backfuelimg" />
            <h1>{t("back")}</h1>
        </button>
    )
}


export default Back;