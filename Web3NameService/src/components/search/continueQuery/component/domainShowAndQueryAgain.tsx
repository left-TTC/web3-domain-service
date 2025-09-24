
import type React from "react";


import "@/style/components/search/continueQuery/components/domainShowAndQueryAgain.css"
import LoadingComponent from "./functional/loadingComponent";
import QueryAgainComponent from "./functional/queryAgainComponent";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cutString } from "@/utils/functional/common/cutString";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getDomainFeatures } from "@/utils/functional/domain/getDomainFeatures";

export interface DomainShowAndQueryAgainProps {
    domainInfo: NameRecordState | null,
    ifDomainInfoLoaded: boolean,
    domainName: string,
    domainPrice: number | null,
}

const DomainShowAndQueryAgain: React.FC<DomainShowAndQueryAgainProps> = ({
    ifDomainInfoLoaded, domainInfo, domainName, domainPrice
}) => {

    const {t} = useTranslation()

    const [domainFeatures, setDomainFeatures] = useState<string[]>([])
    useEffect(() => {
        setDomainFeatures(getDomainFeatures(cutDomain(domainName), domainInfo?.customPrice.toNumber()))
    }, [])

    return(
        <div className="domainandquery">
            <h1>{t("Result")}:</h1>
            {ifDomainInfoLoaded ?
                (
                <div className="domainInfo">
                    <div className="domainnameandprice">
                        <div className="domainname">
                            <h1>{cutDomain(domainName)[0]}</h1>
                            <h2>.{cutDomain(domainName)[1]}</h2>
                        </div>
                        <div className="showPrice">
                            <h1>$ {(domainPrice! / 1e6).toFixed(2)}</h1>
                        </div>
                    </div>
                    {domainInfo? (
                        <h1>Owned by 
                            <a href="#">{cutString(domainInfo.owner.toBase58(), 5, 5, "...")}</a>
                        </h1>
                    ):(
                        <div className="ungis">
                            <a href="#">{t("unregis")}</a>
                        </div>
                    )}
                    <div className="domainFeatures">
                        {domainFeatures.map((feature, index) => (
                            <div className="feature" key={index}>
                                <h1>{feature}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            ):
            (
                <LoadingComponent />
            )
            } 
            <QueryAgainComponent />
            
        </div>
    )
}

export default DomainShowAndQueryAgain;
