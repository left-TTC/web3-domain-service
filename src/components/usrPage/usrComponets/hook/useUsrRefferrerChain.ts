import { RefferrerRecordState } from "@/utils/functional/common/class/refferrerRecordState";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { useConnection } from "@solana/wallet-adapter-react";
import type { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";


export function useUsrRefferrerChain(
    checkingUsr: PublicKey | null,
    fetched: React.RefObject<boolean>,
){

    const {connection} = useConnection()

    const [usrProfit, setUsrProfit] = useState<number | null>(null)
    const [usrVolume, setUsrVolume] = useState<number | null>(null)
    
    useEffect(() => {
        const fetchTest = async() => {
            if(checkingUsr && !fetched.current){
                fetched.current = true
                const testUsr = await connection.getAccountInfo(
                    getRefferrerRecordKey(checkingUsr)
                )

                if(testUsr){
                    const state = new RefferrerRecordState(testUsr) 

                    console.log(checkingUsr.toBase58(), "'s refferrer is", state.refferrer.toBase58())

                    setUsrProfit(state.profit.toNumber())
                    setUsrVolume(state.volume.toNumber())
                }
            }
        }

        fetchTest()
    }, [checkingUsr])

    return {
        usrProfit, usrVolume
    }
}