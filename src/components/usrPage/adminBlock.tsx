
import { checkIfProjectStart } from "@/utils/functional/common/project/checkIfProjectStart";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Header from "./adminComponent/header";
import VaultManage from "./adminComponent/vaultManage";
import VaultLog from "./adminComponent/vaultLog";
import Vault from "./adminComponent/vault";

const AdminBlcok = () => {

    const {connection} = useConnection()

    const [ifProjectStarted, setIfProjectStarted] = useState(false)

    useEffect(() => {
        const checkProject = async() => {
            setIfProjectStarted(await checkIfProjectStart(connection))
        }

        if(!ifProjectStarted) checkProject()
    }, [])

    return(
        <div className="min-h-screen bg-[#0A0A0A] text-gray-100 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <Header isProjectActive={ifProjectStarted} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <VaultManage />
                    <VaultLog />
                </div>
                <Vault isProjectActive={ifProjectStarted}/>
            </div>
            
        </div>
    )
}

export default AdminBlcok;
