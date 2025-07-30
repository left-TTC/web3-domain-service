import "@/style/components/auction/domainRecommend.css"
import { useTranslation } from "react-i18next"



import FilterButton from "./domainRecommend/filterButton"
import SortButton from "./domainRecommend/sortButton"
import RefreshButton from "./domainRecommend/refreshButton"
import EyeBack from "./domainRecommend/eyeBack"
import CartButton from "./domainRecommend/cartButton"

export default function DomainRecommend(){

    const {t} = useTranslation()

    return(
        <div className="recommendpage">
            <div className="recommendpagecontent">
                <div className="recommendpagetitle">
                    <h1>{t("domainrecommend")}</h1>
                    <h2>{t("seziefuture")}</h2>
                </div>
                <div className="recommendpagebar">
                    <div className="recommendbarleft">
                        <FilterButton />
                        <SortButton />
                    </div>
                    <div className="recommendright">
                        <EyeBack />
                        <RefreshButton />
                        <CartButton />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}