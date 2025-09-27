import { NAME_STATE_LENGTH } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import type { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";



export function useFetchAllRentExemption(
    usr: PublicKey | null,
    connection: Connection,
    name: string,
    rootDomain: string | null, 
){
    
    const [refferrerRecordRent, setRefferrerRecordRent] = useState(0)
    const [nameStateRent, setNameStateRent] = useState(0)
    const [calculating, setCalculating] = useState(true)

    useEffect(() => {
        const fetchAllRent = async() => {
            if(usr && rootDomain) {
                const refferrerAccountInfo = await connection.getAccountInfo(
                    getRefferrerRecordKey(usr)
                )
                if(!refferrerAccountInfo){
                    setRefferrerRecordRent(await connection.getMinimumBalanceForRentExemption(32))
                }

                const domainAndRoot = cutDomain(name)

                if(rootDomain != domainAndRoot[1]){
                    console.log("root error")
                }

                const nameStateKey = getNameStateKey(
                    getHashedName(domainAndRoot[0]), getNameAccountKey(getHashedName(rootDomain))
                )
                const nameStateInfo = await connection.getAccountInfo(
                    nameStateKey
                )
                if(!nameStateInfo){
                    setNameStateRent(await connection.getMinimumBalanceForRentExemption(NAME_STATE_LENGTH))
                }

                setCalculating(false)
            }
        }

        fetchAllRent()
    }, [usr, rootDomain])

    return {refferrerRecordRent, nameStateRent, calculating}
}