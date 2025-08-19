import "@/style/components/auction/auctionDomianSale.css"
import LargeRound from "../common/show/largeRound";
import { useTranslation } from "react-i18next";


const AuctionDomain = () => {

    const {t} = useTranslation()

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
