import Wallet from "./wallet/wallet";


import "@/style/components/topbar/topbar.css"
import { useRef, useState } from "react";
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
            <div className="topbarmedia">
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
                </div>
            </div>

            {/* fixed components */}
            {showWalletChooser &&
                <WalletChooser setChooserOpen={setShowWalletChooser}/>
            }
        </div>
    )
}

export default Topbar;