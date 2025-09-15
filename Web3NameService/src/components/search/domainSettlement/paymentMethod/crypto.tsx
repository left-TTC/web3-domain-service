


import "@/style/components/search/domainSettlement/paymentMethod/crypto.css"
import { useTranslation } from "react-i18next";


import { useEffect, useState } from "react";
import MintChooser from "@/components/common/transaction/mintChooser";
import CreateDomainSettleBills from "@/components/common/transaction/settlebills/createDomainSettleBills";
import type { PublicKey } from "@solana/web3.js";
import OwnerWriter from "@/components/common/transaction/ownerWriter";
import ReferrerVerify from "@/components/common/transaction/referrerVerify";

export enum MainMint{
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
}

export interface CryptoProps{
    openWaitingWallet: () => void,
    domainPriceMap: Map<MainMint, number> | null,
    setUseMint: React.Dispatch<React.SetStateAction<MainMint>>,
    rentExemption: number,
    domainOwenr: PublicKey | null,
    setDomainOwner: React.Dispatch<React.SetStateAction<PublicKey | null>>,
    referrerKey: PublicKey | null,
    setReferrerKey: React.Dispatch<React.SetStateAction<PublicKey | null>>,
}

const Crypto: React.FC<CryptoProps> = ({
    openWaitingWallet, domainPriceMap, setUseMint, rentExemption,
    domainOwenr, setDomainOwner, referrerKey, setReferrerKey
}) => {

    useEffect(() => {
        console.log(domainPriceMap)
    }, [domainPriceMap])

    const {t} = useTranslation()

    const [activeMint, setActiveMint] = useState<MainMint>(MainMint.SOL)
    const setWillUseMint = (mint: MainMint) => {
        setActiveMint(mint)
        setUseMint(mint)
    }

    const [domainPriceShow, setDomainPriceShow] = useState("")
    useEffect(() => {
        if(!domainPriceMap)return setDomainPriceShow(t("loading"))
        switch(activeMint){
            case MainMint.SOL:
                setDomainPriceShow(domainPriceMap.get(activeMint)?.toFixed(4) + " SOL")
                break
        }
    }, [activeMint, domainPriceMap])
        

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
                <OwnerWriter 
                    setDomainOwner={setDomainOwner}
                />

                <div className="priceBlock">
                    <h3>{t("domainprice")}</h3>
                    <h2>{domainPriceShow}</h2>
                </div>
                
                <div className="cryptodiliver"/>
                
                <h3>{t("optionaldisc")}</h3>
                <ReferrerVerify 
                    setReferrerKey={setReferrerKey}
                />
            </div>
            
            
            <CreateDomainSettleBills 
                confirmFunction={openWaitingWallet} 
                domainPrice={domainPriceShow}
                rentExemption={rentExemption}
            />
        </div>
    )
}

export default Crypto;
