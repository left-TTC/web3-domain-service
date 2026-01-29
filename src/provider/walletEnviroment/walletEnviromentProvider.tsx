
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { createContext, useContext, useMemo } from 'react';

type WalletEnvContextType = {
    network: WalletAdapterNetwork;
    endpoint: string;
};

const WalletEnvContext = createContext<WalletEnvContextType | null>(null);

export const WalletEnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const network = import.meta.env.VITE_SOLANA_NETWORK === 'devnet'
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Mainnet;

    const endpoint = useMemo(() => {
        const useHelius = false

        const rpc =  import.meta.env.VITE_SOLANA_DEV_RPC
            ?? 'https://api.devnet.solana.com';
        
        console.log("use helius rpc: ", rpc)
        return useHelius? rpc:'https://api.devnet.solana.com'

    }, []);

    const wallets = useMemo(() => [], [network]);

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
  