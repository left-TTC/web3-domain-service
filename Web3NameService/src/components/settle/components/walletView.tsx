




const WalletView = () => {

    return(
        <div className="flex items-center justify-between px-4 py-3 bg-[#B4FC75]/5 border border-[#B4FC75]/10 rounded-xl text-[11px] text-gray-500">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B4FC75] animate-pulse"></div>
                <span className="font-mono">钱包余额: 42.069 SOL</span>
            </div>
            <span className="uppercase font-bold tracking-tighter text-[#B4FC75]/60">Connected via Phantom</span>
        </div>
    )

}

export default WalletView;
