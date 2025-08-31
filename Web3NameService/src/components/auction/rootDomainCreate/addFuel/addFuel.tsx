

import "@/style/components/auction/rootDomainCreate/addFuel/addFuel.css"
import { useState } from "react";


import { useTranslation } from "react-i18next";
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import AddFuelCrypto from "./pay/addFuelcrypto";
import Back from "@/components/common/functional/back";

export interface AddFuelProps {
    addingRootInfo: FundingAccountState,
    closeAddFuelPage: () => void,
}

const AddFuel: React.FC<AddFuelProps> = ({
    addingRootInfo, closeAddFuelPage
}) => {

    const {t} = useTranslation()

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)


    return(
        <div className="addfuelpage">
            <div className="addfuelbackbl">
                <Back backFun={closeAddFuelPage} className="addfuelback"/>
            </div>
            <div className="addfuelpay">
                <div className="addfueltitle">
                    <h1>{t("addingfor")}:</h1>
                    <h2>{addingRootInfo.creatingName}</h2>
                </div>
                <ChoosePayment 
                    chooseMethod={setPayMethod} 
                    activingMethod={payMethod}
                />
                <AddFuelCrypto 
                    addingAccountState={addingRootInfo}
                    creatingRootName={addingRootInfo.creatingName}    
                />
            </div>
        </div>
    )
}

export default AddFuel;
