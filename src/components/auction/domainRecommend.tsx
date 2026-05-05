
import AuctionRecommend from './domainRecommend/auctionRecommend';
import AuctionHistory from './domainRecommend/auctionHistory';
import { useEffect, useState } from 'react';
import { createMockState, NameAuctionState } from '@/utils/functional/common/class/nameAuctionState';
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DomainRecommend() {
    const { t } = useTranslation();
  
    const [hotStates, setHotStates] = useState<NameAuctionState[]>([])
    const [hotItemsName, setHotItemsName] = useState<string[]>([])
    const [isUnderDevelopment, _] = useState(true)

    useEffect(() => {
        setHotItemsName(["solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol", "solana.sol"])
        const mockState = createMockState()
        setHotStates(new Array(8).fill(mockState));
    }, [])

    const developmentPage = (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 flex flex-col items-center justify-center">
            
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[30%] w-[400px] h-[400px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.08]"/>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 space-y-24 relative z-10 text-center">
                <div className="flex flex-col items-center justify-center gap-8">
                    <div className="w-32 h-32 rounded-full from-[#B4FC75] to-[#050505] flex items-center justify-center border-4 border-[#B4FC75]/30">
                        <Terminal className="w-16 h-16 text-[#B4FC75]" strokeWidth={2} />
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#B4FC75] to-white bg-clip-text text-transparent">
                        {t("underDevelopment")}
                    </h1>
                    
                    <p className="text-xl text-gray-400 max-w-2xl">
                        {t("domainRecommendDeveloping")}
                    </p>
                    
                    <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-lg">
                        <p className="text-gray-300 mb-4">
                            {t("buildingDomainRecommendSystem")}
                        </p>
                        <ul className="text-left text-gray-400 space-y-2">
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#B4FC75]"></div>
                                <span>{t("hotDomainRecommend")}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#B4FC75]"></div>
                                <span>{t("auctionHistoryRecord")}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#B4FC75]"></div>
                                <span>{t("smartRecommendAlgorithm")}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <footer className="max-w-7xl mx-auto px-6 mt-16 sm:mt-32 border-t border-white/5 pt-12 pb-12 text-center relative z-10">
                <div className="flex justify-center gap-8 mb-8 text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">{t("privacyPolicy")}</a>
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">{t("termsOfService")}</a>
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">{t("dataApi")}</a>
                </div>
                <p className="text-gray-700 text-[10px] font-mono tracking-widest uppercase">{t("decentralizedAssetDiscovery")}</p>
            </footer>
        </div>
    );

    const normalPage = (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24">

            <main className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 space-y-24">
                <AuctionRecommend hotItems={hotStates} itemNames={hotItemsName}/>
                <AuctionHistory topItem={new Array(6).fill(createMockState())} itemName={hotItemsName}/>
            </main>

            <footer className="max-w-7xl mx-auto px-6 mt-16 sm:mt-32 border-t border-white/5 pt-12 pb-12 text-center">
                <div className="flex justify-center gap-8 mb-8 text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">{t("privacyPolicy")}</a>
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">{t("termsOfService")}</a>
                    <a href="#" className="hover:text-[#B4FC75] transition-colors">{t("dataApi")}</a>
                </div>
                <p className="text-gray-700 text-[10px] font-mono tracking-widest uppercase">{t("decentralizedAssetDiscovery")}</p>
            </footer>
        </div>
    );

    return isUnderDevelopment ? developmentPage : normalPage;
}
