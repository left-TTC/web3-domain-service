import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useState } from "react";
import SettleDomainCrypto from "../function/settleDomainCrypto";



export interface SettleDomainProps {
    settleName: string,
    settleInfo: NameAuctionState,
    back: () => void
}

const SettleDomain: React.FC<SettleDomainProps> = ({
    settleName, settleInfo, back
}) => {

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    return (
        <div className="increasePrice">
            <div className="launchfeepay">
                <Back backFun={back} className="launchrootback"/>
                <div className="increasePricepaytitle">
                    <h2>Settling:</h2>
                    <h1>{settleName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <SettleDomainCrypto
                    nameState={settleInfo}
                    extireDomainName={settleName}
                />
            </div>
        </div>
    )
}

export default SettleDomain;