

import "@/style/components/search/domainSettlement/paymentInterface.css"
import type { MainFint, OrtherFint } from "./paymentMethod/crypto";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useEffect, useRef, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";

import loading from "@/assets/load.svg"
import rotate from "@/../public/background/rotate.png"
import exit from "@/assets/exit.svg"

import { useTranslation } from "react-i18next";
import { animate } from "animejs";
import type { PublicKey } from "@solana/web3.js";
import { registerWeb3Domain } from "@/utils/net/registerWeb3Domain";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";

export interface PaymentInterfaceProps{
    useFint: MainFint | OrtherFint | null,
    thisDomainPrice: number | null,
    cancleTransaction: () => void,
    creatingDomainName: string,
    creatingDomainKey: PublicKey | null,
}

const PaymentInterface: React.FC<PaymentInterfaceProps> = ({
    useFint, thisDomainPrice, cancleTransaction, creatingDomainKey, creatingDomainName
}) => {

    const {t} = useTranslation()
    const {publicKey: feePayer, signTransaction} = useWalletEnv()
    const {connection} = useConnection()
    const {activeRootDomain} = useRootDomain()

    const [walletBlance, setWalletBalance] = useState<number | null>(null)
    const [ifBalanceEnough, setIfBalanceEnough] = useState(false)

    const [ifCheckingBalnace, setIfCheckingBalnace] = useState(true)

    const [haveTransactionOk, setHaveTransactionOk] = useState(false)
    const [ifTransactionOk, setIfTransactionOk] = useState<boolean | null>(null)

    useEffect(() => {
        const fetchDomainBalance = async() => {
            if(!feePayer)return

            const balance = await connection.getBalance(feePayer);
            setWalletBalance(walletBlance)
            
            setWalletBalance(balance)
            setIfCheckingBalnace(false)
        }

        fetchDomainBalance()
    }, [feePayer])

    useEffect(() => {
        if(walletBlance === null || !thisDomainPrice)return;

        if(thisDomainPrice > walletBlance){
            setIfBalanceEnough(false)
            return
        }

        setIfBalanceEnough(true)
    }, [walletBlance])

    const loadingBalanceRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const sendTransaction = async() => {
            if(ifBalanceEnough && !haveTransactionOk){
                console.log("send transaction")
                setHaveTransactionOk(true)

                if(!activeRootDomain || !creatingDomainKey || !feePayer || !signTransaction) return

                try{
                    const thisRegisterTransaction = registerWeb3Domain(
                        getNameAccountKey(getHashedName(activeRootDomain)), creatingDomainKey,
                        feePayer, feePayer, feePayer, creatingDomainName, 1024
                    )

                    const { blockhash } = await connection.getLatestBlockhash();

                    thisRegisterTransaction.recentBlockhash = blockhash;
                    thisRegisterTransaction.feePayer = feePayer;

                    const signedTransaction = await signTransaction(thisRegisterTransaction);

                    const tx = await connection.sendRawTransaction(signedTransaction.serialize());
                    console.log("send transaction ok:", tx)
                }catch(err){
                    console.log("transaction error:", err)
                }
            }
        }

        sendTransaction()
    }, [ifBalanceEnough, haveTransactionOk])


    return(
        <div className="paymentinterface">
            <div className="paymentinterfaceback"/>
            <div className="walletwaiting">
                <button className="cancletransaction" onClick={cancleTransaction}>
                    <img src={exit} className="cancletransactionicon" />
                </button>
                {ifCheckingBalnace &&
                    <div className="loading">
                        <img src={loading} className="paymentinterfacelaod" ref={loadingBalanceRef}/>
                        <h1>{t("wait")}</h1>
                    </div>
                }
                {ifBalanceEnough ? 
                (
                    <div className="balanceEnough">
                        <img src={rotate} className="waitingconfirmicon" />
                        <h1>{t("walletconfirm")}</h1>
                    </div>
                ):
                (
                    <div className="balancenotEnough">
                        
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default PaymentInterface;