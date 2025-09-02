import { useTranslation } from "react-i18next";

import "@/style/components/commonStyle/transaction/settleBills.css"
import "@/style/components/commonStyle/transaction/createRootSettleBills.css"

import { MainMint, type OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { useEffect, useState } from "react";
import { checkRentExemption } from "@/utils/net/otherFunction/checkRentExemption";
import { useConnection } from "@solana/wallet-adapter-react";
import { extractNumber } from "@/utils/functional/common/number/extractNumber";
import { tryToCreateRootDomain } from "@/components/auction/rootDomainCreate/launch/functionalComponents/tryToCreateRootDomain";
import { TransactionState, useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";

export interface SettleBillsProps {
    priceMap: Map<MainMint | OtherMint, number> | null,
    creatingRootName: string,
}


const CreateRootSettleBills: React.FC<SettleBillsProps> = ({
    priceMap, creatingRootName
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()

    const [loadingBills, setLoadingBills] = useState(true)
    useEffect(() => {
        if(!priceMap) return
        console.log(priceMap)
        setLoadingBills(false)
    }, [priceMap])

    const [rentExemption, setRentExemption] = useState("Calculating")
    useEffect(() => {
        const getRootStateRentExemption = async() => {
            if(creatingRootName){
                setRentExemption(await checkRentExemption(connection, creatingRootName) + " SOL")
            }
        }
        getRootStateRentExemption()
    }, [creatingRootName])

    const [createARootSateFee, setCreateARootStateFee] = useState("Calculating")
    const [creteRootStateFee, setCreateStateFee] = useState(0)
    useEffect(() => {
        if(priceMap && rentExemption != "Calculating"){
            if(!priceMap.get(MainMint.SOL)){
                setCreateARootStateFee("Error")
                return
            }
            const extractRentExemption = extractNumber(rentExemption)
            
            if(extractRentExemption){
                setCreateStateFee(extractRentExemption + 0.05)
                setCreateARootStateFee((0.05 + extractRentExemption).toFixed(4) + " SOL")
            }
        }
    }, [priceMap, rentExemption])


    const solanaToast = useSolanaToast()
    const { publicKey, signTransaction } = useWalletEnv()
    const createRootState = async() => {
        if(creteRootStateFee > 0){
            await tryToCreateRootDomain(
                creatingRootName,
                creteRootStateFee,
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
                    `${0.05} SOL (~$${priceMap?.get(MainMint.USDC)})`:
                    "Loading"
                    }
                </h1>
            </div>
            <div className="rentfee">
                <h1>{t("rootex")}:</h1>
                <h2>{rentExemption}</h2>
            </div>
            <div className="cryptodiliver"/>
            <div className="cryptoconfirm">
                <div className="cryptototal">
                    <h1>{t("total")}</h1>
                    <h2>{createARootSateFee}</h2>
                </div>
                <button className="cryptoconfirmbutton" onClick={() => createRootState()}>
                    <h1>{t("confirm")}</h1>
                </button>
            </div>
        </div>
    )

}


export default CreateRootSettleBills;