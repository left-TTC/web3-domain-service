import Wallet from "./wallet/wallet";

import { useRef, useState } from "react";
import WalletChooser from "./wallet/walletChooser";
import Navigation from "./navigation/navigation";
import MyDomain from "./navigation/myDomain";

export interface TopbarProps {
    openDomainQueryPage: () => void,
    showWalletChooser: boolean,
    setShowWalletChooser: React.Dispatch<React.SetStateAction<boolean>>,
    show: boolean
}

const Topbar: React.FC<TopbarProps> = ({
    openDomainQueryPage, showWalletChooser, setShowWalletChooser, show
}) => {

    const [showWalletDrop, setShowWalletDrop] = useState(false);

    const walletRef = useRef<HTMLButtonElement | null>(null);
    
    return(
        <div className={`w-full h-20 border-b border-white/20 backdrop-blur-xl flex items-center justify-center px-4 md:px-6 fixed top-0 z-50 bg-[#050505]/80 ${!show && "hidden"}`}>
            <div className="relative w-full flex flex-row items-center h-full">
                <Navigation openDomainQueryPage={openDomainQueryPage}/>
                <div className="h-full absolute flex row right-[0px] md:right-[20px] items-center">
                    <MyDomain />
                    <div className="w-[1px] h-[50px] bg-white mx-[10px] md:mx-[20px] opacity-60 filter blur-[1px]" />
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