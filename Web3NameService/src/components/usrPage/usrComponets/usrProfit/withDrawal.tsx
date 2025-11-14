import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { useConnection } from "@solana/wallet-adapter-react"
import { extractUserProfit } from "../usrAuction/function/extractUserProfit"

import "@/style/components/usrPage/usrComponents/usrProfit/withDrawal.css"

import profit from "@/assets/profit.svg"
import volume from "@/assets/volume.svg"

interface WithDrawalProps {
    usrProfit: number | null,
    usrVolume: number | null,
}

const WithDrawal: React.FC<WithDrawalProps> = ({
    usrProfit, usrVolume
}) => {

    const {publicKey: user, signTransaction} = useWalletEnv()
    const solanaToast = useSolanaToast()
    const {connection} = useConnection()

    return (
        <div className="profitwithdrawal">
            
            <div className="profitandvolume">
                <div className="profitShow">
                    <div className="profitimgcon">
                        <img src={profit} className="profiticon" />
                    </div>
                    <div className="profitwordcon">
                        <h1>profit: </h1>
                        <h2>{usrProfit? `${(usrProfit / 1e9).toFixed(4)} SOL`:"0"}</h2>
                    </div>
                    <button 
                        className="extractbu"
                        onClick={() => extractUserProfit(signTransaction,
                            user, solanaToast, connection
                        )}
                    >
                        <h1>extract</h1>
                    </button>
                </div>
                <div className="profitwithdrawalline" />
                <div className="profitShow">
                    <div className="profitimgcon">
                        <img src={volume} className="volumeicon" />
                    </div>
                    <div className="profitwordcon">
                        <h1>volume: </h1>
                        <h2>{usrVolume? `${(usrVolume / 1e9).toFixed(4)} SOL`:"0"}</h2>
                    </div>
                </div>
                <div className="profitwithdrawalline" />
            </div>

            
        </div>
    )
}


export default WithDrawal;
