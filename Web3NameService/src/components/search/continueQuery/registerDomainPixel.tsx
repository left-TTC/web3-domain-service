import type { ReverseKeyState } from "@/utils/functional/common/class/reverseKeyState";
import { cutString } from "@/utils/functional/common/cutString";
import { useTranslation } from "react-i18next";

import loading from "@/assets/loading.svg"

import "@/style/components/search/continueQuery/registerDomainPixel.css"

export interface RegisterDomainPixelProps {
    ifDomainInfoLoaded: boolean,
    ifCouldBuy: boolean,
    openSettlePage: () => void,
    queryingDomainInfo: ReverseKeyState | null,
}

const RegisterDomainPixel: React.FC<RegisterDomainPixelProps> = ({
    ifDomainInfoLoaded, ifCouldBuy, openSettlePage, queryingDomainInfo
}) => {

    const {t} = useTranslation()

    return(
        <div className={`showtheaccountInfo ${ifCouldBuy && 'registerbackgroud'}`}>
            {ifDomainInfoLoaded ? 
            (
                ifCouldBuy ? 
                    (
                        <button className="registerbutton pixel" onClick={() => openSettlePage()}>
                            <h1>{t("regitster")}</h1>
                        </button>
                    ): 
                    (
                        <div className="showDomainOwner">
                            <h1>{t("owner")}</h1>
                            <div className="ownerinfo">
                                <div className="usrIcon" />
                                <h1>{cutString(queryingDomainInfo!.ownerAccount.toBase58(), 5, 5, "...")}</h1>
                            </div>
                            <button className="contractowner">
                                <h1>{t("NegotiatePurchase")}</h1>
                            </button>
                        </div>
                    )
            ):
            (
                <div className="domainOwnerLoading" >
                    <img src={loading} className={`registerLoadingIcon ${ifDomainInfoLoaded? "":"registerLoadingIconrotate"}`}/>
                </div>
            )
            }   
        </div>
    )
}

export default RegisterDomainPixel;
