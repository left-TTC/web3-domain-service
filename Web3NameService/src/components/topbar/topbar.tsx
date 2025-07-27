import Wallet from "./wallet/wallet";


import "@/style/components/topbar/topbar.css"
import { useRef, useState } from "react";
import WalletDropDownBox from "./wallet/walletDropDownBox";
import WalletChooser from "./wallet/walletChoose";
import Navigation from "./navigation/navigation";
import MyDomain from "./usr/myDomain";

export interface TopbarProps {
    openDomainQueryPage: () => void
}

const Topbar: React.FC<TopbarProps> = ({
    openDomainQueryPage
}) => {


    const [showWalletDrop, setShowWalletDrop] = useState(false);
    const [showWalletChooser, setShowWalletChooser] = useState(false);

    const walletRef = useRef<HTMLButtonElement | null>(null);
    
    return(
        <div className="topbar">
            <Navigation openDomainQueryPage={openDomainQueryPage}/>
            
            <div className="topbarwalletblcok">
                <MyDomain />
                <div className="topbarline" />
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

export default Topbar;