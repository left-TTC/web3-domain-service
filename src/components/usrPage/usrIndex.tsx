import { useState } from 'react';
import UsrInfo from './usrComponets/usrInfo';
import UsrManage from './usrComponets/usrManage';
import type { PublicKey } from '@solana/web3.js';
import type { IPFSRecordState } from '@/utils/functional/common/class/ipfsRecordState';
import type { NameRecordState } from '@/utils/functional/common/class/nameRecordState';
import type { NameAuctionState } from '@/utils/functional/common/class/nameAuctionState';

interface UsrIndexProps{
    useUsr: PublicKey | null,
    usrDomains: string[],   
    ifCheckingOtherUsr: boolean,
    recordMap: Map<string, IPFSRecordState> | null,
    domainStateMap: Map<string, NameRecordState> | null,
    usrProfit: number | null,
    usrVolume: number | null,
    allAuctionName: Record<string, number>,
    ifAuctionFromRpc: boolean,
    auctionState: NameAuctionState[],
    searchKey: PublicKey | null,
}

export default function UsrIndex(
    { useUsr, usrDomains, ifCheckingOtherUsr, recordMap, domainStateMap, usrProfit, usrVolume, allAuctionName,
        ifAuctionFromRpc, auctionState, searchKey
    }: UsrIndexProps 
) {
    
    const [activeTab, setActiveTab] = useState<'mydomain' | 'auction'>('mydomain');
 
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 relative overflow-x-hidden">

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[30%] w-[400px] h-[400px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.08]"/>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-7 md:pt-12 relative z-10 flex flex-col gap-10 md:gap-16 mt-20">
                <UsrInfo 
                    checkUsr={useUsr}
                    usrDomains={usrDomains}
                    ifCheckingOtherUsr={ifCheckingOtherUsr}
                    domainStateMap={domainStateMap}
                    usrProfit={usrProfit}
                    usrVolume={usrVolume}
                />
                <UsrManage
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    usrDomains={usrDomains}
                    recordMap={recordMap}
                    allAuctionName={allAuctionName}
                    ifLoadedAuctionState={ifAuctionFromRpc}
                    auctionState={auctionState}
                    searchKey={searchKey}
                    domainStateMap={domainStateMap}
                />
            </main>

            <footer className="max-w-7xl mx-auto px-6 mt-20 border-t border-white/10 pt-8 text-gray-400 text-center text-sm font-normal">
                <p>Solana Web3 Domain Service © 2024. Dashboard Access.</p>
            </footer>
        </div>
    );
}