
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';

type WalletEnvContextType = {
    network: WalletAdapterNetwork;
    endpoint: string;
    customRpc: string | null;
    setCustomRpc: (rpc: string | null) => void;
    availableRpcs: {
        name: string;
        url: string;
        network: WalletAdapterNetwork;
    }[];
};

const WalletEnvContext = createContext<WalletEnvContextType | null>(null);

// 默认RPC列表
const DEFAULT_RPCS = [
    {
        name: 'Solana Devnet (Default)',
        url: 'https://api.devnet.solana.com',
        network: WalletAdapterNetwork.Devnet
    },
    {
        name: 'Solana Mainnet',
        url: 'https://api.mainnet-beta.solana.com',
        network: WalletAdapterNetwork.Mainnet
    },
    {
        name: 'Custom RPC',
        url: '',
        network: WalletAdapterNetwork.Mainnet
    }
];

// localStorage key
const CUSTOM_RPC_KEY = 'web3-domain-service-custom-rpc';

export const WalletEnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customRpc, setCustomRpcState] = useState<string | null>(null);

    // 从localStorage加载自定义RPC
    useEffect(() => {
        const savedRpc = localStorage.getItem(CUSTOM_RPC_KEY);
        if (savedRpc) {
            setCustomRpcState(savedRpc);
        }
    }, []);

    // 保存自定义RPC到localStorage
    const setCustomRpc = (rpc: string | null) => {
        if (rpc) {
            localStorage.setItem(CUSTOM_RPC_KEY, rpc);
        } else {
            localStorage.removeItem(CUSTOM_RPC_KEY);
        }
        setCustomRpcState(rpc);
    };

    const network = import.meta.env.VITE_SOLANA_NETWORK === 'devnet'
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Mainnet;

    const endpoint = useMemo(() => {
        // 如果用户设置了自定义RPC，优先使用
        if (customRpc && customRpc.trim() !== '') {
            console.log("Using custom RPC: ", customRpc);
            return customRpc;
        }

        // 否则使用环境变量配置的RPC
        const useHelius = false;
        const rpc = import.meta.env.VITE_SOLANA_DEV_RPC ?? 'https://api.devnet.solana.com';
        
        console.log("Using default RPC: ", rpc);
        return useHelius ? rpc : 'https://api.devnet.solana.com';
    }, [customRpc]);

    const wallets = useMemo(() => [], [network]);

    // 可用的RPC列表（包含自定义RPC）
    const availableRpcs = useMemo(() => {
        const rpcs = [...DEFAULT_RPCS];
        
        // 如果有自定义RPC，添加到列表
        if (customRpc && customRpc.trim() !== '') {
            rpcs[3] = {
                ...rpcs[3],
                url: customRpc,
                name: `Custom: ${customRpc.substring(0, 30)}${customRpc.length > 30 ? '...' : ''}`
            };
        }
        
        return rpcs;
    }, [customRpc]);

    const contextValue = {
        network,
        endpoint,
        customRpc,
        setCustomRpc,
        availableRpcs
    };

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletEnvContext.Provider value={contextValue}>
                    {children}
                </WalletEnvContext.Provider>
            </WalletProvider>
         </ConnectionProvider>
    );
}

export const useWalletEnvContext = () => {
    const ctx = useContext(WalletEnvContext);

    if(!ctx){
        throw new Error("wallet environment context error");
    }

    return ctx;
};
  