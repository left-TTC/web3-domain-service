import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills.css"
import { MainMint, type OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { useEffect, useState } from "react";
import { useCalculateMint } from "@/components/auction/rootDomainCreate/addFuel/functionalComponents/addFuelMintCalculate";

export interface SettleBillsProps {
    useMint: MainMint | OtherMint,
    fuelQuantity: number | null,
    confirmTransaction: () => void,
}


const AddFuelSettleBills: React.FC<SettleBillsProps> = ({
    useMint, fuelQuantity, confirmTransaction
}) => {

    const {t} = useTranslation()

    const { fuelCost, ifCalculating } = useCalculateMint( useMint, fuelQuantity )

    const [costShow, setCostShow] = useState("")
    useEffect(() => {
        if(fuelCost === 0) return
        switch(useMint){
            case MainMint.SOL: setCostShow((fuelCost / 1e9).toFixed(6) + " SOL"); break
            case MainMint.USDC: setCostShow((fuelCost / 1e6).toFixed(4) + " USDC"); break
        }
    }, [fuelCost, useMint])
        
    

    return(
        <div className="totalfees">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("Fund")}:</h1>
                </div>
                <h1>{costShow? costShow:"Choose numbers"}</h1>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{costShow? costShow:"Waiting"}</h2>
                </div>
                <button className="cryptoconfirmbutton" onClick={() => confirmTransaction()}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default AddFuelSettleBills;