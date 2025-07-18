

import "@/style/components/auction/auctioningDomain/auctioningDomainOmit.css"


import mushroom from "@/assets/mushroomgreen.svg"
import { useTranslation } from "react-i18next"

const AuctioningDomainOmit = () => {

    const {t} = useTranslation()

    return(
        <div className="auctiondomainomit">
            <div className="auctionphone">
                
            </div>
            <div className="auctionomittitle">
                <h1>{t("bought")}</h1>
                <h2>{t("tryauction")}</h2>
            </div>
        </div>
    )
}

export default AuctioningDomainOmit;