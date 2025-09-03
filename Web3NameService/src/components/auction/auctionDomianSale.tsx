import "@/style/components/auction/auctionDomianSale.css"
import LargeRound from "../common/show/largeRound";
import { useTranslation } from "react-i18next";
import { startWithTop } from "../index/browseDomain/functionalComponents/startWithTop";


const AuctionDomain = () => {

    const {t} = useTranslation()

    startWithTop()

    return(
        <div className="AuctionDomain">
            <LargeRound />
            <div className="auctiondomaincontent">
                <div className="auctiondomaincontenttitle">
                    <h1>{t("resale")}</h1>
                    <h2>{t("getother")}</h2>
                </div>
            </div>
        </div>
    )
}

export default AuctionDomain;
