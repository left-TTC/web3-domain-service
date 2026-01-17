

import { ChevronRight, ShieldCheck, X } from "lucide-react";
import { useConnection, useWallet, type Wallet } from "@solana/wallet-adapter-react";
import { useGlobalModal } from "@/components/common/show/info";
import { getDeviceTypeByUA } from "@/utils/functional/wallet/isPhone";

import phantom from "@/assets/phantom.svg"
import metamask from "@/assets/metaMask.svg"
import okx from "@/assets/OKXWallet(BTC).svg"

export interface WalletChooserProps{
    setChooserOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface WalletOption {
    id: string;
    name: string;
    icon: string;
    downloadUrl: string;
    deepLink: (currentUrl: string) => string;
}

export const WALLET_OPTIONS: WalletOption[] = [
    {
        id: "phantom",
        name: "Phantom",
        icon: phantom,
        downloadUrl: "https://phantom.app/download",
        deepLink: (currentUrl) =>
        `https://phantom.app/ul/browse/${encodeURIComponent(currentUrl)}`,
    },
    {
        id: "metamask",
        name: "MetaMask",
        icon: metamask, 
        downloadUrl: "https://metamask.io/download",
        deepLink: (currentUrl) =>
            `https://metamask.app.link/dapp/${encodeURIComponent(currentUrl)}`, 
    },
    {
        id: "okx",
        name: "OKX Wallet",
        icon: okx,
        downloadUrl: "https://www.okx.com/web3",
        deepLink: (currentUrl) =>
        `okx://wallet/dapp/url?dappUrl=${encodeURIComponent(currentUrl)}`,
    },
];



const WalletChooser: React.FC<WalletChooserProps> = ({setChooserOpen}) => {

    const { wallets, select, connect } = useWallet();
    const {connection} = useConnection()

    const info = useGlobalModal()

    const clickChooseWallet = async(wallet: Wallet) => {
        console.log(connection.rpcEndpoint)
        select(wallet.adapter.name);
        connect()
        setChooserOpen(false)
    }
    
    const handleConnect = (wallet: WalletOption) => {
        const currentUrl = window.location.href;
        const ifPhone = getDeviceTypeByUA()
        try {
             const a = document.createElement("a");

            if (ifPhone === "desktop") {
                a.href = wallet.downloadUrl;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
            } else {
                if (!wallet.deepLink) {
                    a.href = wallet.downloadUrl;
                    a.target = "_blank";
                } else {
                    a.href = wallet.deepLink(currentUrl);
                    a.target = "_blank"; 
                }
            }

            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch {
            info.showModal({
                type: "error",
                title: "Download or open Wallet",
                content: "can't open the page"
            })
        }
    }

    return(
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[1000]">
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(32,32,32,0.6)] backdrop-blur-[10px]"/>

            <div className="relative w-[96%] sm:w-full max-w-[480px] bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden mt-[-80px] sm:mt-[0[">
                <button
                    onClick={() => setChooserOpen(false)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 rounded-2xl bg-[#B4FC75]/10 text-[#B4FC75] mb-4">
                            <ShieldCheck size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-white">
                            连接 Solana 钱包
                        </h2>
                    </div>

                    {wallets.length ===0? (
                        WALLET_OPTIONS.map((wallet) => {

                            return (
                                <button
                                    key={wallet.id}
                                    onClick={() => handleConnect(wallet)}
                                    className="mt-3 w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/20"
                                >
                                    <div className="flex items-center gap-4">
                                        <img src={wallet.icon} alt={wallet.name} className="w-10 h-10 rounded-xl" />
                                        <div className="text-left">
                                            <div className="text-white font-bold">
                                                {wallet.name}
                                            </div>
                                            <p className="text-[12px] text-gray-500 uppercase font-normal">
                                                跳转到钱包页面
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-600" />
                                </button>
                            );
                        })
                    ):(
                        wallets.map((wallet, index) => (
                            <button 
                                className="mt-3 w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/20" 
                                key={index} onClick={() => clickChooseWallet(wallet)}
                            >
                                <div className="flex items-center gap-4">
                                    <img src={wallet.adapter.icon} className="w-10 h-10 rounded-xl"/>
                                    <h3 className="text-white font-bold text-[17px]">{wallet.adapter.name}</h3>
                                </div>
                                <h2 className="text-[12px] text-gray-500 uppercase font-normal">Detected</h2>
                            </button>
                        ))
                    )}

                </div>
            </div>
        </div>
    )
}

export default WalletChooser
