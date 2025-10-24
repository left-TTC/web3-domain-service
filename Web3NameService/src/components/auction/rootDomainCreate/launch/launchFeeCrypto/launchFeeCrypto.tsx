import MintChooser from "@/components/common/transaction/mintChooser";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launch/launchFeeCrypto/launchFeeCrypto.css"
import CreateRootSettleBills from "@/components/common/transaction/settlebills/createRootSettleBills";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import RootNameVerify from "./tool/rootNameVerify";



const LaunchFeeCrypto = () => {

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)
    const {t} = useTranslation()

    const [rootName, setRootName] = useState("")

    const [rootNameValid, setRootNameValid] = useState(false)

    return(
        <div className="launchctypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="launchctyptoline" />
                <RootNameVerify
                     setRootName={setRootName}
                     setNamaValid={setRootNameValid}
                     nameValid={rootNameValid}
                />
                <h4 className="attention">{t("attention")}:</h4>
                <div className="attentionblock">
                    <h3>{t("rootattention")}</h3>
                </div>
            </div>
            <CreateRootSettleBills 
                creatingRootName={rootName}
                nameValid={rootNameValid}
            />
        </div>
    )
}


export default LaunchFeeCrypto;