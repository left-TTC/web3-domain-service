
import AuctionRecommend from './domainRecommend/auctionRecommend';
import AuctionHistory from './domainRecommend/auctionHistory';
import { useEffect, useState } from 'react';
import { createMockState, NameAuctionState } from '@/utils/functional/common/class/nameAuctionState';


export default function DomainRecommend() {
  
    const [hotStates, setHotStates] = useState<NameAuctionState[]>([])
    const [hotItemsName, setHotItemsName] = useState<string[]>([])

    useEffect(() => {
        setHotItemsName(["solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol"])
        const mockState = createMockState()
        setHotStates(new Array(8).fill(mockState));
    }, [])


    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24">

            <main className="max-w-7xl mx-auto px-6 pt-36 space-y-24">
                <AuctionRecommend hotItems={hotStates} itemNames={hotItemsName}/>
                <AuctionHistory />
            </main>

            <footer className="max-w-7xl mx-auto px-6 mt-32 border-t border-white/5 pt-12 pb-12 text-center">
                <div className="flex justify-center gap-8 mb-8 text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">隐私政策</a>
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">服务条款</a>
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">数据 API</a>
                </div>
                <p className="text-gray-700 text-[10px] font-mono tracking-widest uppercase">去中心化资产发现系统 © 2024 DECENTRALIZED ASSET DISCOVERY</p>
            </footer>
        </div>
    );
}