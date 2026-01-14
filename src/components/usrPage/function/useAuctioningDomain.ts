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
    const [auctioningDomain, setAuctioningDomain] = useAtom(biddingDomain)

    const [ifFromRpc, setIfFromRpc] = useState(false)
    const [auctionState, setAuctionState] = useState<Map<string, NameAuctionState> | null>(null)

    console.log(auctioningDomain)
    
    useEffect(() => {
        // change to new device or delete the cache 
        // we can fetch one
        if(auctioningDomain.length === 0 && usr){
            (async () => {
                try{
                    console.log("start fetch auctioning domain")
                    
                    const {priceMap: auctioningDomains, stateMap} = await findUsrBiddingDomain(
                        connection, usr
                    )
                    // should add new but change
                    setAuctioningDomain(auctioningDomains)
                    setAuctionState(stateMap)
                    setIfFromRpc(true)
                    console.log(auctioningDomain)
                }catch(err){
                    console.log(err)
                }
            })()
        }
    }, [usr])

    return { auctioningDomain, auctionState, ifFromRpc }
}