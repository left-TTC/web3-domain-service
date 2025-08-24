import type { DetectWalletParams } from "@/utils/functional/wallet/detectPhoneWallet";
import { useWallet, type Wallet } from "@solana/wallet-adapter-react";
import type { WalletName } from "node_modules/@solana/wallet-adapter-base/lib/types/adapter";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import OptionalButton from "./optionalButton/optionalButton";
import { animate } from "animejs";


export interface DesktopChooseProps {
    availablePhoneWallets: DetectWalletParams[],
    setChooserOpen: React.Dispatch<React.SetStateAction<boolean>>,
    clinkNoDetectWallet: (wallet: DetectWalletParams) => void,
}

const DesktopChoose: React.FC<DesktopChooseProps> = ({
    availablePhoneWallets, setChooserOpen, clinkNoDetectWallet
}) => {

    const { wallets, select } = useWallet();

    const ifDesktopWalletDetect = (wallet: Wallet | DetectWalletParams) => {
        const name = "adapter" in wallet ? wallet.adapter.name : wallet.name;
        const exist = availablePhoneWallets.some(
            (wallet) => wallet.name.toLowerCase() === name.toLowerCase()
        )
        return exist
    }

    const clickChooseWallet = (walletName: WalletName) => {
        select(walletName);
        setChooserOpen(false)
    }

    const sortDesktopWallet = () => {
        let desktopWallets: DetectWalletParams[] = []
        for(const wallet of availablePhoneWallets){
            const exsit = wallets.some(
                (walletDevice) => walletDevice.adapter.name.toLowerCase() === wallet.name.toLowerCase()
            )
            if(!exsit){
                desktopWallets.push(wallet)
            }
        }
        return desktopWallets;
    }

    //animate get more options
    const walletChooseRef = useRef<HTMLDivElement | null>(null)
    const [showDesktopMore, setShowDesktopMore] = useState(false)

    //about 660px
    const [animateSmaller, setAnimateSmaller] = useState(false)
    const [smallHeight, setSmallHeight] = useState(0)

    const showMoreOrLess = () => {
        if(!showDesktopMore){
            if(walletChooseRef.current){
                setSmallHeight(walletChooseRef.current.scrollHeight - 20)
            }
            setShowDesktopMore(true)
        }else(
            setAnimateSmaller(true)
        )
    }

    const animateBlock = () => {
        if(showDesktopMore){
            //larger
            if(walletChooseRef.current){
                animate(walletChooseRef.current, {
                    height: [smallHeight, 660],
                    duration: 500
                })
            }
        }
        if(animateSmaller){
            if(walletChooseRef.current){
                animate(walletChooseRef.current, {
                    height: [660, smallHeight],
                    duration: 500,
                    onComplete: () => {
                        setAnimateSmaller(false)
                        setShowDesktopMore(false)
                    }
                })
            }
        }
    }
    useEffect(() => {
        animateBlock()
    }, [animateSmaller, showDesktopMore])

    

    return(
        <div className="walletchoosebl" 
            ref={walletChooseRef}
        >
            {wallets.map((wallet, index) => (
                <button className="walletchoosebutton" key={index} onClick={() => clickChooseWallet(wallet.adapter.name)}>
                    <div className="walletchoosebuleft">
                        <img src={wallet.adapter.icon} width={32} alt="" />
                        <h1>{wallet.adapter.name}</h1>
                    </div>
                    {(ifDesktopWalletDetect(wallet) &&
                        <h2>Detected</h2>
                    )}
                </button>
            ))}
            {showDesktopMore && sortDesktopWallet().map((noDetectedWallet, index) => (
                <button className="walletchoosebutton" key={index} onClick={() => clinkNoDetectWallet(noDetectedWallet)}>
                    <div className="walletchoosebuleft">
                        <img src={noDetectedWallet.icon} width={32} alt="" />
                        <h1>{noDetectedWallet.name}</h1>
                    </div>
                </button>
            ))}
            <OptionalButton 
                showMoreOrLess={showMoreOrLess}
                moreOrLess={showDesktopMore}
            />
        </div>
    )
}

export default DesktopChoose;
