

import type { DetectWalletParams } from "@/utils/functional/wallet/detectPhoneWallet";
// import { useTranslation } from "react-i18next";
import OptionalButton from "./optionalButton/optionalButton";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
// import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";

export interface PhoneChooseProps {
    availablePhoneWallets: DetectWalletParams[],
}

const PhoneChoose: React.FC<PhoneChooseProps> = ({
    availablePhoneWallets
}) => {

    // const {t} = useTranslation()

    // const {connect} = useWalletEnv()

    //animate get more options
    const walletChooseRef = useRef<HTMLDivElement | null>(null)
    const [showPhoneMore, setShowPhoneMore] = useState(false)

    //about 660px
    const [animateSmaller, setAnimateSmaller] = useState(false)
    const [smallHeight, setSmallHeight] = useState(0)

    const showMoreOrLess = () => {
        if(!showPhoneMore){
            if(walletChooseRef.current){
                setSmallHeight(walletChooseRef.current.scrollHeight - 20)
            }
            setShowPhoneMore(true)
        }else(
            setAnimateSmaller(true)
        )
    }

    const animateBlock = () => {
        if(showPhoneMore){
            //larger
            if(walletChooseRef.current){
                animate(walletChooseRef.current, {
                    height: [smallHeight, 440],
                    duration: 500
                })
            }
        }
        if(animateSmaller){
            if(walletChooseRef.current){
                animate(walletChooseRef.current, {
                    height: [440, smallHeight],
                    duration: 500,
                    onComplete: () => {
                        setAnimateSmaller(false)
                        setShowPhoneMore(false)
                    }
                })
            }
        }
    }
    useEffect(() => {
        animateBlock()
    }, [animateSmaller, showPhoneMore])

    const availablePhoneWalletsThree = availablePhoneWallets.slice(0, 3);
    const availablePhoneWalletsLast = availablePhoneWallets.slice(4, availablePhoneWallets.length - 1)

    const onClickWallet = async (wallet: DetectWalletParams) => {
        console.log(typeof wallet)
        const provider = (window as any).phantom.solana;

        if (provider && provider.isPhantom) { 
            alert("Phantom Provider 存在且有效。");
            try{
                const resp = await provider.connect();
                alert(resp.publicKey.toString());
            }catch(e){
                alert(e)
            }
        } else if (provider) {
            alert("Provider 存在，但似乎不是 Phantom (或 isPhantom 属性丢失)。");
            // ... 继续连接逻辑，但要警惕
        } else {
            alert("Provider 不存在。");
            // ... Deep Link 逻辑
        }
    };

    return(
        <div className="walletchoosebl" ref={walletChooseRef}>
            {availablePhoneWalletsThree.map((wallet, index) => (
                <button className="walletchoosebutton" key={index} onClick={() => onClickWallet(wallet)}>
                    <img src={wallet.icon} width={32} alt="" />
                    <h1>{wallet.name}</h1>
                </button>
            ))}
            {showPhoneMore && availablePhoneWalletsLast.map((otherWallet, index) => (
                <button className="walletchoosebutton" key={index} onClick={() => onClickWallet(otherWallet)}>
                    <img src={otherWallet.icon} width={32} alt="" />
                    <h1>{otherWallet.name}</h1>
                </button>
            ))
            }
            <OptionalButton 
                showMoreOrLess={showMoreOrLess}
                moreOrLess={showPhoneMore}
            />
        </div>
    )
}

export default PhoneChoose;
