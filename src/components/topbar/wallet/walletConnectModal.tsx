import { useState, useEffect, useMemo } from "react";
import {
  X,
  Smartphone,
  Monitor,
  ChevronRight,
  Loader2,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  downloadUrl: string;
  deepLink?: string;
}

const WALLET_OPTIONS: WalletOption[] = [
  {
    id: "phantom",
    name: "Phantom",
    icon: "https://phantom.app/favicon.ico",
    downloadUrl: "https://phantom.app/download",
    deepLink: "https://phantom.app/ul/browse/",
  },
  {
    id: "solflare",
    name: "Solflare",
    icon: "https://solflare.com/favicon.ico",
    downloadUrl: "https://solflare.com/download",
    deepLink: "https://solflare.com/ul/v1/browse/",
  },
  {
    id: "backpack",
    name: "Backpack",
    icon: "https://www.backpack.app/favicon.ico",
    downloadUrl: "https://www.backpack.app/download",
  },
  {
    id: "okx",
    name: "OKX Wallet",
    icon: "https://static.okx.com/cdn/assets/imgs/221/962535F049448F89.png",
    downloadUrl: "https://www.okx.com/web3",
  },
];

export default function WalletConnectModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [detectedWallets, setDetectedWallets] = useState<Record<string, boolean>>(
    {}
  );

  // ✅ 是否存在 injected wallet（关键判断）
  const hasInjectedWallet = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !!(window as any).solana;
  }, []);

  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    const detected = {
      phantom: !!(window as any).solana?.isPhantom,
      solflare: !!(window as any).solflare?.isSolflare,
      backpack: !!(window as any).backpack,
      okx: !!(window as any).okxwallet,
    };
    setDetectedWallets(detected);
  }, []);

  const handleConnect = async (wallet: WalletOption) => {
    const isInstalled = detectedWallets[wallet.id];

    /**
     * 1️⃣ 已存在 injected wallet（桌面插件 / 手机钱包内置浏览器）
     * → 直接 connect
     */
    if (hasInjectedWallet && isInstalled) {
      setConnectingId(wallet.id);
      try {
        await (window as any).solana?.connect?.();
        setConnectingId(null);
        setIsOpen(false);
      } catch (err) {
        console.error("Wallet connect failed", err);
        setConnectingId(null);
      }
      return;
    }

    /**
     * 2️⃣ 没有 injected wallet + 手机端 → deep link
     */
    if (!hasInjectedWallet && isMobile && wallet.deepLink) {
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `${wallet.deepLink}${currentUrl}`;
      return;
    }

    /**
     * 3️⃣ 桌面端未安装 → 下载页
     */
    if (!isInstalled) {
      window.open(wallet.downloadUrl, "_blank");
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-[#B4FC75] text-black px-8 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 z-50"
      >
        <Zap size={20} fill="black" />
        重新连接钱包
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-md mt-140">
      <div className="relative w-full max-w-[440px] bg-[#111] border border-white/10 rounded-[2.5rem] overflow-hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-[#B4FC75]/10 text-[#B4FC75] mb-4">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl font-black text-white">
              连接 Solana 钱包
            </h2>
          </div>

          <div className="space-y-3">
            {WALLET_OPTIONS.map((wallet) => {
              const isInstalled = detectedWallets[wallet.id];
              const isConnecting = connectingId === wallet.id;

              return (
                <button
                  key={wallet.id}
                  onClick={() => handleConnect(wallet)}
                  disabled={!!connectingId}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={wallet.icon}
                      className="w-10 h-10 rounded-xl"
                    />
                    <div className="text-left">
                      <div className="text-white font-bold">
                        {wallet.name}
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase">
                        {isInstalled
                          ? "已检测到"
                          : isMobile
                          ? "手机端跳转"
                          : "未安装"}
                      </p>
                    </div>
                  </div>

                  {isConnecting ? (
                    <Loader2
                      size={20}
                      className="text-[#B4FC75] animate-spin"
                    />
                  ) : (
                    <ChevronRight size={18} className="text-gray-600" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Monitor size={14} /> 桌面插件
            </div>
            <div className="flex items-center gap-2">
              <Smartphone size={14} /> 手机钱包
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
