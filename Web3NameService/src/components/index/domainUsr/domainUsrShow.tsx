

import "@/style/components/index/domainUsr/domainUsrShow.css"
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DomainUsrShow = () => {

    const {t} = useTranslation()

    const [domainHolder, setDomainHolder] = useState(115);
    const [domainNumber, setDomainNumber] = useState(211);
    const [rootDomain, setRootDomain] = useState(12);

    const [ifShowTheData, setIfShowTheData] = useState(false)

    let showBlock;
    
    ifShowTheData ? (
        showBlock = (
            <div className="domainusrshow">
                <div className="domainusrshowcontent">
                    <h1>{domainHolder}K</h1>
                    <h2>Domain Holders</h2>
                </div>
                <div className="domainusrshowdiliver"/>
                <div className="domainusrshowcontent">
                    <h1>{domainNumber}K</h1>
                    <h2>Registered Domains</h2>
                </div>
                <div className="domainusrshowdiliver"/>
                <div className="domainusrshowcontent">
                    <h1>{rootDomain}</h1>
                    <h2>Root Domains</h2>
                </div>
            </div>
        )
    ) : (
        showBlock = (
            <div className="domainusrshow domainusrshowwelcome">
                <h1>{t("justcreate")}</h1>
            </div>
        )
    )

    return showBlock
}

export default DomainUsrShow;
