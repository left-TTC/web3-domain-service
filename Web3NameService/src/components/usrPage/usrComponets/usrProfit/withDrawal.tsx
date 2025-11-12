import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { useConnection } from "@solana/wallet-adapter-react"
import { extractUserProfit } from "../usrAuction/function/extractUserProfit"

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
                <h1>profit: {usrProfit? `${(usrProfit / 1e9).toFixed(4)} SOL`:"0"}</h1>
                <h2>volume: {usrVolume? `${(usrVolume / 1e9).toFixed(4)} SOL`:"0"}</h2>
            </div>

            <button onClick={() => extractUserProfit(signTransaction,
                user, solanaToast, connection
            )}>
                extract 0.01 SOL
            </button>
        </div>
    )
}


export default WithDrawal;
