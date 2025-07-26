

import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import "@/style/components/auction/rootDomainCreate/launch/launchFeeSettle.css"
import type React from "react";
import { useState } from "react";
import LaunchFeeCrypto from "./launchFeeCrypto/launchFeeCrypto";


export interface LaunchFeeSettleProps {
    backToChooseRoot: () => void,
    wantCreateName: string,
}

const LaunchFeeSettle: React.FC<LaunchFeeSettleProps> = ({
    backToChooseRoot, wantCreateName
}) => {

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    return(
        <div className="launchfee">
            <div className="launchfeepay">
                <Back backFun={backToChooseRoot} />
                <div className="launchfeetitle">
                    <h1>{wantCreateName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <LaunchFeeCrypto />
            </div>
        </div>
    )
}

export default LaunchFeeSettle;