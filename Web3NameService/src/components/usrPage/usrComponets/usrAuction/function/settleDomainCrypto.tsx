import MintChooser from "@/components/common/transaction/mintChooser";
import SettleDomainBills from "@/components/common/transaction/settlebills/settleDomainBills";
import { SupportedMint, usePrice } from "@/provider/priceProvider/priceProvider";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomValueSet from "./tool/customValueSet";

import "@/style/components/usrPage/usrComponents/usrAuction/function/settleDomainCrypto.css"
import { toTokenPerUsd } from "@/utils/functional/common/number/toTokenPerUsd";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { settleDomain } from "./settleDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";

export interface SettleDomainCryptoProps{
    nameState: NameAuctionState,
    extireDomainName: string,
}


const SettleDomainCrypto: React.FC<SettleDomainCryptoProps> = ({
    nameState, extireDomainName
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()
    const {price, expo} = usePrice()
    const {publicKey: usr, signTransaction} = useWalletEnv()
    const solanaToast = useSolanaToast()

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    // per usd to usdToSol SOL
    const [usdToSol, setUsdToSol] = useState(0)
    useEffect(() => {
        if(price && expo){
            setUsdToSol(toTokenPerUsd(price, expo, SupportedMint.SOL))
        }
    }, [price, expo])

    const [rentExemption, setRentExemption] = useState<number | null>(null)
    useEffect(() => {
        const fetchRent = async() => {
            setRentExemption(await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH * 2 + cutDomain(extireDomainName)[0].length))
        }

        fetchRent()
    }, [])

    const [domainCustomValue, setDomainCustomValue] = useState<number | null>(null)

    const settleAuctionDomain = async() => {
        await settleDomain(
            signTransaction, usr, solanaToast, connection, nameState, extireDomainName, rentExemption!, domainCustomValue
        )
    } 

    return(
        <div className="settlePriceCrypto">
            <div className="settleDomainAbout">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="settlepriceblock">
                    <h3>{t("finalprice")}:</h3>
                    <h4>{((nameState.highestPrice).toNumber() / 1e9).toFixed(4)} SOL</h4>
                </div>
                <div className="settleine"/>
                <CustomValueSet 
                    setCustomValue={setDomainCustomValue}
                    customClass="settleDomainCustomValueSet"
                />
            </div>
            <SettleDomainBills 
                confirmFunction={() => settleAuctionDomain()}
                domainPriceLamports={nameState.highestPrice.toNumber()}
                usdToSOL={usdToSol}
                rentExemption={rentExemption}
            />
        </div>
    )
}

export default SettleDomainCrypto;
