import MintChooser from "@/components/common/transaction/mintChooser";
import SettleDomainBills from "@/components/common/transaction/settlebills/settleDomainBills";
import { SupportedMint, usePrice } from "@/provider/priceProvider/priceProvider";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { getDomainDepositRatio } from "@/utils/functional/common/net/getDomainDepositRatio";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomValueSet from "./tool/customValueSet";

import "@/style/components/usrPage/usrComponents/usrAuction/function/settleDomainCrypto.css"
import { toTokenPerUsd } from "@/utils/functional/common/number/toTokenPerUsd";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";

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

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    const [depositRatio, setDepositRatio] = useState<number | null>(null)
    useEffect(() => {
        const getDepositRatio = async() => {
            setDepositRatio(await getDomainDepositRatio(
                extireDomainName, connection
            ))
        }
        getDepositRatio()
    }, [])

    const [domainPriceLamport, setDomainPriceLamport] = useState<number | null>(null)
    useEffect(() => {
        if(price && expo){
            const domainSolPrice = toTokenPerUsd(price, expo, SupportedMint.SOL);
            setDomainPriceLamport((nameState.highestPrice.toNumber()/1e6) * domainSolPrice * 1e9)
        }
    }, [price, expo])

    const [rentExemption, setRentExemption] = useState<number | null>(null)
    useEffect(() => {
        const fetchRent = async() => {
            setRentExemption(await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH * 2 + cutDomain(extireDomainName)[0].length))
        }

        fetchRent()
    }, [])

    const [totalLamports, setTotalLamports] = useState<number | null>(null)
    useEffect(() => {
        if(rentExemption && depositRatio && domainPriceLamport){
            setTotalLamports(domainPriceLamport * (1-depositRatio) - rentExemption)
        }
    }, [rentExemption, domainPriceLamport, depositRatio])

    const [domainCustomValue, setDomainCustomValue] = useState<number | null>(null)

    return(
        <div className="settlePriceCrypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="settlepriceblock">
                    <h3>{t("finalprice")}:</h3>
                    <h4>$ {((nameState.highestPrice).toNumber() / 1e6).toFixed(2)}</h4>
                </div>
                <div className="settleine"/>
                <CustomValueSet 
                    customValue={domainCustomValue}
                    setCustomValue={setDomainCustomValue}
                />
            </div>
            <SettleDomainBills 
                confirmFunction={() => {}}
                domainPrice={nameState.highestPrice.toNumber()}
                domainPriceLamports={domainPriceLamport}
                rentExemption={rentExemption}
                depositRatio={depositRatio}
                totalLamports={totalLamports}
            />
        </div>
    )
}

export default SettleDomainCrypto;
