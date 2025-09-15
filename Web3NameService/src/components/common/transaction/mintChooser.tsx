
import Solana from "@/assets/solana.svg"
import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto"

import "@/style/components/commonStyle/transaction/mintChooser.css"
import { getNowUsableMint } from "@/utils/functional/common/mint/getNowUsableMint"
import { useTranslation } from "react-i18next"

export interface MintChooserProps {
    activeMint: MainMint,
    setActiveMint: (mint: MainMint) => void,
}


const MintChooser: React.FC<MintChooserProps> = ({
    activeMint, setActiveMint
}) => {

    const {t} = useTranslation()

    const returnMainMint = (mintType: MainMint) => {
        switch(mintType){
            case MainMint.SOL:
                return Solana;
        }
    }

    const availableMint = getNowUsableMint();

    return(
        <div className="mintChooseBl">
            <div className="mintchoosetl">
                <h3>{t("paymint")}</h3>
            </div>
            <div className="mintChooser">
                {availableMint.map(mainMint => (
                    <button 
                        key={mainMint} 
                        className={`mintChoose ${mainMint===activeMint ? 'mintActive':''}`}
                        onClick={() => setActiveMint(mainMint)}
                    >
                        <img src={returnMainMint(mainMint)} className="minticon" />
                        <h2>{mainMint}</h2>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default MintChooser;