
import "@/style/components/usrPage/adminComponents/rootConfirm.css"
import { CREATE_ROOT_TARGET } from "@/utils/constants/constants";
import { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { findCreatingRoot } from "@/utils/net/findCreatingRoot";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { tryToConfirmRootDomain } from "./function/tryToConfirmRootDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";


const RootConfirm = () => {

    const {connection} = useConnection()
    const {publicKey: admin, signTransaction} = useWalletEnv()
    const [needConfirmRoot, setNeedConfirmRoot] = useState<rootStateAccount[]>([])

    useEffect(() => {
        const getConfirmRoots = async() => {
            const creatingRoots = await findCreatingRoot(connection)

            const items: rootStateAccount[] = []
            for(const item of creatingRoots){
                if(item.fundState.toNumber() >= CREATE_ROOT_TARGET){
                    items.push(item)
                }
            }
            setNeedConfirmRoot(items)
        }

        getConfirmRoots()
    }, [])

    const solanaToast = useSolanaToast()

    const confirmroot = async(rootName: string) => {
        await tryToConfirmRootDomain(
            connection,
            signTransaction,
            admin,
            solanaToast,
            rootName
        )
    }

    return(
        <div className="rootconfirm">
            {needConfirmRoot? (
                <div className="confirmRootInfo">
                    {needConfirmRoot.map((root, index) => (
                        <div className="rootconfirmbu" key={index}>
                            <div className="rootname">
                                <h2>Root Name:</h2>
                                <h1>{root.creatingName}</h1>
                            </div>
                            <button className="confirmroot" onClick={() => confirmroot(root.creatingName)}>
                                <h1>Confirm</h1>
                            </button>
                        </div>
                    ))}
                </div>
            ):(
                <div className="confirmrootinconull">
                    <h1>NULL</h1>
                </div>
            )}
        </div>
    )
}

export default RootConfirm;
