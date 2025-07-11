

import "@/style/components/index/browserDomain/browserDomain.css"
import { useTranslation } from "react-i18next"

import query from "@/assets/query.svg"

export interface BrowserDomainProps{
    setQueryPage: React.Dispatch<React.SetStateAction<boolean>>
}

const BrowserDomain: React.FC<BrowserDomainProps> = ({setQueryPage}) => {

    const {t} = useTranslation();

    return(
        <div className="browserdomain">
            <div className="browserDomainTitle">
                <h1>{t("web3domain")}</h1>
                <h2>{t("permanent")}</h2>
            </div>
            <div className="browserDomainModule">
                <div className="browserdomainminibox" onClick={() => setQueryPage(true)}>
                    <h1>{t("startquery")}</h1>
                    <button className="browerdomainQueryBox">
                        <img src={query} className="browserdomainquericon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BrowserDomain;