
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { createContext, useContext, useMemo } from 'react';

type WalletEnvContextType = {
    network: WalletAdapterNetwork;
    endpoint: string;
};


const WalletEnvContext = createContext<WalletEnvContextType | null>(null);

export const WalletEnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    //use net:
    const network = WalletAdapterNetwork.Devnet;
    //endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [
        //automatically detect wallet
    ], [network]);

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletEnvContext.Provider value={{network, endpoint}}>
                    {children}
                </WalletEnvContext.Provider>
            </WalletProvider>
        </ConnectionProvider>
    )

}

export const useWalletEnvContext = () => {
    const ctx = useContext(WalletEnvContext)

    if(!ctx){
        throw new Error("wallet paranms err")
    }

    return ctx;
}
  