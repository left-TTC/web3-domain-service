import Wallet from "./wallet/wallet";


import "@/style/components/topbar/topbar.css"
import { useRef, useState } from "react";
import WalletChooser from "./wallet/walletChoose";
import Navigation from "./navigation/navigation";
import MyDomain from "./usr/myDomain";

export interface TopbarProps {
    openDomainQueryPage: () => void,
    showWalletChooser: boolean,
    setShowWalletChooser: React.Dispatch<React.SetStateAction<boolean>>,
}

const Topbar: React.FC<TopbarProps> = ({
    openDomainQueryPage, showWalletChooser, setShowWalletChooser
}) => {

    const [showWalletDrop, setShowWalletDrop] = useState(false);

    const walletRef = useRef<HTMLButtonElement | null>(null);
    
    return(
        <div className="w-full h-20 border-b border-white/20 backdrop-blur-xl flex items-center justify-center px-4 md:px-6 fixed top-0 z-50 bg-[#050505]/80">
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

            {showWalletChooser &&
                <WalletChooser setChooserOpen={setShowWalletChooser}/>
            }
        </div>
    )
}

export default Topbar;