import FintChooser from "@/components/common/transaction/fintChooser";
import { MainFint, OtherFint } from "@/components/search/domainSettlement/paymentMethod/crypto";

import "@/style/components/auction/rootDomainCreate/addFuel/pay/addFuelCrypto.css"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AmountChooser from "../tool/amountChooser";
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { addFuelForRoot } from "@/utils/net/mainFunction/rootDomain/addFuelForRoot";
import { useConnection } from "@solana/wallet-adapter-react";
import { TransactionState, useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { showcCheckBalanceToast } from "@/utils/functional/show/checkBalanceToast";
import { handleTransactionError } from "@/utils/functional/error/transactionError";
import SettleBills from "@/components/common/transaction/settleBills";

export interface AddFuelCryptoProps {
    addingAccountState: FundingAccountState
}

const AddFuelCrypto: React.FC<AddFuelCryptoProps> = ({
    addingAccountState
}) => {

    const {t} = useTranslation()
    const toast = useSolanaToast();

    const {publicKey: wallet, signTransaction} = useWalletEnv();
    const {connection} = useConnection()

    const [chooseFint, setChooseFint] = useState<MainFint | OtherFint>(MainFint.SOL)
    const [fuelQuantity, setFuelQuantity] = useState<number | null>(null)

    const addFuel = async() => {
        if(!fuelQuantity )return
        if(!wallet || !signTransaction)return toast.show(TransactionState.NoConnect)

        const transactionToastId = await showcCheckBalanceToast(
            toast, wallet, connection, fuelQuantity
        )

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
                'finalized' 
            );

            console.log("transaction ok: ", signature)
            toast.update(transactionToastId, TransactionState.Success)
        }catch(err){
            handleTransactionError(String(err), toast, transactionToastId)
        }
    }

    return(
        <div className="addfuelcrypro">
            <div className="addFuelfintaandprice">
                <h1>{t("payfint")}</h1>
                <FintChooser 
                    activeFint={chooseFint} 
                    setActiveFint={setChooseFint}
                />
                <AmountChooser 
                    nowFuel={addingAccountState.fundState.toNumber()} 
                    setFuelQuantity={setFuelQuantity} 
                    wilAddFuel={fuelQuantity}
                />
            </div>
            <SettleBills confirmFunction={() => addFuel()}/>
        </div>
    )
}

export default AddFuelCrypto;