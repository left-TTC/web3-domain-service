
import "@/style/components/auction/inAuctionDomain/auctionDomainRecommend.css"

import domain from "@/assets/Domain.svg"
import { useTranslation } from "react-i18next"
import TheAuctionDomainRecommend, { RecommendType } from "./auctoinParts/inAuctionDomainsRecommend"
const AuctionDomainRecommend = () => {

    const {t} = useTranslation()

    return(
        <div className="auctiondomainsrecommend">
            <div className="domainsvg">
                <div className="domainsvgbl">
                    <img src={domain} className="domainsvgi" />
                </div>
                <h1>{t("domain")}</h1>
            </div>
            <div className="auctiondomainrecommendcon">
                <TheAuctionDomainRecommend
                    componentsType={RecommendType.Now}
                />
                <TheAuctionDomainRecommend
                    componentsType={RecommendType.History}
                />
            </div>
        </div>
    )
}

export default AuctionDomainRecommend;
