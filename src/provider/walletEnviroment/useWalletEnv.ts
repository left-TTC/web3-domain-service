import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletEnvContext } from './walletEnviromentProvider';

export const useWalletEnv = () => {
    const wallet = useWallet();
    const env = useWalletEnvContext();

    return {
        ...wallet,
        ...env     
    };
};
