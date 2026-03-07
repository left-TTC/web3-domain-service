import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { findUsrBiddingDomain } from "@/utils/net/findUsrBiddingDomain";
import type { Connection, PublicKey } from "@solana/web3.js";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

// use local cache
// when create a auction, We can observe for a long time 
// even if it has been photographed by others.
export const biddingDomain = atomWithStorage<Record<string, Record<string, number>>>(
    "web3AuctionDomains",
    {}
)

export function useAuctioningDomain(
    connection: Connection,
    searchKey: PublicKey | null,
    usr: boolean,
){
    const [auctioningDomains, setAuctioningDomains] = useAtom(biddingDomain)

    const [ifFromRpc, setIfFromRpc] = useState(false)
    const [auctionState, setAuctionState] = useState<NameAuctionState[]>([])

    const [current, setCurrent] = useState<Record<string, number>>({})

    useEffect(() => {
        if(!searchKey) return

        const pubkeyStr = searchKey.toBase58()

        if(auctioningDomains[pubkeyStr]){
            setCurrent(auctioningDomains[pubkeyStr])
            setIfFromRpc(false)
            return
        }

        ;(async () => {
            try{
                console.log("start fetch auctioning domain")

                const { validStates } = await findUsrBiddingDomain(
                    connection,
                    searchKey
                )

                const record = validStates.reduce<Record<string, number>>(
                    (state, item) => {
                        state[item.getName()] = item.highestPrice.toNumber()
                        return state
                    },
                    {}
                )

                setCurrent(record)

                setAuctionState(validStates)
                setIfFromRpc(true)

                if(usr){
                    setAuctioningDomains(prev => ({
                        ...prev,
                        [pubkeyStr]: {
                            ...prev[pubkeyStr],
                            ...record
                        }
                    }))
                }

            }catch(err){
                console.log(err)
                setCurrent({})
            }
        })()

    }, [searchKey, usr, connection])

    return {
        currentAuction: current,
        auctionState,
        ifFromRpc
    }
}