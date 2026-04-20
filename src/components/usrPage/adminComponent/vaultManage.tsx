import { returnProjectVault } from "@/utils/constants/constants";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { TrendingUp, Wallet } from "lucide-react";


const VaultManage = () => {
    const [vaultBalance, setVaultBalance] = useState("loading");
    const { connection } = useConnection()
    
    useEffect(() => {
        (async () => {
            const vault = returnProjectVault();
            const balanceData = await connection.getAccountInfo(vault);
            console.log("vault data: ", balanceData)
            if (!balanceData) {
                setVaultBalance("UnInit") 
                return
            }
            const bl = balanceData.lamports
            setVaultBalance((bl / 1e9).toFixed(4))
        })()

    }, [])

    return (
        <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <span className="text-gray-500 font-bold text-xs tracking-widest uppercase">Current Vault Balance</span>
                    <Wallet className="text-gray-600" size={20} />
                </div>
                <div className="flex items-end gap-3">
                    <h2 className="text-6xl font-black tracking-tighter tabular-nums">
                        {vaultBalance}
                    </h2>
                    <span className="text-[#B4FC75] font-bold text-xl mb-2">SOL</span>
                </div>
            </div>
        </div>
    )
}

export default VaultManage;
