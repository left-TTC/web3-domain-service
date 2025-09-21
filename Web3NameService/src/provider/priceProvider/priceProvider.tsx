
import { PriceUpdate } from "@/utils/functional/common/class/pythPriceUpdate"
import { getSupportedPythFeed } from "@/utils/functional/common/net/getSupportedPythFeed"
import { useConnection } from "@solana/wallet-adapter-react"
import React, { useEffect, useState, type ReactNode } from "react"

export enum SupportedMint {
    SOL,
}

export interface PriceProviderContext {
    price: Map<SupportedMint, bigint> | null,
    expo: Map<SupportedMint, number> | null,
}

const PriceContext = React.createContext<PriceProviderContext>({
    price: null,
    expo: null,
})

export function usePrice() {
    return React.useContext(PriceContext);
}

export function PriceEnviromentProvider({ children }: { children: ReactNode}){
    const {connection} = useConnection()

    const keyMap = getSupportedPythFeed();

    const [priceMap, setPriceMap] = useState<Map<SupportedMint, bigint> | null>(null);
    const [expoMap, setExpoMap] = useState<Map<SupportedMint, number> | null>(null)

    async function fetchPrices() {
        const newMap = new Map<SupportedMint, bigint>();
        const newExpoMap = new Map<SupportedMint, number>();

        for (const [mint, feed] of keyMap) {
        const accountInfo = await connection.getAccountInfo(feed);
        if (!accountInfo) continue;

        const mintPriceUpdate = new PriceUpdate(accountInfo);
        const now = Math.floor(Date.now() / 1000);

        // devnet
        if (now - Number(mintPriceUpdate.priceMessage.publishTime) > 600000) {
            const refreshedAccountInfo = await connection.getAccountInfo(feed);
            if (!refreshedAccountInfo) continue;
            const refreshed = new PriceUpdate(refreshedAccountInfo);
            newMap.set(mint, refreshed.priceMessage.price);
            newExpoMap.set(mint, refreshed.priceMessage.exponent);
        } else {
            newMap.set(mint, mintPriceUpdate.priceMessage.price);
            newExpoMap.set(mint, mintPriceUpdate.priceMessage.exponent);
        }
        }
        setPriceMap(newMap);
        setExpoMap(newExpoMap);
    }

    useEffect(() => {
        fetchPrices();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("recheck")
            fetchPrices();
        }, 30_0000);

        return () => clearInterval(interval);
    }, []);

    return (
        <PriceContext.Provider value={{ price: priceMap, expo: expoMap }}>
        {children}
        </PriceContext.Provider>
    );
}
