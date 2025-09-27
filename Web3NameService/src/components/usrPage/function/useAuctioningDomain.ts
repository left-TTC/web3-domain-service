import { findUsrBiddingDomain } from "@/utils/net/findUsrBiddingDomain";
import type { Connection, PublicKey } from "@solana/web3.js";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";


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
                    setAuctioningDomain(auctioningDomains)
                }catch(err){
                    console.log(err)
                }
            }
    
        fetchMyAuctioningDomain()
    }, [usr])

    return { auctioningDomain }
}