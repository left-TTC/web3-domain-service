
import { useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";
import { useWallet } from "@solana/wallet-adapter-react";
import { animate } from "animejs";
import { LogOut, RefreshCcw } from "lucide-react";

export interface walletDropDownBoxProps{
    ifWalletDropDownShow: boolean,
    setDropDownBox: React.Dispatch<React.SetStateAction<boolean>>,
    setWalletChoose: React.Dispatch<React.SetStateAction<boolean>>,
    walletRef: React.RefObject<HTMLButtonElement | null>,
}

export interface WalletCommonButon{
    icon: React.ReactNode,
    function: string,
}


const WalletDropDownBox: React.FC<walletDropDownBoxProps> = ({walletRef, ifWalletDropDownShow, setDropDownBox, setWalletChoose}) => {

    const walletDropRef = useRef<HTMLDivElement | null>(null);

    const {t} = useTranslation();
    const {disconnect} = useWallet();

    const walltButtonsMap: WalletCommonButon[] = [
        {
            icon: <RefreshCcw size={16} />,
            function: "changeWallet",
        },
        {
            icon: <LogOut size={16} />,
            function: "disconnect",
        }
    ]

    const DropAnimateOpen = () => {
        if(walletDropRef.current){
            animate(walletDropRef.current, {
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 200,  
            })
        }
    }

    const DropAnimateClose = () => {
        if(walletDropRef.current){
            animate(walletDropRef.current, {
                scale: [1, 0.9],
                opacity: [1, 0],
                duration: 200,  
            })
        }
    }

    useEffect(() => {
        if(ifWalletDropDownShow){
            //open the drop block
            DropAnimateOpen()
        }else{
            DropAnimateClose()
        }
    }, [ifWalletDropDownShow])
    

    useEffect(() => {
        const handClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if(walletRef && walletRef.current){
                if (ifWalletDropDownShow && walletDropRef.current && !walletDropRef.current.contains(target) &&
                    !walletRef.current.contains(target)
                ){
                    setDropDownBox(false);
                }
            }
        };

        document.addEventListener("mousedown", handClickOutside);

        return () => {
            document.removeEventListener("mousedown", handClickOutside);
        };

    }, [ifWalletDropDownShow])

    const commonButtonClick = (functionName: string) => {
        if(functionName === "changeWallet"){
            disconnect();
            setWalletChoose(true);
            setDropDownBox(false);
        }else if(functionName === "disconnect"){
            disconnect();
            setDropDownBox(false);
        }
    }

    return(
        <div
            ref={walletDropRef}
            className="fixed top-22 z-50"
        >
            <div className="bg-[#0a0a0a] border-2 border-white/30 rounded-xl p-2 shadow-xl shadow-black/40 w-56">
                {walltButtonsMap.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => commonButtonClick(button.function)}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-200 hover:bg-white/10 transition-colors"
                    >
                        <span className="text-gray-400">
                            {button.icon}
                        </span>

                        <span className="font-medium">
                            {button.function}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default WalletDropDownBox;
