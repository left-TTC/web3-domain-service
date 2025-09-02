

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

    return(
        <div className="launchfee">
            <div className="launchfeepay">
                <Back backFun={backToChooseRoot} className="launchrootback"/>
                <div className="launchfeetitle">
                    <h2>Creating:</h2>
                    <h1>{wantCreateName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
                <LaunchFeeCrypto 
                    creatingRootName={wantCreateName}
                />
            </div>
        </div>
    )
}

export default LaunchFeeSettle;