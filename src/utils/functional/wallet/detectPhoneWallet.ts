export interface DetectWalletParams {
    name: string;
    deepLink?: string;
    icon?: string;
}

export function detectPhoneWallet(): DetectWalletParams[] {
    if (typeof window === "undefined") return [];

    const url = window.location.href;

    return [
        {
            name: "Phantom",
            deepLink: `https://phantom.app/ul/browse/${encodeURIComponent(url)}`,
            icon: "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/wallets/phantom.svg",
        },
        {
            name: "Solflare",
            deepLink: `https://solflare.com/ul/browse/${encodeURIComponent(url)}`,
            icon: "https://solflare.com/favicon.ico",
        },
        {
            name: "Backpack",
            deepLink: `backpack://app/browse/${encodeURIComponent(url)}`,
            icon: "https://backpack.app/favicon.ico",
        },
        {
            name: "Glow",
            deepLink: `glow://browse/${encodeURIComponent(url)}`,
            icon: "https://glow.app/favicon.ico",
        },
        {
            name: "Torus",
            deepLink: `https://app.tor.us/login?redirectUri=${encodeURIComponent(url)}`,
            icon: "https://toruswallet.io/images/favicon.ico",
        },
        {
            name: "Exodus",
            deepLink: `https://www.exodus.com/mobile?ref=${encodeURIComponent(url)}`,
            icon: "https://www.exodus.com/favicon.ico",
        },
        {
            name: "Coinbase Wallet",
            deepLink: `cbwallet://wallet_link?redirect_url=${encodeURIComponent(url)}`,
            icon: "https://wallet.coinbase.com/favicon.ico",
        },
        {
            name: "Trust Wallet",
            deepLink: `trust://link?uri=${encodeURIComponent(url)}`,
            icon: "https://trustwallet.com/assets/images/favicon.ico",
        },
        {
            name: "Atomic Wallet",
            deepLink: `atomicwallet://browse/${encodeURIComponent(url)}`,
            icon: "https://atomicwallet.io/favicon.ico",
        },
        {
            name: "MetaMask",
            deepLink: `https://metamask.app.link/dapp/${encodeURIComponent(url)}`,
            icon: "https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg",
        }
    ];
}
