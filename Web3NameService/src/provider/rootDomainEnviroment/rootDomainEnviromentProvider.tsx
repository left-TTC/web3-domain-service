import { getAllRootDomain } from "@/utils/net/getAllRootDomain";
import { PDAReverseLookUp, ReversingPDAType } from "@/utils/net/PDAReverseLookUp";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import React, { useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";





export interface RootDomainProviderContext {
    rootDomains: string[];
    activeRootDomain: string | null;
    rootDomainsPubKey: PublicKey[];
    activeRootDomainPubKey: PublicKey | null;
    setActiveRootDomain: (domain: string) => void;
    setActiveRootDomainPubkey: (pubkey: PublicKey) => void;
    refreshRootDomains: () => Promise<void>;
    loading: boolean;
}

//give a global state
const RootDomainContext = React.createContext<RootDomainProviderContext>({
    rootDomains: [],
    activeRootDomain: null,
    rootDomainsPubKey: [],
    activeRootDomainPubKey: null,
    setActiveRootDomain: () => {},
    setActiveRootDomainPubkey: () => {},
    refreshRootDomains: async () => {},
    loading: false,
});


export const activeRootDomainAtom = atomWithStorage<string | null>(
    'web3-active-root',
    null,
);

export const rootDomainsAtom = atomWithStorage<string[]>(
    'web3-root-domains',
    [],
);

export const rootDomainsPubAtom = atomWithStorage<PublicKey[]>(
    'web3-root-domains-keys',
    [],
)

export const activeRootDomainsPubAtom = atomWithStorage<PublicKey | null>(
    'web3-root-domains-key',
    null,
);

export function RootDomainEnviromentProvider({ children }: { children: ReactNode }){
    const { connection } = useConnection();

    const [activeRootDomain, setActiveRootDomain] = useAtom(activeRootDomainAtom);
    const [rootDomains, setRootDomains] = useAtom(rootDomainsAtom);
    const [activeRootDomainPubKey, setActiveRootDomainPubkey] = useAtom(activeRootDomainsPubAtom);
    const [rootDomainsPubKey, setRootDomainsPubKey] = useAtom(rootDomainsPubAtom);
    const [loading, setLoading] = useState(false);

    const refreshRootDomains = useCallback(async () => {
        setLoading(true);

        try{
            const thisRootDomainsPubkey = await getAllRootDomain(connection);
            setRootDomainsPubKey(thisRootDomainsPubkey)

            const rootDomainsData = thisRootDomainsPubkey.map(rootDomainPubkey => 
                PDAReverseLookUp(connection, rootDomainPubkey, ReversingPDAType.RootDomain)
            );

            const resolvedDomains = (await Promise.all(rootDomainsData)).filter(Boolean) as string[];

            setRootDomains(resolvedDomains);

            console.log("roots:", resolvedDomains)

            //no root domain. set the frist
            if (!activeRootDomain && resolvedDomains.length > 0) {
                console.log("set active")
                setActiveRootDomain(resolvedDomains[0]);
                setActiveRootDomainPubkey(thisRootDomainsPubkey[0]);
            }

            console.log("active key: ", activeRootDomainPubKey)
            console.log("active: ", activeRootDomain)

            // if (activeRootDomainPubKey && !thisRootDomainsPubkey.some(d => d.equals(activeRootDomainPubKey))) {
            //     setActiveRootDomain(null);
            // }

        }catch(err){
            console.log("get root err: ", err)
        }
    }, [activeRootDomain, setActiveRootDomain, setRootDomains])

    useEffect(() => {
        refreshRootDomains();
    }, [refreshRootDomains]);

    const contextValue = useMemo(() => ({
        rootDomains,
        activeRootDomain,
        rootDomainsPubKey,
        activeRootDomainPubKey,
        setActiveRootDomain,
        setActiveRootDomainPubkey,
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
