import { useTranslation } from "react-i18next";
import Wallet from "./topbar/wallet/wallet";


import "@/style/components/topbar.css"
import { useState } from "react";
import WalletDropDownBox from "./topbar/wallet/walletDropDownBox";
import WalletChooser from "./topbar/wallet/walletChoose";



export default function Topbar() {

    const {t} = useTranslation();

    const [showWalletDrop, setShowWalletDrop] = useState(false);
    const [showWalletChooser, setShowWalletChooser] = useState(false);
    
    return(
        <div className="topbar">
            <div className="topbarwalletblcok">
                <Wallet ifShowDropBox={showWalletDrop} setDropBox={setShowWalletDrop} setWalletChooser={setShowWalletChooser}/>
                {showWalletDrop &&
                    <WalletDropDownBox />
                }
            </div>
            {showWalletChooser &&
                <WalletChooser setChooserOpen={setShowWalletChooser}/>
            }
        </div>
    )
}