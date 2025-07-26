import FintChooser from "@/components/common/transaction/fintChooser";
import SettleBills from "@/components/common/transaction/settleBills";
import { MainFint } from "@/components/search/domainSettlement/paymentMethod/crypto";

import "@/style/components/auction/rootDomainCreate/addFuel/pay/addFuelCrypto.css"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AmountChooser from "../tool/amountChooser";
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";

export interface AddFuelCryptoProps {
    addingAccountState: FundingAccountState
}

const AddFuelCrypto: React.FC<AddFuelCryptoProps> = ({
    addingAccountState
}) => {

    const {t} = useTranslation()

    const [chooseFint, setChooseFint] = useState<MainFint>(MainFint.SOL)
    const [fuelQuantity, setFuelQuantity] = useState<number | null>(null)

    return(
        <div className="addfuelcrypro">
            <div className="addFuelfintaandprice">
                <h1>{t("payfint")}</h1>
                <FintChooser activeFint={chooseFint} setActiveFint={setChooseFint}/>
                <AmountChooser nowFuel={addingAccountState.fundState.toNumber()} setFuelQuantity={setFuelQuantity} wilAddFuel={fuelQuantity}/>
            </div>
            <SettleBills />
        </div>
    )
}

export default AddFuelCrypto;