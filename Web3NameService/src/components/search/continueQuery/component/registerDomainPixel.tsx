import { useTranslation } from "react-i18next";

import "@/style/components/search/continueQuery/components/registerDomainPixel.css"
import { DomainState } from "@/utils/functional/common/time/getDomainTimeState";
import { cutString } from "@/utils/functional/common/cutString";

export interface RegisterDomainPixelProps {
    ifDomainInfoLoaded: boolean,
    openSettlePage: () => void,
    domainSaleState: DomainState | null,
}

const RegisterDomainPixel: React.FC<RegisterDomainPixelProps> = ({
    ifDomainInfoLoaded, openSettlePage, domainSaleState
}) => {

    const {t} = useTranslation()

    const returnAttetionContent = () => {
        if(domainSaleState === null) return t("domainattention")
        switch(domainSaleState){
            case DomainState.Auctioning: 
                return t("participate")
            case DomainState.Saling:
                return t("domainattention")
            case DomainState.Settling:
                return t("keep")
            case DomainState.Eroor:
                return "err"
        }
    }

    const returnButtonWord = () => {
        if(domainSaleState === null) return t("confirm")
        switch(domainSaleState){
            case DomainState.Auctioning: 
                return t("joinin")
            case DomainState.Saling:
                return t("confirm")
            case DomainState.Settling:
                return t("waiting")
        }
    }

    return(
        <div className={`showtheaccountInfo ${ifDomainInfoLoaded? "":"infoloadinganimate"}`}>
             {ifDomainInfoLoaded &&
                <div className="showcoountinfocontent">
                    <div className="domainattention">
                        <h1>{t("attention")}:</h1>
                        <h2>{cutString(returnAttetionContent(), 100, 1, "...")}</h2>
                    </div>
                    <button 
                        className={`confrimcreatedomain  ${domainSaleState===DomainState.Settling? "cantconfirm" : "pixel"}`} 
                        onClick={() => openSettlePage()}
                    >
                        <h1>{returnButtonWord()}</h1>
                    </button>
                </div>
             }
        </div>
    )
}

export default RegisterDomainPixel;
