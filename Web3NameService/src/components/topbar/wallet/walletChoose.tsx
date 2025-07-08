import { useWallet } from "@solana/wallet-adapter-react"
import { useTranslation } from "react-i18next";
import { type WalletName } from '@solana/wallet-adapter-base';

import "@/style/components/topbar/wallet/walletChoose.css"

import exit from "@/assets/exit.svg"

export interface WalletChooserProps{
    setChooserOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const WalletChooser: React.FC<WalletChooserProps> = ({setChooserOpen}) => {

    const { wallets, select } = useWallet();
    const {t} = useTranslation();

    const clickChooseWallet = (walletName: WalletName) => {
        select(walletName);

        setChooserOpen(false)
    }

    return(
        <div className="walletchooser">
            <div className="walletchoosebackgroud"/>
            <div className="walletchoosecotent">
                <div className="walletchoosetop">
                    <h1>{t("chooseWallet")}</h1>
                    <button className="walletchooseclosebutton" onClick={() => setChooserOpen(false)}>
                        <img src={exit} className="exiticon"/>
                    </button>
                </div>
                {wallets.map((wallet) => (
                    <button className="walletchoosebutton" onClick={() => clickChooseWallet(wallet.adapter.name)}>
                        <img src={wallet.adapter.icon} width={32} alt="" />
                        <h1>{wallet.adapter.name}</h1>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default WalletChooser
