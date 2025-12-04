

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"

import array from "@/assets/array.svg"
import connectWallet from "@/assets/connectwallet.svg"

import "@/style/components/topbar/wallet/wallet.css"
import { cutString } from "@/utils/functional/common/cutString";
import { animate } from "animejs";
import WalletDropDownBox from "./walletDropDownBox";
import Identicon from "@/components/common/show/usr/identicon";

export interface WalletProps{
    ifShowDropBox: boolean,
    setDropBox: React.Dispatch<React.SetStateAction<boolean>>,
    setWalletChooser: React.Dispatch<React.SetStateAction<boolean>>,
    walletRef: React.RefObject<HTMLButtonElement | null>,
}

const Wallet: React.FC<WalletProps> = ({
    ifShowDropBox, setDropBox, setWalletChooser, walletRef
}) => {

    const {t} = useTranslation();
    
    const arrayRef = useRef<HTMLDivElement | null> (null);

    //wallet's function
    const {
        //function to connect wallet`
        connect,
        connected,
        publicKey,
        wallet,
    } = useWalletEnv();

    const [walletAddress, setWalletAddress] = useState<string>("");
    
    useEffect(() => {
        if(publicKey){
            setWalletAddress(cutString(publicKey.toBase58(), 5, 5));
        }
    }, [publicKey]);

    useEffect(() => {
        const array = arrayRef.current;
        if(array && ifShowDropBox){
            animate(array, {
                rotate: '180deg',
                duration: 100,
            })
        }else if(array){
            animate(array, {
                rotate: '360deg',
                duration: 100,
            })
        }
    }, [ifShowDropBox])

    const walletClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("clinck:", connected)
        if(connected){
            setDropBox(prev => !prev);
        }else{
            if(!wallet){
                setWalletChooser(true);
                return;
            }
            connect()
        }
    }

    return(
        <div className="walletpackage">
            <button className="wallet" onClick={walletClick} ref={walletRef}>
                {connected ?
                    (
                        <div className="walletConnected border-white/10">
                            
                            <div className="walletusericon">
                                <Identicon pubkey={publicKey!.toBase58()}/>
                            </div>
                            <h1>{walletAddress}</h1>
                            <div className="walletarray" ref={arrayRef}>
                                <img src={array} className="arrayicon"/>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="walletconnect">
                            <h1 className="font-semibold">{t("connect")}</h1>
                            <img src={connectWallet} className="walletconnectimg" /> 
                        </div>
                    )
                }      
            </button>
            {ifShowDropBox &&
                <WalletDropDownBox
                    walletRef={walletRef} 
                    ifWalletDropDownShow={ifShowDropBox} 
                    setDropDownBox={setDropBox} 
                    setWalletChoose={setWalletChooser}
                />                
            } 
        </div>
    )
}

export default Wallet;