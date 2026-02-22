import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { findUsrBiddingDomain } from "@/utils/net/findUsrBiddingDomain";
import type { Connection, PublicKey } from "@solana/web3.js";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";

// use local cache
// when create a auction, We can observe for a long time 
// even if it has been photographed by others.
export const biddingDomain = atomWithStorage<Record<string, number>>(
    "web3AuctionDomains",
    {}
)

export function useAuctioningDomain(
    connection: Connection,
    usr: PublicKey | null
){
    const [auctioningDomains, setAuctioningDomains] = useAtom(biddingDomain)

    const [ifFromRpc, setIfFromRpc] = useState(false)
    const [auctionState, setAuctionState] = useState<NameAuctionState[]>([])

    console.log(auctioningDomains)
    
    useEffect(() => {
        // change to new device or delete the cache 
        // we can fetch one
        if(auctioningDomains.length === 0 && usr){
            (async () => {
                try{
                    console.log("start fetch auctioning domain")
                    
                    const {validStates} = await findUsrBiddingDomain(
                        connection, usr
                    )

                    const record = validStates.reduce<Record<string, number>>((state, item) => {
                        state[item.getName()] = item.highestPrice.toNumber();
                        return state
                    }, {})

                    // should add new but change
                    setAuctioningDomains(record) 
                    setAuctionState(validStates)
                    setIfFromRpc(true)
                    console.log(auctioningDomains)
                }catch(err){
                    console.log(err)
                }
            })()
        }
    }, [usr])

    return { auctioningDomains, auctionState, ifFromRpc }
}