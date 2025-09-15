import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction//settleBills/settleBills.css"
import "@/style/components/commonStyle/transaction//settleBills/createRootSettleBills.css"

import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { extractNumber } from "@/utils/functional/common/number/extractNumber";
import { tryToCreateRootDomain } from "@/components/auction/rootDomainCreate/launch/functionalComponents/tryToCreateRootDomain";
import { TransactionState, useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";

export interface SettleBillsProps {
    priceMap: Map<MainMint, number> | null,
    creatingRootName: string,
}


const CreateRootSettleBills: React.FC<SettleBillsProps> = ({
    priceMap, creatingRootName
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()

    const [loadingBills, setLoadingBills] = useState(true)
    const [solPrice, setSolPrice] = useState(0)
    useEffect(() => {
        if(!priceMap || !priceMap.get(MainMint.SOL)) return
        console.log(priceMap)
        setLoadingBills(false)
        setSolPrice(priceMap.get(MainMint.SOL)!);
    }, [priceMap])

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
        <div className="totalfees">
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
                <button className="cryptoconfirmbutton" onClick={() => createRootState()}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default CreateRootSettleBills;