
import { checkIfProjectStart } from "@/utils/functional/common/project/checkIfProjectStart";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

import "@/style/components/usrPage/adminBlock.css"
import { startProject } from "@/utils/net/mainFunction/startProject";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import VaultManage from "./adminComponent/vaultManage";

const AdminBlcok = () => {

    const {connection} = useConnection()
    const {publicKey: admin, signTransaction} = useWalletEnv()

    const [ifProjectStarted, setIfProjectStarted] = useState(false)

    useEffect(() => {
        const checkProject = async() => {
            setIfProjectStarted(await checkIfProjectStart(connection))
        }

        if(!ifProjectStarted) checkProject()
    }, [])

    
    const startweb3Project = async() => {
        await startProject(
            connection, signTransaction, admin
        )
    }

    return(
        <div className="adminbl">
            {ifProjectStarted? (
                <div className="projectStartbl">
                    <VaultManage />
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
