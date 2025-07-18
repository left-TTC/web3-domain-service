import AuctioningDomainOmit from "@/components/auction/auctioningDomain/auctioningDomainOmit";
import HighQualityDomainRecommendOmit from "@/components/auction/highQualityRecommend/highQualityRecommendOmit";
import RootDomainCreateOmit from "@/components/auction/rootDomainCreate/rootDomainCreateOmit";

import "@/style/pages/auction.css"

export default function Auction(){



    return(
        <div className="auctionpage">
            <HighQualityDomainRecommendOmit />
            <AuctioningDomainOmit />
            <RootDomainCreateOmit />
        </div>
    )
}