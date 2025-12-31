import { useState } from "react";
import CreatingRootShow from "./rootDomainCreate/creatingRootShow";
import CreateRootPost from "./rootDomainCreate/createRootPost";
import DomainSettlementModal, { SettleType } from "../settle/settlement";
import { tryToCreateRootDomain } from "./rootDomainCreate/launch/functionalComponents/tryToCreateRootDomain";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { TransactionState } from "@/provider/fixedToastProvider/fixedToastProvider";




export default function RootDomainCreate(){
    
    const {connection} = useConnection()
    const {publicKey, signTransaction} = useWalletEnv()

    const [showLaunchSettle, setShowLaunchSettle] = useState(false)

    const [newRoot, setNewRoot] = useState("")
    const [initialSol, setInitialSol] = useState(0)

    const openLanunchSettleAndRecordPosition = () => {
        setShowLaunchSettle(true)
    }

    const createRootState = async() => {
        if(initialSol > 0 && newRoot.length > 0){
            return await tryToCreateRootDomain(
                newRoot,
                initialSol,
                connection,
                signTransaction,
                publicKey
            )
        }else{
            return TransactionState.Error
        }
    }

    return(
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 relative overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.08]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15]"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-16 relative z-10 flex flex-col gap-20 mt-30">
                <CreatingRootShow
                    openLanunchSettleAndRecordPosition={openLanunchSettleAndRecordPosition}
                />
                <CreateRootPost 
                    newRoot={newRoot}
                    setNewRoot={setNewRoot}
                    initialSol={initialSol}
                    setInitialSol={setInitialSol}
                    showSettle={() => setShowLaunchSettle(true)}
                />
            </main>

            {showLaunchSettle && 
                <DomainSettlementModal
                    opearationName={newRoot}
                    actionType={SettleType.root}
                    basePrice={initialSol * 1e9}
                    onClose={() => setShowLaunchSettle(false)}
                    onConfirm={createRootState}
                />
            }
        </div>
    )

}