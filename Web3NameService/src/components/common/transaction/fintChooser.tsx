
import Solana from "@/assets/solana.svg"
import USDC from "@/assets/usdc.svg"
import USDT from "@/assets/usdt.svg"
import { MainFint } from "@/components/search/domainSettlement/paymentMethod/crypto"

import "@/style/components/commonStyle/transaction/fintChooser.css"

export interface FintChooserProps {
    activeFint: MainFint,
    setActiveFint: React.Dispatch<React.SetStateAction<MainFint>>,
}


const FintChooser: React.FC<FintChooserProps> = ({
    activeFint, setActiveFint
}) => {

    const returnMainFint = (fintType: MainFint) => {
        switch(fintType){
            case MainFint.SOL:
                return Solana;
            case MainFint.USDC:
                return USDC;
            case MainFint.USDT:
                return USDT;
        }
    }

    return(
        <div className="fintChooser">
            {Object.values(MainFint).map(mainFint => (
                <button 
                    key={mainFint} 
                    className={`fintChoose ${mainFint===activeFint ? 'fintActive':''}`}
                    onClick={() => setActiveFint(mainFint)}
                >
                    <img src={returnMainFint(mainFint)} className="finticon" />
                    <h2>{mainFint}</h2>
                </button>
            ))}
        </div>
    )
}

export default FintChooser;