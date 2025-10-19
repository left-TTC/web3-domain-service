

import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import "@/style/components/auction/rootDomainCreate/launch/launchFeeSettle.css"
import type React from "react";
import { useState } from "react";
import LaunchFeeCrypto from "./launchFeeCrypto/launchFeeCrypto";
import { useTranslation } from "react-i18next";


export interface LaunchFeeSettleProps {
    backToChooseRoot: () => void,
}

const LaunchFeeSettle: React.FC<LaunchFeeSettleProps> = ({
    backToChooseRoot
}) => {

    const {t} = useTranslation()

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    return(
        <div className="launchfee">
            <div className="launchfeepay">
                <Back backFun={backToChooseRoot} className="launchrootback"/>
                <div className="launchfeetitle">
                    <h2>{t("createroot")}</h2>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <LaunchFeeCrypto 
                    creatingRootName="a"
                />
            </div>
        </div>
    )
}

export default LaunchFeeSettle;