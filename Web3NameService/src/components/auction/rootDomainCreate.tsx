

import "@/style/components/auction/rootDomainCreate.css"
import { useTranslation } from "react-i18next"
import FundingDomain from "./rootDomainCreate/fundingDomain"
import LaunchRootDomain from "./rootDomainCreate/launchRootDomain"

export default function RootDomainCreate(){

    const {t} = useTranslation()

    return(
        <div className="RootDomainCreate">
            <FundingDomain /> 
            <LaunchRootDomain />
        </div>
    )
}