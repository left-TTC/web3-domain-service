import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launchRootDomain.css"
import LaunchFeeSettle from "./launch/launchFeeSettle";

import card from "/background/file/card.png"

interface LaunchRootDomainProps {
    showLaunchSettle: boolean,
    openLanunchSettleAndRecordPosition: () => void;
    backFn: () => void,
    setShowLaunchSettle: React.Dispatch<React.SetStateAction<boolean>>
}

const LaunchRootDomain: React.FC<LaunchRootDomainProps> = ({
    showLaunchSettle, openLanunchSettleAndRecordPosition, backFn, setShowLaunchSettle
}) => {

    const {t} = useTranslation()

    return(
        <div className="launchroot">
            <div className="launchnewdomain">
                <div className="detailandlaunchbu">
                    <h1>{t("launchrootdetail")}</h1>
                    <button className="launchnewbu pixel" onClick={() => openLanunchSettleAndRecordPosition()}>
                        <h1>{t("launch")}</h1>
                    </button>
                </div>
                <img src={card} className="cardback" />
            </div>

            {showLaunchSettle &&
                <LaunchFeeSettle 
                    backToChooseRoot={() => {backFn(); setShowLaunchSettle(false)}}
                />
            }
        </div>
    )
}

export default LaunchRootDomain;

