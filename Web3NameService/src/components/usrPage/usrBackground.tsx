import "@/style/components/usrPage/usrBackground.css"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import search from "@/assets/query.svg"


export interface UsrBackgroundProps{
    domainNumber: number,
    openDomainQueryPage: () => void,
}

const UsrBackground: React.FC<UsrBackgroundProps> = ({
    domainNumber, openDomainQueryPage
}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const [backContent, setBackContent] = useState<React.ReactNode | null>(null)

    const openAndQueryDomain = () => {
        openDomainQueryPage();
        navigate("/#");     
    } 

    useEffect(() => {
        if(domainNumber === 0){
            return setBackContent(
                <div className="havenotdomainusr">
                    <h1>{t("getfrist")}</h1>
                    <button className="getfristbu" onClick={() => openAndQueryDomain()}>
                        <h1>search domains</h1>
                        <img className="usrsearchdomain" src={search} />
                    </button>
                </div>
            )
        }
        setBackContent(
            <div className="haveDomainusr">

            </div>
        )
    }, [domainNumber])

    return(
        <div className="usrback">
            {backContent}
        </div>
    )
}

export default UsrBackground;
