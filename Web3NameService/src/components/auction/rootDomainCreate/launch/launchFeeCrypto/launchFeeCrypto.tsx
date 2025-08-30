import MintChooser from "@/components/common/transaction/mintChooser";
import { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launch/launchFeeCrypto/launchFeeCrypto.css"
import CreateRootSettleBills from "@/components/common/transaction/createRootSettleBills";
import { getDomainPrice } from "@/utils/functional/domain/getDomainPrice";
import { CREATE_ROOT_FEE } from "@/utils/constants/constants";
import { useConnection } from "@solana/wallet-adapter-react";



export interface LaunchFeeCryptoProps {
    confirmToCreate: () => void;
}

const LaunchFeeCrypto: React.FC<LaunchFeeCryptoProps> = ({
    confirmToCreate
}) => {

    const [chooseMint, setChooseMint] = useState<MainMint | OtherMint>(MainMint.SOL)
    const {t} = useTranslation()
    const {connection} = useConnection()

    const [loadingBills, setLoadingBills] = useState(false)
    const [priceMap, setPriceMap] = useState<Map<MainMint | OtherMint, number> | null>(null)

    useEffect(() => {
        const fetchRootNowFee = async() => {
            const tokenPrice = await getDomainPrice(CREATE_ROOT_FEE, connection)
            setPriceMap(tokenPrice)
        }
        fetchRootNowFee()
    }, [])

    return(
        <div className="launchctypto">
            <div className="launchfeeway">
                <h1>{t("paymint")}</h1>
                <MintChooser activeMint={chooseMint} setActiveMint={setChooseMint} />
                <h4 className="attention">{t("attention")}:</h4>
                <div className="attentionblock">
                    <h1>{t("rootattention")}</h1>
                </div>
            </div>
            <CreateRootSettleBills confirmFunction={confirmToCreate}/>
        </div>
    )
}


export default LaunchFeeCrypto;