import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { addressStringListAtom } from "@/utils/functional/common/storage/storageStarDomain";
import { useAtom } from "jotai";

import light from "@/assets/lighting.svg"
import nostart from "@/assets/starwhite.svg"
import cart from "@/assets/cart.svg"
import coin from "@/assets/coin.svg"
import star from "@/assets/starok.svg"
import { useTranslation } from "react-i18next";

import "@/style/components/auction/domainRecommend/recommendDomainShow.css"

export interface RecommendDomainShowProps {
    showDomain: string
}

const RecommendDomainShow: React.FC<RecommendDomainShowProps> = ({
    showDomain
}) => {

    const {t} = useTranslation()

    const getDomainValue = (domain: string) => {

        return domain.length
    }

    const {publicKey: wallet} = useWalletEnv()

    const walletAddress = wallet?.toBase58() || ""

    const [starDomains, setStarDomains] = useAtom<string[]>(addressStringListAtom(walletAddress));

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
        <div className="showdomainOmit pixel">
            <button className="startcontentomit" onClick={() => handleStarClick(showDomain)}>
                <img src={ifDomainStar(showDomain)? star : nostart} className="star" />
            </button>
            <div className="domiannamebl">
                <h1>{showDomain}</h1>
            </div>
            <div className="buyoraddtocart">
                <button className="quickBuy showOnhover pixel">
                    <img src={light} className="quickbuylight" />
                    <h1>{t("quickbuy")}</h1>
                </button>
            
                <div className="addtocart pixel">
                    <div className="cartpriceshow">
                        <img src={coin} className="priceCoin" />
                        <h1>${getDomainValue(showDomain)}</h1>
                    </div>
                    <button className="addtocartbutton pixel">
                        <img src={cart} className="quickbuycart" />
                        <h1>{t("add")}</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecommendDomainShow;