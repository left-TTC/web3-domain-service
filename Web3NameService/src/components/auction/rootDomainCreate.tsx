

import "@/style/components/auction/rootDomainCreate.css"
import { useTranslation } from "react-i18next"
import LaunchRootDomain from "./rootDomainCreate/launchRootDomain"

import factory from "@/assets/factory.svg"
import SailingShip from "./rootDomainCreate/sailingShip"

export default function RootDomainCreate(){

    const {t} = useTranslation()

    return(
        <div className="RootDomainCreate">
            <div className="rootdomaincreatecontent">
                <div className="rootfactorytitle">
                    <h1>{t("rootdomainfac")}</h1>
                    <img src={factory} className="factoryicon" />
                </div>
                <div className="subrootfactorytitle">
                    <h1>{t("lanunchnew")}</h1>
                </div>
                <SailingShip />
                <LaunchRootDomain />
            </div>
        </div>  
    )
}