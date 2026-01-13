

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"

import { cutString } from "@/utils/functional/common/cutString";
import { animate } from "animejs";
import WalletDropDownBox from "./walletDropDownBox";
import { PixelAvatar } from "@/components/common/show/genIcon";
import { ChevronDown, Wallet2 } from "lucide-react";

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

    const {
        connected,
        publicKey,
    } = useWalletEnv();

    const [walletAddress, setWalletAddress] = useState<string>("");
    
    useEffect(() => {
        if(publicKey){
            setWalletAddress(cutString(publicKey.toBase58(), 5, 5, "..."));
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
            setWalletChooser(true);
        }
    }

    return(
        <div className="relative h-[60%] flex items-center">
            <button className={`flex relative items-center h-full rounded-lg overflow-hidden ${connected && "border-[2px] border-white/30"}`} onClick={walletClick} ref={walletRef}>
                {connected ?
                    (
                        <div className="flex row justify-between items-center gap-[10px] md:gap-[20px] sm:px-[20px] py-[5px]">
                            
                            <PixelAvatar text={publicKey!.toBase58()} size={20}/>
                            <div className="row gap-[8px] items-center hidden md:flex">
                                <h3 className="text-white text-[16px] opacity-80 font-normal">{walletAddress}</h3>
                                <div className="bg-[#434C52] rounded-full" ref={arrayRef}>
                                    <ChevronDown className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="flex row justify-between items-center gap-[10px] md:gap-[10px] bg-[#B4FC75] w-full h-full px-[20px] py-[5px] hover:opacity-80">
                            <h3 className="text-black text-[16px] opacity-80 font-bold hidden lg:flex">{t("connect")}</h3>
                            <Wallet2 className="w-5 h-5 text-black" />
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