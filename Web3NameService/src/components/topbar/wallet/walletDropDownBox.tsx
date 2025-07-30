

import "@/style/components/topbar/wallet/walletDropDownBox.css"
import { useEffect, useRef } from "react";

import change from "@/assets/changeWallet.svg"
import disconnectWallet from "@/assets/disconnect.svg"
import { useTranslation } from "react-i18next";
import { useWallet } from "@solana/wallet-adapter-react";
import { animate } from "animejs";

export interface walletDropDownBoxProps{
    ifWalletDropDownShow: boolean,
    setDropDownBox: React.Dispatch<React.SetStateAction<boolean>>,
    setWalletChoose: React.Dispatch<React.SetStateAction<boolean>>,
    walletRef: React.RefObject<HTMLButtonElement | null>,
}

export interface WalletCommonBuuton{
    img: string,
    title: string,
    function: string,
}


const WalletDropDownBox: React.FC<walletDropDownBoxProps> = ({walletRef, ifWalletDropDownShow, setDropDownBox, setWalletChoose}) => {

    const walletDropRef = useRef<HTMLDivElement | null>(null);

    const {t} = useTranslation();
    const {disconnect} = useWallet();

    const walltButtonsMap: WalletCommonBuuton[] = [
        {
            img: change,
            title: t("changeWallet"),
            function: "changeWallet",
        },
        {
            img: disconnectWallet,
            title: t("disconnect"),
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
        <div className="walletdropblock" ref={walletDropRef}>
            {walltButtonsMap.map((button, index) => (
                <button key={index} className="walletdropcommonbutton" onClick={() => commonButtonClick(button.function)}>
                    <img src={button.img} alt={button.title} className="icon" />
                    <span>{button.title}</span>
                </button>
            ))}
        </div>
    )
}

export default WalletDropDownBox;
