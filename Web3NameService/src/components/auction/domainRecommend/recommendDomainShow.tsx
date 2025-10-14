import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { addressStringListAtom } from "@/utils/functional/common/storage/storageStarDomain";
import { useAtom } from "jotai";

import nostart from "@/assets/starwhite.svg"
import coin from "@/assets/coin.svg"
import star from "@/assets/starok.svg"
import { useTranslation } from "react-i18next";

import "@/style/components/auction/domainRecommend/recommendDomainShow.css"
import { useNavigate } from "react-router-dom";
import { useStarDomains } from "./bar/tool/useStarDomains";

export interface RecommendDomainShowProps {
    showDomain: string,
    domainDecimal: number
}

const RecommendDomainShow: React.FC<RecommendDomainShowProps> = ({
    showDomain, domainDecimal
}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const {publicKey: wallet} = useWalletEnv()
    const {starDomains, setStarDomains} = useStarDomains()

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

    const turnToSearchPage = () => {
        navigate("/search", {
            state: {
                queryingDomain: showDomain,
                ifRecommendPage: true,
            }
        })
    }

    return(
        <div className="showdomainOmit pixel">
            <button className="startcontentomit" onClick={() => handleStarClick(showDomain)}>
                <img src={ifDomainStar(showDomain)? star : nostart} className="star" />
            </button>
            <div className="domiannamebl">
                <h1>{showDomain}</h1>
            </div>
            <div className="buyoraddtocart">
            
                <div className="addtocart pixel">
                    <div className="cartpriceshow">
                        <img src={coin} className="priceCoin" />
                        <h1>${(domainDecimal/1e6).toFixed(2)}</h1>
                    </div>
                    <button className="addtocartbutton pixel" onClick={() => {turnToSearchPage()}}>
                        <h1>{t("start")}</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RecommendDomainShow;