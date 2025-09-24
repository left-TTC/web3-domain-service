import { useTranslation } from "react-i18next";

import "@/style/components/search/continueQuery/components/registerDomainPixel.css"

export interface RegisterDomainPixelProps {
    ifDomainInfoLoaded: boolean,
    openSettlePage: () => void,
}

const RegisterDomainPixel: React.FC<RegisterDomainPixelProps> = ({
    ifDomainInfoLoaded, openSettlePage,
}) => {

    const {t} = useTranslation()

    return(
        <div className={`showtheaccountInfo ${ifDomainInfoLoaded? "":"infoloadinganimate"}`}>
             {ifDomainInfoLoaded &&
             <div className="showcoountinfocontent">
                <div className="domainattention">
                    <h1>{t("attention")}:</h1>
                    <h2>{t("domainattention")}</h2>
                </div>
                <button className="confrimcreatedomain pixel" onClick={() => openSettlePage()}>
                    <h1>{t("confirm")}</h1>
                </button>
             </div>
             }
        </div>
    )
}

export default RegisterDomainPixel;
