import FintChooser from "@/components/common/transaction/fintChooser";
import SettleBills from "@/components/common/transaction/settleBills";
import { MainFint } from "@/components/search/domainSettlement/paymentMethod/crypto";

import "@/style/components/auction/rootDomainCreate/addFuel/pay/addFuelCrypto.css"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AmountChooser from "../tool/amountChooser";
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { addFuelForRoot } from "@/utils/net/mainFunction/rootDomain/addFuelForRoot";
import { useConnection } from "@solana/wallet-adapter-react";

export interface AddFuelCryptoProps {
    addingAccountState: FundingAccountState
}

const AddFuelCrypto: React.FC<AddFuelCryptoProps> = ({
    addingAccountState
}) => {

    const {t} = useTranslation()

    const {publicKey: wallet, signTransaction} = useWalletEnv();
    const {connection} = useConnection()

    const [chooseFint, setChooseFint] = useState<MainFint>(MainFint.SOL)
    const [fuelQuantity, setFuelQuantity] = useState<number | null>(null)

    const addFuel = async() => {
        if(!fuelQuantity || !wallet || !signTransaction) return;

        try{
            const addFuelTransaction = addFuelForRoot(
                wallet, addingAccountState.creatingName, fuelQuantity
            )

            const latestBlockhash = await connection.getLatestBlockhash();
                addFuelTransaction.recentBlockhash = latestBlockhash.blockhash;
                addFuelTransaction.feePayer = wallet;

            const signedLaunchTransaction = await signTransaction(addFuelTransaction)

            const signature = await connection.sendRawTransaction(signedLaunchTransaction.serialize())

            await connection.confirmTransaction(
            {
                signature,
                ...latestBlockhash,
            },
            'finalized' // or 'confirmed' if你不要求太严格
            );

            console.log("transaction ok: ", signature)
        }catch(err){
            console.log("transaction err: ", err)
        }
    }

    return(
        <div className="addfuelcrypro">
            <div className="addFuelfintaandprice">
                <h1>{t("payfint")}</h1>
                <FintChooser activeFint={chooseFint} setActiveFint={setChooseFint}/>
                <AmountChooser nowFuel={addingAccountState.fundState.toNumber()} setFuelQuantity={setFuelQuantity} wilAddFuel={fuelQuantity}/>
            </div>
            <SettleBills confirmFunction={() => addFuel()}/>
        </div>
    )
}

export default AddFuelCrypto;