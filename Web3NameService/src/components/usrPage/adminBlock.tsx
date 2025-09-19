import { returnProjectVault } from "@/utils/constants/constants";
import { checkIfProjectStart } from "@/utils/functional/common/project/checkIfProjectStart";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

import "@/style/components/usrPage/adminBlock.css"
import { startProject } from "@/utils/net/mainFunction/startProject";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";

export const web3ProjectStarted = atomWithStorage<boolean>(
    'web3DomianProject',
    false
)

const AdminBlcok = () => {

    const {connection} = useConnection()
    const {publicKey: admin, signTransaction} = useWalletEnv()
    const solanaToast = useSolanaToast()

    const [ifProjectStarted, setIfProjectStarted] = useAtom(web3ProjectStarted)
    const [ifReload, setIfReload] = useState(false)

    useEffect(() => {
        const checkProject = async() => {
            console.log("checkProject")
            setIfProjectStarted(await checkIfProjectStart(connection))
        }

        if(!ifProjectStarted) checkProject()
    }, [])

    const [vaultBalance, setVaultBalance] = useState("loaing");

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

    const startweb3Project = async() => {
        await startProject(
            connection, signTransaction, admin, solanaToast
        )
    }

    return(
        <div className="adminbl">
            {ifProjectStarted? (
                <div className="vaultinfo">
                    <div className="vaultbalance">
                        <h1>Vault Balance:</h1>
                        <h2>{vaultBalance} SOL</h2>
                    </div>
                    <div className="vaultopratrion">
                        <button className="transfer">
                            <h1>transfer in</h1>
                        </button>
                        <button className="transfer">
                            <h1>transfer out</h1>
                        </button>
                    </div>
                </div>
            ):(
                <div className="startpjbl">
                    <h1>Web3, Start up!!!</h1>
                    <button className="startProject pixel" onClick={() => startweb3Project()}>
                        <h1>Start</h1>
                    </button>
                </div>
            )}
        </div>
    )
}

export default AdminBlcok;
