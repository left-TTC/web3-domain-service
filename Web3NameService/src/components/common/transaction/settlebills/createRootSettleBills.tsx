import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction//settleBills/settleBills.css"
import "@/style/components/commonStyle/transaction//settleBills/createRootSettleBills.css"

import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { tryToCreateRootDomain } from "@/components/auction/rootDomainCreate/launch/functionalComponents/tryToCreateRootDomain";
import { TransactionState, useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { SupportedMint, usePrice } from "@/provider/priceProvider/priceProvider";
import { toTokenPerUsd } from "@/utils/functional/common/number/toTokenPerUsd";

export interface SettleBillsProps {
    creatingRootName: string,
    nameValid: boolean
}


const CreateRootSettleBills: React.FC<SettleBillsProps> = ({
    creatingRootName, nameValid
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()

    const {price, expo} = usePrice()

    const [loadingBills, setLoadingBills] = useState(true)
    const [solPrice, setSolPrice] = useState(0)
    useEffect(() => {
        if(!price || !price.get(SupportedMint.SOL) || !expo) return
        
        setSolPrice(toTokenPerUsd(price, expo, SupportedMint.SOL) * 5)
        setLoadingBills(false)

    }, [price])

    const solanaToast = useSolanaToast()
    const { publicKey, signTransaction } = useWalletEnv()

    const createRootState = async() => {
        if(solPrice > 0){
            await tryToCreateRootDomain(
                creatingRootName,
                solPrice,
                solanaToast,
                connection,
                signTransaction,
                publicKey
            )
        }else{
            solanaToast.show(TransactionState.Error)
        }
    }

    return(
        <div className="totalfees createrootsettlebills">
            <h1>{t("bill")}</h1>
            <div className="registerfee">
                <div className="registerrule">
                    <h1>{t("deposit")}:</h1>
                </div>
                <h1>{!loadingBills? 
                    `$5 (~ ${solPrice.toFixed(4)} SOL)`:
                    "Loading"
                    }
                </h1>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{solPrice.toFixed(4)} SOL</h2>
                </div>
                <button 
                    className={`cryptoconfirmbutton ${!nameValid && "cannotcomfirmcreateroot"}`} 
                    onClick={() => createRootState()}
                >
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default CreateRootSettleBills;