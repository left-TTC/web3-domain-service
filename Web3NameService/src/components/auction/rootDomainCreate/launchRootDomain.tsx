import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launchRootDomain.css"


const LaunchRootDomain = () => {

    const {t} = useTranslation()

    

    return(
        <div className="launchroot">
            <div className="launchanimation">

            </div>
            <div className="launchnewdomain">
                <h1>{t("launchnew")}</h1>
                <button className="launchnewbu pixel">
                    <h1>{t("launch")}</h1>
                </button>
            </div>
        </div>
    )
}

export default LaunchRootDomain;

