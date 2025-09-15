import MintChooser from "@/components/common/transaction/mintChooser";
import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launch/launchFeeCrypto/launchFeeCrypto.css"
import CreateRootSettleBills from "@/components/common/transaction/settlebills/createRootSettleBills";
import { getDomainPrice } from "@/utils/functional/domain/getDomainPrice";
import { useConnection } from "@solana/wallet-adapter-react";



export interface LaunchFeeCryptoProps {
    creatingRootName: string;
}

const LaunchFeeCrypto: React.FC<LaunchFeeCryptoProps> = ({
    creatingRootName
}) => {

    const [chooseMint, setChooseMint] = useState<MainMint>(MainMint.SOL)
    const {t} = useTranslation()
    const {connection} = useConnection()

    
    const [priceMap, setPriceMap] = useState<Map<MainMint, number> | null>(null)

    useEffect(() => {
        const fetchRootNowFee = async() => {
            const tokenPrice = await getDomainPrice(1, connection)
            setPriceMap(tokenPrice)
        }
        fetchRootNowFee()
    }, [])

    return(
        <div className="launchctypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="launchctyptoline" />
                <h4 className="attention">{t("attention")}:</h4>
                <div className="attentionblock">
                    <h1>{t("rootattention")}</h1>
                </div>
            </div>
            <CreateRootSettleBills 
                priceMap={priceMap}
                creatingRootName={creatingRootName}
            />
        </div>
    )
}


export default LaunchFeeCrypto;