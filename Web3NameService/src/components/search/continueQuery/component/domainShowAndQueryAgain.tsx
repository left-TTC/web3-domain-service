
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
import { DomainState } from "@/utils/functional/common/time/getDomainTimeState";
import { useNavigate } from "react-router-dom";
import { useCommonToast } from "@/provider/fixedToastProvider/commonToastProvider";

export interface DomainShowAndQueryAgainProps {
    domainInfo: NameRecordState | null,
    ifDomainInfoLoaded: boolean,
    domainName: string,
    domainPrice: number | null,
    domainSaleState: DomainState | null,
}

const DomainShowAndQueryAgain: React.FC<DomainShowAndQueryAgainProps> = ({
    ifDomainInfoLoaded, domainInfo, domainName, domainPrice, domainSaleState
}) => {

    const {t} = useTranslation()

    const navigate = useNavigate()
    const naviToOrthers = (key: string) => {
        navigate(`/usr/${key}`)
    }

    const { showToast } = useCommonToast()

    const [domainFeatures, setDomainFeatures] = useState<string[]>([])
    useEffect(() => {
        console.log("domainName chanege:", domainName)
        const fetchFeatures = async() => {
            setDomainFeatures(await getDomainFeatures(
                cutDomain(domainName), domainInfo?.customPrice.toNumber(), domainSaleState, t
            ))
        }

        fetchFeatures()
    }, [domainName])

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
                            <h1>{(domainPrice! /1e9).toFixed(4)} SOL</h1>
                        </div>
                    </div>
                    {domainInfo? (
                        <div className="ownerShowword">
                            <h1>{t("ownedby")}</h1>
                            <h2 onClick={() => {
                                naviToOrthers(domainInfo.owner.toBase58())
                            }}>{cutString(domainInfo.owner.toBase58(), 8, 8, "...")}</h2>
                        </div>
                    ):(
                        <div className="ungis"
                            onClick={() => {
                                showToast(t("ungister"), t("unregis"), 20000)
                            }}
                        >
                            <h1>{t("unregis")}</h1>
                        </div>
                    )}
                    <div className="domainFeatures">
                        {domainFeatures.map((feature, index) => (
                            <div className="featurewords" key={index}>
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
