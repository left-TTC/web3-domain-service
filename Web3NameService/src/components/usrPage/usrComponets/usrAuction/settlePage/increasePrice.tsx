
import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import "@/style/components/usrPage/usrComponents/settlePage/increasePrice.css"
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useState } from "react";
import IncreasePriceCrypto from "../function/increasePriceCrypto";
import { useTranslation } from "react-i18next";

export interface IncreasePriceProps {
    addName: string,
    addInfo: NameAuctionState,
    back: () => void
}

const IncreasePrice: React.FC<IncreasePriceProps> = ({
    addName, addInfo, back
}) => {

    const {t} = useTranslation()

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    return (
        <div className="increasePrice">
            <div className="increasePricepageflex">
                <Back backFun={back} className="launchrootback"/>
                <div className="increasePricepaytitle">
                    <h2>{t("priceincrease")}:</h2>
                    <h1>{addName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <IncreasePriceCrypto 
                    nameState={addInfo}
                    extireDomainName={addName}
                />
            </div>
        </div>
    )
}

export default IncreasePrice;
