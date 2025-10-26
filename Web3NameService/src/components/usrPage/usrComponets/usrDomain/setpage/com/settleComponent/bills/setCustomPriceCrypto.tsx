import MintChooser from "@/components/common/transaction/mintChooser"
import CustomValueSet from "@/components/usrPage/usrComponets/usrAuction/function/tool/customValueSet"
import { SupportedMint } from "@/provider/priceProvider/priceProvider"
import { useEffect, useState } from "react"

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/settleComponent/bills/setCustomPriceCrypto.css"
import SetCustomPriceBills from "@/components/common/transaction/settlebills/setCustomPriceBills"
import { setCustomPrice } from "../function/setCustomPrice"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider"
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider"
import { useConnection } from "@solana/wallet-adapter-react"


export interface SetCustomPriceCryptoptoProps{
    domainExtireName: string,

}

const SetCustomPriceCrypto: React.FC<SetCustomPriceCryptoptoProps> = ({
    domainExtireName
}) => {

    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {rootDomains} = useRootDomain()
    const solanaToast = useSolanaToast()
    const {connection} = useConnection()

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    const [domainCustomValue, setDomainCustomValue] = useState<number | null>(null)

    const [canBeConfirm, setCanBeConfirm] = useState(false)
    useEffect(() => {
        if(domainCustomValue != null && domainCustomValue > 0){
            setCanBeConfirm(true)
        }else setCanBeConfirm(false)
    }, [domainCustomValue])

    const clinkSetCustomPrice = async() => {
        await setCustomPrice(
            domainCustomValue!,
            domainExtireName,
            usr,
            rootDomains,
            solanaToast,
            connection,
            signTransaction
        )
    }

    return(
        <div className="SetCustomPriceCrypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="SetCustomPriceCryptoine"/>
                <CustomValueSet 
                    setCustomValue={setDomainCustomValue}
                    ifCustomSetPage={true}
                />
            </div>
            <SetCustomPriceBills
                canBeConfirm={canBeConfirm}
                confirmFunction={()=>{clinkSetCustomPrice()}}
            />
        </div>
    )
}

export default SetCustomPriceCrypto;
