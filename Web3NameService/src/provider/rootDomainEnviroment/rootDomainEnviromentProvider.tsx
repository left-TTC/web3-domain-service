import { CENTRAL_STATE_REGISTER } from "@/utils/constants/constants";
import { getAllRootDomain } from "@/utils/net/getAllRootDomain";
import { PDAReverseLookUp } from "@/utils/net/PDAReverseLookUp";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import React, { useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface RootDomainProviderContext {
    rootDomains: string[];
    activeRootDomain: string | null;
    setActiveRootDomain: (domain: string) => void;
    refreshRootDomains: () => Promise<void>;
    loading: boolean;
}

const RootDomainContext = React.createContext<RootDomainProviderContext>({
    rootDomains: [],
    activeRootDomain: null,
    setActiveRootDomain: () => {},
    refreshRootDomains: async () => {},
    loading: false,
});

export const activeRootDomainAtom = atomWithStorage<string | null>(
    'web3AvtiveRootDomain',
    null,
);

export const rootDomainsAtom = atomWithStorage<string[]>(
    'web3RootDomains',
    [],
);

export const rootDomainsPubAtom = atomWithStorage<PublicKey[]>(
    'web3RootDomainsKey',
    [],
)


export function RootDomainEnviromentProvider({ children }: { children: ReactNode }){
    const { connection } = useConnection();

    const [activeRootDomain, setActiveRootDomain] = useAtom(activeRootDomainAtom);
    const [rootDomains, setRootDomains] = useAtom(rootDomainsAtom);
    const [loading, setLoading] = useState(false);

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true)
        }, 1000)
    }, [])

    const refreshRootDomains = useCallback(async () => {
        setLoading(true);

        try {

            const thisRootDomainsPubkey = await getAllRootDomain(connection);

            const rootDomainsData = thisRootDomainsPubkey.map(pubkey =>
                PDAReverseLookUp(connection, pubkey)
            );

            const resolvedDomains = (await Promise.all(rootDomainsData)).filter(Boolean) as string[];
            setRootDomains(resolvedDomains);

            const activeIndex = resolvedDomains.findIndex(d => d === activeRootDomain);

            // if stored domain is not in the new list, or null
            if (activeIndex === -1 && resolvedDomains.length > 0 && isReady) {
                setActiveRootDomain(resolvedDomains[0]);
            }

        } catch (err) {
            console.log("get root err: ", err);
        } finally {
            setLoading(false);
        }
    }, [connection, activeRootDomain, setActiveRootDomain, setRootDomains]);

    useEffect(() => {
        refreshRootDomains();
    }, [refreshRootDomains]);

    const contextValue = useMemo(() => ({
        rootDomains,
        activeRootDomain,
        setActiveRootDomain,
        refreshRootDomains,
        loading,
    }), [rootDomains, activeRootDomain, setActiveRootDomain, refreshRootDomains, loading]);

    return (
        <RootDomainContext.Provider value={contextValue}>
            {children}
        </RootDomainContext.Provider>
    );
}

export const useRootDomain = () => useContext(RootDomainContext);
