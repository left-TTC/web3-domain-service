
import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import { useState } from "react";
import SetCustomPriceCrypto from "./bills/setCustomPriceCrypto";


export interface CustomPriceSetProps {
    setName: string,
    back: () => void
}

const CustomPriceSet: React.FC<CustomPriceSetProps> = ({
    setName, back
}) => {

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    return (
        <div className="increasePrice">
            <div className="launchfeepay">
                <Back backFun={back} className="launchrootback"/>
                <div className="increasePricepaytitle">
                    <h2>Settling:</h2>
                    <h1>{setName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <SetCustomPriceCrypto 
                    domainExtireName={setName}
                />
            </div>
        </div>
    )
}

export default CustomPriceSet;