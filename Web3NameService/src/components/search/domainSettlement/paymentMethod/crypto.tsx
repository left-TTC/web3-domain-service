


import "@/style/components/search/domainSettlement/paymentMethod/crypto.css"
import { useTranslation } from "react-i18next";


import { useEffect, useState } from "react";
import MintChooser from "@/components/common/transaction/mintChooser";
import CreateDomainSettleBills from "@/components/common/transaction/settlebills/createDomainSettleBills";
import type { PublicKey } from "@solana/web3.js";
import RefferrerVerify from "@/components/common/transaction/refferrerVerify";
import { SupportedMint, usePrice } from "@/provider/priceProvider/priceProvider";

import rootAttention from "@/assets/attention.svg"
import { toTokenPerUsd } from "@/utils/functional/common/number/toTokenPerUsd";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useFetchAllRentExemption } from "../functionComponents/useFetchAllRentExemption";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { startDomain } from "../functionComponents/transaction/startDomain";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { useAtom } from "jotai";
import { biddingDomain } from "@/components/usrPage/function/useAuctioningDomain";

export enum MainMint{
    SOL = "SOL",
    USDC = "USDC",
    USDT = "USDT",
}

export interface CryptoProps{
    domainName: string,
    // usd
    domainPrice: number,   
    domainInfo: NameRecordState | null,
}

const Crypto: React.FC<CryptoProps> = ({
    domainName, domainPrice, domainInfo
}) => {

    const {connection} = useConnection()
    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {activeRootDomain, rootDomains} = useRootDomain()
    const solanaToast = useSolanaToast()

    const [auctioningDomain, setAuctioningDomain] = useAtom(biddingDomain)

    const [refferrerKey, setRefferrerKey] = useState<PublicKey | null>(null)
    const [ifRefferrerValid, setIfRefferrerValid] = useState(false)

    const {t} = useTranslation()
    const {price, expo} = usePrice()

    const [solPrice, setSolPrice] = useState<number | null>(null)

    useEffect(() => {
        if(price && expo){
            const solPrice = toTokenPerUsd(price, expo, SupportedMint.SOL)
            setSolPrice(solPrice)
        }
    }, [price])

    const [activeMint, setActiveMint] = useState<SupportedMint>(SupportedMint.SOL)
    const setWillUseMint = (mint: SupportedMint) => {
        setActiveMint(mint)
    }
  
    const createNameState = async() => {
        await startDomain(
            domainName,
            refferrerKey!,
            usr,
            rootDomains,
            totalPrice,
            solanaToast,
            connection,
            signTransaction,
            () => {setAuctioningDomain([...auctioningDomain, domainName])}
        )
    }

    let {refferrerRecordRent, nameStateRent, calculating} = useFetchAllRentExemption(
        usr, connection, domainName, activeRootDomain
    )

    const [depositRatio, setDepositRatio] = useState(0)
    useEffect(() => {
        console.log(domainInfo)
        if(domainInfo){
            setDepositRatio(0.05)
        }else setDepositRatio(0.1)
    }, [])
    
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        if(!calculating && solPrice){
            //means calculating over
            console.log("ratio: ", depositRatio, domainPrice)
            const domainDepositPriceSol = domainPrice * depositRatio * 1e3 * solPrice;
            setTotalPrice(domainDepositPriceSol + refferrerRecordRent + nameStateRent)
        }
    }, [calculating, solPrice])

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
                <RefferrerVerify 
                    setRefferrerKey={setRefferrerKey}
                    setReffererValid={setIfRefferrerValid}
                    ifRefferValid={ifRefferrerValid}
                />
                <div className="importantattention">
                    <h2>{t("important")}:</h2>
                    <div className="refferrerpolicy">
                        <h2>{t("learn")}</h2>
                        <a>{t("refferrer policy")}</a>
                    </div>
                </div>
            </div>
            
            <CreateDomainSettleBills 
                confirmFunction={createNameState} 
                ifRefferverValid={ifRefferrerValid}
                price={domainPrice}
                solPrice={solPrice}
                nameStateRent={nameStateRent}
                refferrerRecordRent={refferrerRecordRent}
                ifRentCalculating={calculating}
                depositRatio={depositRatio}
                totalPrice={totalPrice}
            />
        </div>
    )
}

export default Crypto;
