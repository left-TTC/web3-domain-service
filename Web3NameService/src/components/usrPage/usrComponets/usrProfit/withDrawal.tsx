
import "@/style/components/usrPage/usrComponents/usrProfit/withDrawal.css"

import profit from "@/assets/profit.svg"
import volume from "@/assets/volume.svg"
import { useEffect, useState } from "react"
import Extract from "./extractPage/extract"
import { useTranslation } from "react-i18next"

interface WithDrawalProps {
    usrProfit: number | null,
    usrVolume: number | null,
}

const WithDrawal: React.FC<WithDrawalProps> = ({
    usrProfit, usrVolume
}) => {

    const {t} = useTranslation()

    const [canExtract, setCanExtract] = useState(true)
    const [showExtract, setShowExtract] = useState(false)

    useEffect(() => {
        if(!usrProfit){
            return setCanExtract(false)
        }else setCanExtract(true)
    }, [])

    return (
        <div className="profitwithdrawal">
            <div className="profitandvolume">
                <div className="profitShow">
                    <div className="profitimgcon">
                        <img src={profit} className="profiticon" />
                    </div>
                    <div className="profitwordcon">
                        <h1>{t("income")}: </h1>
                        <h2>{usrProfit? `${(usrProfit / 1e9).toFixed(4)} SOL`:"0"}</h2>
                    </div>
                    <button 
                        className={`extractbu ${!canExtract && "cannotextract"}`}
                        onClick={() => setShowExtract(true)}
                    >
                        <h1>{t("extract")}</h1>
                    </button>
                </div>
                <div className="profitwithdrawalline" />
                <div className="profitShow">
                    <div className="profitimgcon">
                        <img src={volume} className="volumeicon" />
                    </div>
                    <div className="profitwordcon">
                        <h1>{t("performance")}: </h1>
                        <h2>{usrVolume? `${(usrVolume / 1e9).toFixed(4)} SOL`:"0"}</h2>
                    </div>
                    <button 
                        className={`extractbu`}
                    >
                        <h1>{t("check")}</h1>
                    </button>
                </div>
                <div className="profitwithdrawalline" />
            </div>

            {showExtract &&
                <Extract
                    totalSOL={usrProfit!}
                    backFn={() => setShowExtract(false)}
                />
            }
        </div>
    )
}


export default WithDrawal;
