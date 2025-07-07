

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"



import "@/style/components/wallet/wallet.css"
import { cutString } from "@/utils/functional/cutString";

export interface WalletProps{
    ifShowDropBox: boolean,
    setDropBox: React.Dispatch<React.SetStateAction<boolean>>,
    setWalletChooser: React.Dispatch<React.SetStateAction<boolean>>,
}

const Wallet: React.FC<WalletProps> = ({ifShowDropBox, setDropBox, setWalletChooser}) => {

    const {t} = useTranslation();
    

    //wallet's function
    const {
        //function to connect wallet`
        connect,
        disconnect,
        connected,
        connecting,
        publicKey,
        wallet,
    } = useWalletEnv();

    const [walletAddress, setWalletAddress] = useState<string>("");
    
    useEffect(() => {
        if(publicKey){
            setWalletAddress(cutString(publicKey.toBase58(), 5, 5));
        }
    }, [connected]);

    const walletClick = () => {
        if(connected){
            setDropBox(!ifShowDropBox);
        }else{
            if(!wallet){
                setWalletChooser(true);
                return;
            }
            connect()
        }
    }

    return(
        <button className="wallet" onClick={walletClick}>
            {connected ?
                (
                    <h1>{walletAddress}</h1>
                ) :
                (
                    <h1>connect</h1>
                )
            }      
        </button>
    )
}

export default Wallet;
