import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { extractUserProfit } from "./usrAuction/function/extractUserProfit";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { useConnection } from "@solana/wallet-adapter-react";
import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrProfit.css"

interface UsrProfitProps {
    usrProfit: number | null,
    usrVolume: number | null,
}

const UsrProfit: React.FC<UsrProfitProps> = ({
    usrProfit, usrVolume
}) => {

    const {t} = useTranslation()
    
    const {publicKey: user, signTransaction} = useWalletEnv()
    const solanaToast = useSolanaToast()
    const {connection} = useConnection()

    return (
        <div className="usrprofit">
            <div className="mydomintitle">
                <h1>{t("profit")}</h1>
            </div>
            <div className="linedomain" />
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

export default UsrProfit;