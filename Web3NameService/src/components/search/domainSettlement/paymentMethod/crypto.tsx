


import "@/style/components/search/domainSettlement/paymentMethod/crypto.css"
import { useTranslation } from "react-i18next";


import { useEffect, useState } from "react";
import MintChooser from "@/components/common/transaction/mintChooser";
import CreateDomainSettleBills from "@/components/common/transaction/settlebills/createDomainSettleBills";
import type { PublicKey } from "@solana/web3.js";
import ReferrerVerify from "@/components/common/transaction/referrerVerify";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";

import rootAttention from "@/assets/attention.svg"

export enum MainMint{
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
}

export interface CryptoProps{
    domainName: string,
    // usd
    domainPrice: number,   
}

const Crypto: React.FC<CryptoProps> = ({
    domainName, domainPrice
}) => {

    const [referrerKey, setReferrerKey] = useState<PublicKey | null>(null)
    const [ifReferrerValid, setIfReferrerValid] = useState(false)

    const {t} = useTranslation()

    const [activeMint, setActiveMint] = useState<SupportedMint>(SupportedMint.SOL)
    const setWillUseMint = (mint: SupportedMint) => {
        setActiveMint(mint)
    }

    const [rentExemption, setRentExemption] = useState(0);
        
    const createNameState = async() => {

    }

    return(
        <div className="paymentBlock">
            <div className="paymintchoose cryptopaymint">
                <div className="settlewirdbl">
                    <h3>{t("settlementInfo")}</h3>
                </div>
                <MintChooser 
                    activeMint={activeMint} 
                    setActiveMint={setWillUseMint}
                />
                <div className="priceBlock">
                    <h3>{t("startingp")}:</h3>
                    <h2>$ {(domainPrice / 1e6).toFixed(2)}</h2>
                </div>
                <div className="cryptodiliver"/>
                <div className="reffererattention">
                    <h4>{t("Refferer")}:</h4>
                    <img src={rootAttention} className="refferrerattention" />
                </div>
                <ReferrerVerify 
                    setReferrerKey={setReferrerKey}
                    setReffererValid={setIfReferrerValid}
                    ifRefferValid={ifReferrerValid}
                />
                <div className="importantattention">
                    <h2>{t("important")}:</h2>
                    <div className="referrerpolicy">
                        <h2>{t("learn")}</h2>
                        <a>{t("refferrer policy")}</a>
                    </div>
                </div>
            </div>
            
            
            <CreateDomainSettleBills 
                confirmFunction={createNameState} 
                rentExemption={1}
                ifRefferverValid={ifReferrerValid}
            />
        </div>
    )
}

export default Crypto;
