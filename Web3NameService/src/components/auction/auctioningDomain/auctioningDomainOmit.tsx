

import AuctioningTalk from "@/components/auction/auctioningDomain/auctioningTalk"
import "@/style/components/auction/auctioningDomain/auctioningDomainOmit.css"

import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const AuctioningDomainOmit = () => {

    const {t} = useTranslation()

    const navigate = useNavigate()
    const goToAuctionPage = () => {
        navigate("/auction/resale")
    }

    return(
        <div className="auctiondomainomit">
            <AuctioningTalk />
            <div className="gotoauctionomit">
                <h1>{t("auctionhouse")}</h1>
                <button className="gotoauctionomitbutton pixel" onClick={() => goToAuctionPage()}>
                    <h1>{t("trynow")}</h1>
                </button>   
            </div>
        </div>
    )
}

export default AuctioningDomainOmit;