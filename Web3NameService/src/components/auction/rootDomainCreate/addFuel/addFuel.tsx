

import "@/style/components/auction/rootDomainCreate/addFuel/addFuel.css"
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";


import back from "@/assets/backwhite.svg"
import { useTranslation } from "react-i18next";
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import AddFuelCrypto from "./pay/addFuelcrypto";

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
            <div className="addfuelpay">
                <button className="backtoaddfuel" onClick={closeAddFuelPage}>
                    <img src={back} className="backfuelimg" />
                    <h1>{t("back")}</h1>
                </button>
                <div className="addfueltitle">
                    <h1>{t("addingfor")}:</h1>
                    <h2>{addingRootInfo.creatingName}</h2>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod}/>
                <AddFuelCrypto addingAccountState={addingRootInfo}/>
            </div>
        </div>
    )
}

export default AddFuel;
