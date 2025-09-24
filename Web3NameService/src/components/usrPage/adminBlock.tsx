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
import VaultManage from "./adminComponent/vaultManage";
import RootConfirm from "./adminComponent/rootConfirm";

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

    

    const startweb3Project = async() => {
        await startProject(
            connection, signTransaction, admin, solanaToast
        )
    }

    return(
        <div className="adminbl">
            {ifProjectStarted? (
                <div className="projectStartbl">
                    <VaultManage />
                    <RootConfirm />
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
