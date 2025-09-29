import { findUsrBiddingDomain } from "@/utils/net/findUsrBiddingDomain";
import type { Connection, PublicKey } from "@solana/web3.js";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

// use local cache
// when create a auction, We can observe for a long time 
// even if it has been photographed by others.
export const biddingDomain = atomWithStorage<string[]>(
    "web3AuctionDomain",
    []
)

export function useAuctioningDomain(
    connection: Connection,
    usr: PublicKey | null
){
    const [auctioningDomain, setAuctioningDomain] = useAtom(biddingDomain)
    
    useEffect(() => {
        const fetchMyAuctioningDomain = async() => {
            try{
                const auctioningDomains = await findUsrBiddingDomain(
                    connection, usr
                )
                // should add new but change
                setAuctioningDomain(auctioningDomains)
            }catch(err){
                console.log(err)
            }
        }
    
        // change to new device or delete the cache 
        // we can fetch one
        if(!auctioningDomain)fetchMyAuctioningDomain()
    }, [usr])

    return { auctioningDomain }
}