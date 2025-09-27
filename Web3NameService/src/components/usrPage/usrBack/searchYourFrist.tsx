import { useTranslation } from "react-i18next";

import search from "@/assets/query.svg"
import { useNavigate } from "react-router-dom";
import type React from "react";

import "@/style/components/usrPage/usrBack/searchYourFrist.css"


export interface SearchYourFristProps{
    openDomainQueryPage: () => void
}

const SearchYourFrist: React.FC<SearchYourFristProps> = ({
    openDomainQueryPage
}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const openAndQueryDomain = () => {
        openDomainQueryPage();
        navigate("/#");     
    } 

    return(
        <div className="havenotdomainusr">
            <h1>{t("getfrist")}</h1>
            <button className="getfristbu" onClick={() => openAndQueryDomain()}>
                <h1>search domains</h1>
                <img className="usrsearchdomain" src={search} />
            </button>
        </div>
    )
}

export default SearchYourFrist;
