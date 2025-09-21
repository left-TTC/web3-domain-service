import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction//settleBills/settleBills.css"
import { useEffect, useState } from "react";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useConnection } from "@solana/wallet-adapter-react";
import { tryToAddFuel } from "@/components/auction/rootDomainCreate/addFuel/functionalComponents/tryToAddFuel";
import { SupportedMint, usePrice } from "@/provider/priceProvider/priceProvider";
import { toTokenPerUsd } from "@/utils/functional/common/number/toTokenPerUsd";

export interface SettleBillsProps {
    useMint: SupportedMint,
    fuelQuantity: number | null,
    creatingRootName: string,
}

// fuel quantity's unit is usd
const AddFuelSettleBills: React.FC<SettleBillsProps> = ({
    useMint, fuelQuantity, creatingRootName
}) => {

    const {t} = useTranslation()

    const {price, expo} = usePrice()

    const [perPrice, setPerPrice] = useState(0)
    const [solCost ,setSolCost] = useState(0)
    useEffect(() => {
        if(!price || !expo) return
        setPerPrice(toTokenPerUsd(price, expo, useMint))
    }, [perPrice, useMint])
    useEffect(() => {
        if(perPrice && fuelQuantity){
            switch(useMint){
                case SupportedMint.SOL:
                    setSolCost(perPrice * fuelQuantity * 1e3)
            }
        }
    }, [perPrice, fuelQuantity])


    const solanaToast = useSolanaToast();

    const {publicKey: wallet, signTransaction} = useWalletEnv();
    const {connection} = useConnection()

    const confirmAddFuelTransaction = async() => {
        await tryToAddFuel(
            connection,
            signTransaction,
            wallet,
            solanaToast,
            fuelQuantity,
            creatingRootName,
            solCost,
            useMint,
        )
    }
        
    return(
        <div className="totalfees">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("Fund")}:</h1>
                </div>
                <h1>{solCost? `${(solCost / 1e9).toFixed(4) + " SOL"}`:"Choose numbers"}</h1>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{solCost? `${(solCost / 1e9).toFixed(4) + " SOL"}`:"Waiting"}</h2>
                </div>
                <button className="cryptoconfirmbutton" onClick={() => confirmAddFuelTransaction()}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default AddFuelSettleBills;