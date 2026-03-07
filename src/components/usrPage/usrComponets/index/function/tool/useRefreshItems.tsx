import { biddingDomain } from "@/components/usrPage/function/useAuctioningDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { findUsrBiddingDomain } from "@/utils/net/findUsrBiddingDomain";
import { useConnection } from "@solana/wallet-adapter-react";
import type { PublicKey } from "@solana/web3.js";
import { useAtom } from "jotai";
import { useCallback } from "react";

export function useRefreshItems(
    searchKey: PublicKey | null,
    allAuctionName: Record<string, number>,
) {

    const { publicKey: usr } = useWalletEnv()
    const { connection } = useConnection()

    const [auctioningDomains, setAuctioningDomains] = useAtom(biddingDomain)

    const refresh = useCallback(async () => {

        if (!usr) return
        if (!searchKey) return

        const usrKey = usr.toBase58()

        const nowRecord = auctioningDomains[usrKey] ?? {}

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

        const shouldUpdateLocal =
            Object.keys(nowRecord).length !== 0 ||
            searchKey.toBase58() === usrKey

        if (shouldUpdateLocal) {
            console.log("update local")
            setAuctioningDomains(prev => ({
                ...prev,
                [usrKey]: {
                    ...prev[usrKey],
                    ...record
                }
            }))
        }

        Object.entries(record).forEach(([name, price]) => {
            allAuctionName[name] = price
        })

    }, [usr, connection, searchKey, auctioningDomains, setAuctioningDomains, allAuctionName])

    return { refresh }
}