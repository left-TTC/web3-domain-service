import FintChooser from "@/components/common/transaction/fintChooser";
import { MainFint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/auction/rootDomainCreate/launch/launchFeeCrypto/launchFeeCrypto.css"
import SettleBills from "@/components/common/transaction/createDomainSettleBills";

export interface LaunchFeeCryptoProps {
    confirmToCreate: () => void;
}

const LaunchFeeCrypto: React.FC<LaunchFeeCryptoProps> = ({
    confirmToCreate
}) => {

    const [chooseFint, setChooseFint] = useState<MainFint>(MainFint.SOL)
    const {t} = useTranslation()

    return(
        <div className="launchctypto">
            <div className="launchfeeway">
                <h1>{t("payfint")}</h1>
                <FintChooser activeFint={chooseFint} setActiveFint={setChooseFint} />
                <h4 className="attention">{t("attention")}:</h4>
                <div className="attentionblock">
                    <h1></h1>
                </div>
            </div>
            <SettleBills confirmFunction={confirmToCreate}/>
        </div>
    )
}


export default LaunchFeeCrypto;