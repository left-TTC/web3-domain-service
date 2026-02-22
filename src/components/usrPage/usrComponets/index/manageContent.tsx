import { Activity, AlertCircle, Search } from "lucide-react";
import DomainItem from "./content/domainItem";
import AuctionListItem from "./content/auctionlistItem";
import SettlementListItem from "./content/settlementListItem";
import { useEffect, useState } from "react";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { createMockState, NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { PublicKey } from "@solana/web3.js";
import { NameRecordState } from "@/utils/functional/common/class/nameRecordState";


interface ManageContentProps {
    activeTab: "mydomain" | "auction",
    domainNum: number,
    myDomains: string[],
    auctionItems: NameAuctionState[],
    settleItems: NameAuctionState[],
    recordMap: Map<string, IPFSRecordState> | null,
    localAuctionName: Record<string, number>,
    searchKey: PublicKey | null,
    domainStateMap: Map<string, NameRecordState> | null,
    allRecordState: Map<string, IPFSRecordState> | undefined
}

const primaryColor = '#B4FC75'; 
const PAGE_SIZE = 7;

const ManageContent: React.FC<ManageContentProps> = ({
    activeTab, domainNum, myDomains, auctionItems, settleItems, 
    recordMap, localAuctionName, searchKey, domainStateMap, allRecordState
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(myDomains.length / PAGE_SIZE);

    const currentDomains = myDomains.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );
    const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
    const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    const ifMd = window.innerWidth >= 768;

    // const mock = createMockState()
    // const test = [mock, mock, mock, mock, mock, mock, mock, mock, mock, mock]

    if (activeTab === 'mydomain') {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="text-[12px] md:text-2xl font-bold">我的域名 ({domainNum})</h3>
                </div>
                {currentDomains.map(domain => (
                    <DomainItem 
                        key={domain}  
                        domainName={domain}
                        ipfsState={recordMap?.get(domain) ?? null}
                        nameState={domainStateMap?.get(domain) ?? null}
                    />
                ))}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-4">
                        <button
                            className="px-3 py-1 rounded-lg border border-white/20 text-white/70 disabled:opacity-40"
                            onClick={goPrev}
                            disabled={currentPage === 1}
                        >
                            上一页
                        </button>
                        <span className="text-white/70">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 rounded-lg border border-white/20 text-white/70 disabled:opacity-40"
                            onClick={goNext}
                            disabled={currentPage === totalPages}
                        >
                            下一页
                        </button>
                    </div>
                )}
                <div className="text-center pt-2 md:pt-8">
                    <button className="fontg-normal text-[12px] md:text-[16px] px-6 py-3 rounded-xl border border-[#B4FC75]/50 text-[#B4FC75] hover:bg-[#B4FC75]/10 transition-colors flex items-center mx-auto gap-2">
                        <Search size={18} /> 注册新域名
                    </button>
                </div>
            </div>
        );
    }else {
        return (
            <div className="space-y-8 animate-fade-in">
            
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-1 md:pb-2 border-b border-white/5">
                        <h3 className="text-[12px] sm:text-xl font-bold flex items-center gap-2 text-white">
                            <Activity size={ifMd? 20:12} style={{ color: primaryColor }} /> 
                            进行中的拍卖 ({auctionItems.length})
                        </h3>
                    </div>
                    
                    {auctionItems.length > 0 ? (
                        auctionItems.map((item, index) => (
                            <AuctionListItem 
                                key={index}
                                item={item}
                                name={item.getName()}    
                                localAuctionName={localAuctionName}
                                searchKey={searchKey}
                                recordstate={allRecordState?.get(item.getName())}
                            />
                        ))
                    ) : (
                        <div className="text-[12px] md:text-[18px] text-center py-5 md:py-8 text-gray-500 bg-black/20 rounded-xl">
                            暂无参与的拍卖
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h3 className="text-[12px] sm:text-xl font-bold flex items-center gap-2 text-white">
                            <AlertCircle size={ifMd? 20:12} className="text-yellow-400" /> 
                            等待结算 ({settleItems.length})
                        </h3>
                        <span className="text-[10px] md:text-xs text-gray-500 font-normal">结束后需手动领取资产</span>
                    </div>

                    {settleItems.length > 0 ? (
                        settleItems.map((item, index) => (
                            <SettlementListItem 
                                key={index}
                                item={item}
                                name={item.getName()}    
                            />
                        ))
                    ) : (
                        <div className="text-[12px] md:text-[18px] text-center py-5 md:py-8 text-gray-500 bg-black/20 rounded-xl">
                            没有待结算的项目
                        </div>
                    )}
                </div>

            </div>
        );
    }
};

export default ManageContent;
