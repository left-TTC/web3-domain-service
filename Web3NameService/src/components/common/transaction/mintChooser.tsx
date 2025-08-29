
import Solana from "@/assets/solana.svg"
import USDC from "@/assets/usdc.svg"
import USDT from "@/assets/usdt.svg"
import { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto"

import "@/style/components/commonStyle/transaction/mintChooser.css"

export interface MintChooserProps {
    activeMint: MainMint | OtherMint,
    setActiveMint: (mint: MainMint | OtherMint) => void,
}


const MintChooser: React.FC<MintChooserProps> = ({
    activeMint, setActiveMint
}) => {

    const returnMainMint = (mintType: MainMint) => {
        switch(mintType){
            case MainMint.SOL:
                return Solana;
            case MainMint.USDC:
                return USDC;
            case MainMint.USDT:
                return USDT;
        }
    }

    return(
        <div className="mintChooser">
            {Object.values(MainMint).map(mainMint => (
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
    )
}

export default MintChooser;