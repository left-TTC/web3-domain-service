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
                console.log("start fetch")
                const auctioningDomains = await findUsrBiddingDomain(
                    connection, usr
                )
                // should add new but change
                setAuctioningDomain(auctioningDomains)
                console.log(auctioningDomain)
            }catch(err){
                console.log(err)
            }
        }
    
        // change to new device or delete the cache 
        // we can fetch one
        if(auctioningDomain.length === 0 && usr){
            console.log("need fetch: ")
            fetchMyAuctioningDomain()
        }
    }, [usr])

    useEffect(() => {
        const unique = Array.from(new Set(auctioningDomain));
        setAuctioningDomain(unique)
    }, [])

    return { auctioningDomain }
}