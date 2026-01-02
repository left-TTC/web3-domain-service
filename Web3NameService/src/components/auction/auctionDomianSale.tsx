import "@/style/components/auction/auctionDomianSale.css"
import LargeRound from "../common/show/largeRound";
import { useTranslation } from "react-i18next";
import { startWithTop } from "../index/browseDomain/functionalComponents/startWithTop";
// import { useState } from "react";
import AuctionDomainRecommend from "./inAuctionDomain/auctionDomainRecommend";


const AuctionDomain = () => {

    const {t} = useTranslation()

    startWithTop()

    // Max length: 20
    // const [atAuctionDomains, setAtAuctionDomains] = useState<string[]>([])
    // const [mostValuableDomains, setMostValuableDomains] = useState<string[]>([])

    return(
        <div className="AuctionDomain">
            <LargeRound className="AuctionDomainround"/>
            <div className="auctiondomaincontent">
                <div className="auctiondomaincontenttitle">
                    <h1>{t("auctionhouse")}</h1>
                    <h2>{t("getother")}</h2>
                </div>
                <AuctionDomainRecommend

                />
            </div>
        </div>
    )
}

export default AuctionDomain;
