
import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import { useState } from "react";
import SetCustomPriceCrypto from "./bills/setCustomPriceCrypto";

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/settleComponent/bills/customPriceSet.css"
import { cutDomain } from "@/utils/functional/common/cutDomain";


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
            <div className="custompriceSet">
                <Back backFun={back} className="customPriceSetBack "/>
                <div className="setCustomPricepaytitle">
                    <h2>Setting:</h2>
                    <div className="setcustomdomainName">
                        <h1>{cutDomain(setName)[0]}</h1>
                        <h2>.{cutDomain(setName)[1]}</h2>
                    </div>
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