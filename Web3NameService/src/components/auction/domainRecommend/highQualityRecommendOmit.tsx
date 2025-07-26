
import "@/style/components/auction/highQualityRecommend/highQualityRecommendOmit.css"



import mushroom from "@/assets/mushroom.svg"
import refresh from "@/assets/refresh.svg"
import go from "@/assets/go.svg"

import whiteshop from "@/assets/whiteshop.svg"

import { useTranslation } from "react-i18next"
import RecommendDomainShow from "@/components/common/show/recommendDomainShow"

const HighQualityDomainRecommendOmit = () => {

    const {t} = useTranslation()

    const testDomain = ["a.web3", "b.web3" ]

    return(
        <div className="domainrecommendomit">
            <div className="omitset">
                <div className="omitsetitle">
                    <img src={mushroom} className="mushroom"/>
                    <h1>{t("redommend")}</h1>
                </div>
                <div className="omitsetfunction">
                    <button className="omitsetrefresh">
                        <img src={refresh} style={{width:"20px"}} />
                        <h1>{t("refresh")}</h1>
                    </button>
                    <button className="omitsetrefresh">
                        <img src={whiteshop} style={{width:"30px"}} />
                        <h1>{t("cart")}</h1>
                    </button>
                </div>
            </div>
            <div className="recommendblockomit">
                <div className="recommendthree">
                    {testDomain.map(domain => (
                        <RecommendDomainShow showDomain={domain} />
                    ))}
                </div>
                <div className="getMore">
                    <h1>{t("seemore")}</h1>
                    <button className="getmorerecommend pixel">
                        <h1>{t("browser")}</h1>
                        <img src={go} style={{width:'25px'}} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HighQualityDomainRecommendOmit;
