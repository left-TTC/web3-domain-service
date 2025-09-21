import MintChooser from "@/components/common/transaction/mintChooser";
import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launch/launchFeeCrypto/launchFeeCrypto.css"
import CreateRootSettleBills from "@/components/common/transaction/settlebills/createRootSettleBills";



export interface LaunchFeeCryptoProps {
    creatingRootName: string;
}

const LaunchFeeCrypto: React.FC<LaunchFeeCryptoProps> = ({
    creatingRootName
}) => {

    const [chooseMint, setChooseMint] = useState<MainMint>(MainMint.SOL)
    const {t} = useTranslation()

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
                creatingRootName={creatingRootName}
            />
        </div>
    )
}


export default LaunchFeeCrypto;