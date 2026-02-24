import { useState } from "react";
import CreatingRootShow from "./rootDomainCreate/creatingRootShow";
import CreateRootPost from "./rootDomainCreate/createRootPost";
import DomainSettlementModal, { SettleType } from "../settle/settlement";
import { tryToCreateRootDomain } from "./rootDomainCreate/launch/tryToCreateRootDomain";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useGlobalModal } from "../common/show/info";
import { ifRootValid } from "@/utils/functional/domain/ifDomainLegal";
import { TransactionState } from "@/utils/functional/instructions/transactionState";


export default function RootDomainCreate(){
    
    const {connection} = useConnection()
    const {publicKey, signTransaction} = useWalletEnv()
    const info = useGlobalModal()

    const [showLaunchSettle, setShowLaunchSettle] = useState(false)

    const [newRoot, setNewRoot] = useState("")

    const createRootState = async() => {
        if(ifRootValid(newRoot)){
            return await tryToCreateRootDomain(
                newRoot,
                connection,
                signTransaction,
                publicKey
            )
        }else{
            console.log("init should > 0")
            info.showModal({
                title: "Invalid root name",
                content: "root name should be all lowercase and no space",
                type: "error"
            })
            return TransactionState.Ignore
        }
    }

    return(
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 relative overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.08]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15]"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6  md:pt-16 relative z-10 flex flex-col gap-20 mt-30">
                <CreatingRootShow />
                <CreateRootPost 
                    newRoot={newRoot}
                    setNewRoot={setNewRoot}
                    showSettle={() => setShowLaunchSettle(true)}
                />
            </main>

            {showLaunchSettle && 
                <DomainSettlementModal
                    opearationName={newRoot}
                    actionType={SettleType.CREATEROOT}
                    basePrice={0}
                    onClose={() => setShowLaunchSettle(false)}
                    onConfirm={createRootState}
                />
            }
        </div>
    )

}