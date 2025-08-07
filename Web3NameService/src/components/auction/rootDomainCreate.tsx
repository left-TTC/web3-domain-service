

import "@/style/components/auction/rootDomainCreate.css"
import { useTranslation } from "react-i18next"
import LaunchRootDomain from "./rootDomainCreate/launchRootDomain"

import factory from "@/assets/factory.svg"
import SailingShip from "./rootDomainCreate/sailingShip"
import LargeRound from "../common/show/largeRound"

export default function RootDomainCreate(){

    const {t} = useTranslation()

    return(
        <div className="RootDomainCreate">
            <LargeRound className="rootcreateround"/>
            <div className="rootdomaincreatecontent">
                <div className="rootfactorytitle">
                    <h1>{t("rootdomainfac")}</h1>
                    <img src={factory} className="factoryicon" />
                </div>
                <div className="subrootfactorytitle">
                    <h1>{t("lanunchnew")}</h1>
                </div>
                <div className="sailt">
                    <h1>{t("supportnow")}</h1>
                </div>
                <SailingShip />
                <div className="lanunchdomainor">
                    <h1>or</h1>
                </div>
                <div className="launcht">
                    <h1>{t("launchnew")}</h1>
                </div>
                <LaunchRootDomain />
            </div>
        </div>  
    )
}