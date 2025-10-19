import MintChooser from "@/components/common/transaction/mintChooser";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launch/launchFeeCrypto/launchFeeCrypto.css"
import CreateRootSettleBills from "@/components/common/transaction/settlebills/createRootSettleBills";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import RootNameVerify from "./tool/rootNameVerify";



export interface LaunchFeeCryptoProps {
    creatingRootName: string;
}

const LaunchFeeCrypto: React.FC<LaunchFeeCryptoProps> = ({
    creatingRootName
}) => {

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)
    const {t} = useTranslation()

    return(
        <div className="launchctypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="launchctyptoline" />
                <RootNameVerify
                     
                />
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