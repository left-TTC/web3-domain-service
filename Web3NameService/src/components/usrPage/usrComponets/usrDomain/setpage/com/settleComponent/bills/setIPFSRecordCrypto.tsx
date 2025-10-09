import MintChooser from "@/components/common/transaction/mintChooser"
import { SupportedMint } from "@/provider/priceProvider/priceProvider"
import { useState } from "react"
import { useTranslation } from "react-i18next"


export interface SetIPFSRecordCryptoProps{

}

const SetIPFSRecordCrypto: React.FC<SetIPFSRecordCryptoProps> = ({

}) => {
    const {t} = useTranslation()

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    return(
        <div className="settlePriceCrypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="settlepriceblock">
                    <h3>{t("finalprice")}:</h3>
                    
                </div>
                <div className="settleine"/>
            </div>
        </div>
    )
}

export default SetIPFSRecordCrypto;
