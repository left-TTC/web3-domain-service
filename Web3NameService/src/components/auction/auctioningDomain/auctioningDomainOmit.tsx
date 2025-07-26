

import AuctioningTalk from "@/components/auction/auctioningDomain/auctioningTalk"
import "@/style/components/auction/auctioningDomain/auctioningDomainOmit.css"

import { useTranslation } from "react-i18next"

const AuctioningDomainOmit = () => {

    const {t} = useTranslation()

    

    

    return(
        <div className="auctiondomainomit">
            <AuctioningTalk />
            <div className="gotoauction">
                <h1>{t("auctionhouse")}</h1>
                <button className="gotoauctionbutton pixel">
                    <h1>{t("trynow")}</h1>
                </button>
            </div>
        </div>
    )
}

export default AuctioningDomainOmit;