import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { DomainState, getDomainTimeState } from "@/utils/functional/common/time/getDomainTimeState";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";



export function useSortSettleAndAuction(
    auctionState: Map<string, NameAuctionState> | null,
    ifLoadedAuctionState: boolean,
    allAuctionName: Record<string, number>,
){

    const { connection } = useConnection()

    const [onAuctionItems, setOnAuctionItems] = useState<Map<string, NameAuctionState> | null>(null)
    const [onSettleItems, setOnSettleItems] = useState<Map<string, NameAuctionState> | null>(null)

    const fetched = useRef(false)

    useEffect(() => { 
        console.log("allauction name: ", allAuctionName)
        if (!allAuctionName || Object.keys(allAuctionName).length === 0) return
        if(fetched.current) return
        (async () => {
            if(ifLoadedAuctionState){
                //don't need to load info again
                console.log("don't need load again")
                fetched.current = true

                if(!auctionState) return //no items
                const domains: string[] = Array.from(auctionState.keys());
                let auctionItems = new Map<string, NameAuctionState>()
                let settleItems = new Map<string, NameAuctionState>()

                for(const domain of domains){
                    const thisState = auctionState.get(domain)!;
                    switch(getDomainTimeState(thisState)){
                        case DomainState.Auctioning:
                            auctionItems.set(domain, thisState)
                            break
                        case DomainState.Settling:
                            settleItems.set(domain, thisState)
                    }
                }

                setOnAuctionItems(auctionItems)
                setOnSettleItems(settleItems)
            }else{
                //need to fetch auction info again
                fetched.current = true
                console.log("need load again")

                const domains: string[] = Object.keys(allAuctionName);

                let auctionItems = new Map<string, NameAuctionState>()
                let settleItems = new Map<string, NameAuctionState>()

                let accounts: PublicKey[] = []
                for(const domain of domains){
                    const domainAndRoot = cutDomain(domain)
                    const key = getNameStateKey(getHashedName(domainAndRoot[0]), getNameAccountKey(getHashedName(domainAndRoot[1])))

                    accounts.push(key)
                }

                console.log("auctions domains", domains)

                const infos = await connection.getMultipleAccountsInfo(accounts)
                infos.forEach((info, index) => {
                    if(!info) return

                    const state = new NameAuctionState(info)
                    switch(getDomainTimeState(state)){
                        case DomainState.Auctioning:
                            auctionItems.set(domains[index], state)
                            break
                        case DomainState.Settling:
                            settleItems.set(domains[index], state)
                            break
                    }
                })

                setOnAuctionItems(auctionItems)
                setOnSettleItems(settleItems)
            }
        })()
    }, [allAuctionName])

    console.log("auction", onAuctionItems)
    console.log("settle", onSettleItems)

    return { onAuctionItems, onSettleItems }
}