

import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import "@/style/components/auction/rootDomainCreate/launch/launchFeeSettle.css"
import type React from "react";
import { useState } from "react";
import LaunchFeeCrypto from "./launchFeeCrypto/launchFeeCrypto";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { launchRootDomain } from "@/utils/net/mainFunction/rootDomain/launchRootDomain";
import { useConnection } from "@solana/wallet-adapter-react";


export interface LaunchFeeSettleProps {
    backToChooseRoot: () => void,
    wantCreateName: string,
}

const LaunchFeeSettle: React.FC<LaunchFeeSettleProps> = ({
    backToChooseRoot, wantCreateName
}) => {

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    const {
        publicKey: wallet, signTransaction
    } = useWalletEnv();

    const {connection} = useConnection()

    const tryToCreateRootDomain = async(rootDomain: string) => {
        if(!wallet || !signTransaction)return;

        try{
            const createRootTransaction = launchRootDomain(
                rootDomain, wallet
            )

            const latestBlockhash = await connection.getLatestBlockhash();
                createRootTransaction.recentBlockhash = latestBlockhash.blockhash;
                createRootTransaction.feePayer = wallet;

            const signedLaunchTransaction = await signTransaction(createRootTransaction)

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
            console.log("transaction err:", err)
        }
    }

    return(
        <div className="launchfee">
            <div className="launchfeepay">
                <Back backFun={backToChooseRoot} className="launchrootback"/>
                <div className="launchfeetitle">
                    <h2>Creating:</h2>
                    <h1>{wantCreateName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <LaunchFeeCrypto confirmToCreate={() => tryToCreateRootDomain(wantCreateName)}/>
            </div>
        </div>
    )
}

export default LaunchFeeSettle;