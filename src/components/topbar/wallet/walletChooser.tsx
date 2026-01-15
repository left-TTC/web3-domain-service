

import "@/style/components/topbar/wallet/walletChoose.css"
import { detectPhoneWallet, type DetectWalletParams } from "@/utils/functional/wallet/detectPhoneWallet";
import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { useConnection, useWallet, type Wallet } from "@solana/wallet-adapter-react";

export interface WalletChooserProps{
    setChooserOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const WalletChooser: React.FC<WalletChooserProps> = ({setChooserOpen}) => {

    const { wallets, select, connect } = useWallet();
    const {connection} = useConnection()

    const [availableWallets, setAvailableWallets] = useState<DetectWalletParams[]>([])

    //desktop can also use the wallet lists
    useEffect(() => {
        setAvailableWallets(detectPhoneWallet())
    }, [])

    const clickChooseWallet = async(wallet: Wallet) => {
        console.log(connection.rpcEndpoint)
        select(wallet.adapter.name);
        connect()
        setChooserOpen(false)
    }

    const ifWalletDetect = (wallet: Wallet | DetectWalletParams) => {
        const name = "adapter" in wallet ? wallet.adapter.name : wallet.name;
        const exist = availableWallets.some(
            (wallet) => wallet.name.toLowerCase() === name.toLowerCase()
        )
        return exist
    }
    

    return(
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[1000]">
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(32,32,32,0.6)] backdrop-blur-[10px]"/>

            <div className="relative w-full max-w-[440px] bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden">
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

                    {wallets.map((wallet, index) => (
                        <button className="walletchoosebutton" key={index} onClick={() => clickChooseWallet(wallet)}>
                            <div className="walletchoosebuleft">
                                <img src={wallet.adapter.icon} width={32} alt="" />
                                <h1>{wallet.adapter.name}</h1>
                            </div>
                            {(ifWalletDetect(wallet) &&
                                <h2>Detected</h2>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WalletChooser
