import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launchRootDomain.css"
import { useState } from "react";
import LaunchBlock from "./launch/launchBlock";
import LaunchFeeSettle from "./launch/launchFeeSettle";

import card from "/public/background/file/card.png"


const LaunchRootDomain = () => {

    const {t} = useTranslation()

    const [showRootCreatePage, setShowRootCreatePage] = useState(false)
    const [wantCreateRoot, setWantCreateRoot] = useState("")

    const [showLaunchSettle, setShowLaunchSettle] = useState(false)

    return(
        <div className="launchroot">
            <div className="launchnewdomain">
                <div className="detailandlaunchbu">
                    <h1>{t("launchrootdetail")}</h1>
                    <button className="launchnewbu pixel" onClick={() => setShowRootCreatePage(true)}>
                        <h1>{t("launch")}</h1>
                    </button>
                </div>
                <img src={card} className="cardback" />
            </div>

            {showRootCreatePage &&
                <LaunchBlock 
                    closeRootCreate={() => setShowRootCreatePage(false)} 
                    wantCreateRoot={wantCreateRoot}
                    setWantCreateRoot={setWantCreateRoot}
                    openLaunchFeeSettle={() => setShowLaunchSettle(true)}
                />
            }

            {showLaunchSettle &&
                <LaunchFeeSettle 
                    backToChooseRoot={() => setShowLaunchSettle(false)}
                    wantCreateName={wantCreateRoot}
                />
            }
        </div>
    )
}

export default LaunchRootDomain;

