
import "@/style/components/auction/highQualityRecommend/highQualityRecommendOmit.css"


import light from "@/assets/lighting.svg"
import nostart from "@/assets/starwhite.svg"
import cart from "@/assets/shop.svg"
import coin from "@/assets/coin.svg"
import mushroom from "@/assets/mushroom.svg"
import refresh from "@/assets/refresh.svg"
import go from "@/assets/go.svg"
import star from "@/assets/starok.svg"
import whiteshop from "@/assets/whiteshop.svg"

import { useTranslation } from "react-i18next"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { useAtom } from "jotai"
import { addressStringListAtom } from "@/utils/functional/common/storage/storageStarDomain"

const HighQualityDomainRecommendOmit = () => {

    const {t} = useTranslation()
    const {publicKey: wallet} = useWalletEnv()

    const walletAddress = wallet?.toBase58() || ""

    const [starDomains, setStarDomains] = useAtom(addressStringListAtom(walletAddress));

    const testDomain = ["a.web3", "b.web3", "c.web3", ]

    const getDomainValue = (domain: string) => {

        return domain.length
    }

    const ifDomainStar = (domain: string) => {
        if(starDomains.includes(domain))return true
        return false
    }

    const handleStarClick = (domainName: string) => {
        if (!wallet) return;

        if (ifDomainStar(domainName)) {
            setStarDomains(prev => prev.filter(d => d !== domainName));
        } else {
            setStarDomains(prev => [...prev, domainName]);
        }
    };

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
                        <div className="showdomainOmit pixel">
                            <button className="startcontentomit" onClick={() => handleStarClick(domain)}>
                                <img src={ifDomainStar(domain)? star : nostart} className="star" />
                            </button>
                            <h1>{domain}</h1>
                            <div className="buyoraddtocart">
                                <button className="quickBuy showOnhover pixel">
                                    <img src={light} className="quickbuylight" />
                                    <h1>{t("quickbuy")}</h1>
                                </button>
                            
                                <div className="addtocart pixel">
                                    <div className="cartpriceshow">
                                        <img src={coin} className="priceCoin" />
                                        <h1>${getDomainValue(domain)}</h1>
                                    </div>
                                    <button className="addtocartbutton pixel">
                                        <img src={cart} className="quickbuycart" />
                                        <h1>{t("add")}</h1>
                                    </button>
                                </div>
                            </div>
                        </div>
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
