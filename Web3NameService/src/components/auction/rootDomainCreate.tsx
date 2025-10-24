

import "@/style/components/auction/rootDomainCreate.css"
import { useTranslation } from "react-i18next"
import LaunchRootDomain from "./rootDomainCreate/launchRootDomain"

import factory from "@/assets/factorys.svg"
import SailingShip from "./rootDomainCreate/sailingShip"
import LargeRound from "../common/show/largeRound"
import { useState } from "react"
import { getAndReturnNowPosition } from "@/utils/functional/show/page/getAndReturnNowPosition"

export default function RootDomainCreate(){

    const {t} = useTranslation()

    const [showLaunchSettle, setShowLaunchSettle] = useState(false)
    const [backFn, setBackFn] = useState<()=>void>(()=>{})

    const openLanunchSettleAndRecordPosition = () => {
        setBackFn(() => getAndReturnNowPosition(false))
        setShowLaunchSettle(true)
    }

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
                <div className="supportbl">
                    <div className="sailt">
                        <h1>{t("supportnow")}</h1>
                    </div>
                    <SailingShip 
                        openLanunchSettleAndRecordPosition={openLanunchSettleAndRecordPosition}
                    />
                </div>
                <div className="lanunchdomainor">
                    <h1>or</h1>
                </div>
                <div className="sailt">
                    <h1>{t("launchnew")}</h1>
                </div>
                <LaunchRootDomain 
                    showLaunchSettle={showLaunchSettle}
                    setShowLaunchSettle={setShowLaunchSettle}
                    openLanunchSettleAndRecordPosition={openLanunchSettleAndRecordPosition}
                    backFn={backFn}
                />
            </div>
        </div>  
    )
}