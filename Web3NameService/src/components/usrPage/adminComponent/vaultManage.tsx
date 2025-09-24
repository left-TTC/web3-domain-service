import { returnProjectVault } from "@/utils/constants/constants";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

import "@/style/components/usrPage/adminComponents/vaultManage.css"

const VaultManage = () => {

    const [vaultBalance, setVaultBalance] = useState("loaing");
    const {connection} = useConnection()
    
    useEffect(() => {
        const vault = returnProjectVault()
        const fetchVaultBalance = async() => {
            const balanceData = await connection.getAccountInfo(vault);
            if (!balanceData) {
                setVaultBalance("Error") 
                return
            }
            const bl = balanceData.lamports
            setVaultBalance((bl / 1e9).toFixed(4))
        }

        fetchVaultBalance()
    }, [])

    return(
        <div className="vaultinfo">
            <div className="vaultbalance">
                <h1>Vault Balance:</h1>
                <h2>{vaultBalance} SOL</h2>
            </div>
            <div className="vaultopratrion">
                <button className="transfer">
                    <h1>Transfer in</h1>
                </button>
                <button className="transfer">
                    <h1>Transfer out</h1>
                </button>
            </div>
        </div>
    )
}

export default VaultManage;
