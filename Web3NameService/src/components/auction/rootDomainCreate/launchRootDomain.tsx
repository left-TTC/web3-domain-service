import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launchRootDomain.css"
import { useState } from "react";
import LaunchBlock from "./launch/launchBlock";
import LaunchFeeSettle from "./launch/launchFeeSettle";


const LaunchRootDomain = () => {

    const {t} = useTranslation()

    const [showRootCreatePage, setShowRootCreatePage] = useState(false)
    const [wantCreateRoot, setWantCreateRoot] = useState("")

    const [showLaunchSettle, setShowLaunchSettle] = useState(false)

    return(
        <div className="launchroot">
            <div className="launchanimation">
                <h1>{t("nogoodproject")}</h1>
            </div>
            <div className="launchnewdomain">
                <h1>{t("launchnew")}</h1>
                <button className="launchnewbu pixel" onClick={() => setShowRootCreatePage(true)}>
                    <h1>{t("launch")}</h1>
                </button>
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

