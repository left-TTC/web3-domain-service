
import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import "@/style/components/usrPage/usrComponents/usrAuction/increasePrice.css"
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useState } from "react";
import IncreasePriceCrypto from "./function/increasePriceCrypto";

export interface IncreasePriceProps {
    addName: string,
    addInfo: NameAuctionState,
    back: () => void
}

const IncreasePrice: React.FC<IncreasePriceProps> = ({
    addName, addInfo, back
}) => {

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    return (
        <div className="increasePrice">
            <div className="launchfeepay">
                <Back backFun={back} className="launchrootback"/>
                <div className="increasePricepaytitle">
                    <h2>Increase Price For:</h2>
                    <h1>{addName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <IncreasePriceCrypto />
            </div>
        </div>
    )
}

export default IncreasePrice;
