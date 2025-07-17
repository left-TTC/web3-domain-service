import Wallet from "./topbar/wallet/wallet";


import "@/style/components/topbar/topbar.css"
import { useRef, useState } from "react";
import WalletDropDownBox from "./topbar/wallet/walletDropDownBox";
import WalletChooser from "./topbar/wallet/walletChoose";
import Navigation from "./topbar/navigation/navigation";



export default function Topbar() {


    const [showWalletDrop, setShowWalletDrop] = useState(false);
    const [showWalletChooser, setShowWalletChooser] = useState(false);

    const walletRef = useRef<HTMLButtonElement | null>(null);
    
    return(
        <div className="topbar">
            <Navigation />
            <div className="topbarwalletblcok">
                <Wallet 
                    ifShowDropBox={showWalletDrop} 
                    setDropBox={setShowWalletDrop} 
                    setWalletChooser={setShowWalletChooser} 
                    walletRef={walletRef}
                />
                {showWalletDrop &&
                    <WalletDropDownBox 
                        walletRef={walletRef} 
                        ifWalletDropDownShow={showWalletDrop} 
                        setDropDownBox={setShowWalletDrop} 
                        setWalletChoose={setShowWalletChooser}
                    />                
                }    
            </div>

            {/* fixed components */}
            {showWalletChooser &&
                <WalletChooser setChooserOpen={setShowWalletChooser}/>
            }
        </div>
    )
}