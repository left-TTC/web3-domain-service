import { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { DomainState, getDomainTimeState } from "@/utils/functional/common/time/getDomainTimeState";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getRecordKey, RecordType } from "@/utils/functional/solana/getRecordKey";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";



export function useSortSettleAndAuction(
    auctionState: NameAuctionState[],
    ifLoadedAuctionState: boolean,
    allAuctionName: Record<string, number>
){

    const { connection } = useConnection()

    const [onAuctionItems, setOnAuctionItems] = useState<NameAuctionState[]>([])
    const [onSettleItems, setOnSettleItems] = useState<NameAuctionState[]>([])

    const [allRecordState, setAllRecordState] = useState<Map<string, IPFSRecordState>>()

    const fetched = useRef(false)
    const fetchRecord = useRef(false)

    useEffect(() => { 
        const domains: string[] = Object.keys(allAuctionName);
        if (domains.length === 0) return
        if(fetched.current) return

        (async () => {
            if(ifLoadedAuctionState){
                //don't need to load info again
                console.log("don't need load again")
                fetched.current = true

                let auctionItems: NameAuctionState[] = []
                let settleItems: NameAuctionState[] = []

                for(const state of auctionState){
                    switch(getDomainTimeState(state)){
                        case DomainState.Auctioning:
                            auctionItems.push(state)
                            break;
                        case DomainState.Settling:
                            settleItems.push(state)
                    }
                }

                setOnAuctionItems(auctionItems)
                setOnSettleItems(settleItems)
            }else{
                //need to fetch auction info again
                fetched.current = true
                console.log("need load again")

                let auctionItems: NameAuctionState[] = []
                let settleItems: NameAuctionState[] = []

                let accounts: PublicKey[] = []
                for(const domain of domains){
                    const domainAndRoot = cutDomain(domain)
                    const key = getNameStateKey(getHashedName(domainAndRoot[0]), getNameAccountKey(getHashedName(domainAndRoot[1])))

                    accounts.push(key)
                }

                console.log("auctions domains", allAuctionName)

                const infos = await connection.getMultipleAccountsInfo(accounts)
                infos.forEach((info, _) => {
                    if(!info) return

                    const state = new NameAuctionState(info)
                    switch(getDomainTimeState(state)){
                        case DomainState.Auctioning:
                            auctionItems.push(state)
                            break
                        case DomainState.Settling:
                            settleItems.push(state)
                            break
                    }
                })

                setOnAuctionItems(auctionItems)
                setOnSettleItems(settleItems)
            }
        })()
    }, [allAuctionName, connection, ifLoadedAuctionState, auctionState])

    useEffect(() => {
        const domains: string[] = Object.keys(allAuctionName);
        if (domains.length === 0) return
        if(fetchRecord.current) return

        (async () => {
            fetchRecord.current = true
            console.log("fetching record states")

            const recordMap = new Map<string, IPFSRecordState>();
            let recordKeys: PublicKey[] = []

            for(const domain of domains){
                const domainAndRoot = cutDomain(domain)
                const nameAccountKey = getNameAccountKey(
                    getHashedName(domainAndRoot[0]), null, getNameAccountKey(getHashedName(domainAndRoot[1]))
                )
                const recordKey = getRecordKey(nameAccountKey, RecordType.DNS)
                recordKeys.push(recordKey)
            }

            const recordInfos = await connection.getMultipleAccountsInfo(recordKeys)
            recordInfos.forEach((info, index) => {
                if(!info) return

                const recordState = new IPFSRecordState(info)

                const domain = domains[index]
                recordMap.set(domain, recordState)
            })

            setAllRecordState(recordMap)
            console.log("record states loaded", recordMap)
        })()
    }, [allAuctionName, connection])

    return { onAuctionItems, onSettleItems, allRecordState }
}