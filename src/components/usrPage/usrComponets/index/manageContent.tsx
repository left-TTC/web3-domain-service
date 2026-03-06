import { Activity, AlertCircle, Search } from "lucide-react";
import DomainItem from "./content/domainItem";
import AuctionListItem from "./content/auctionlistItem";
import SettlementListItem from "./content/settlementListItem";
import { useState } from "react";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import {  NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import type { PublicKey } from "@solana/web3.js";
import { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


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
    allRecordState: Map<string, IPFSRecordState> | undefined,
    openDomainQueryPage: () => void;
}

const primaryColor = '#B4FC75'; 
const PAGE_SIZE = 7;

const ManageContent: React.FC<ManageContentProps> = ({
    activeTab, domainNum, myDomains, auctionItems, settleItems, 
    recordMap, localAuctionName, searchKey, domainStateMap, allRecordState, openDomainQueryPage
}) => {

    const { t } = useTranslation();
    const nav = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(myDomains.length / PAGE_SIZE);

    const currentDomains = myDomains.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );
    const goPrev = () => setCurrentPage(p => Math.max(1, p - 1));
    const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));

    const ifMd = window.innerWidth >= 768;


    if (activeTab === 'mydomain') {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="text-[12px] md:text-[18px] font-bold">{t("myDomains")} ({domainNum})</h3>
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
                            {t("previousPage")}
                        </button>
                        <span className="text-white/70">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            className="px-3 py-1 rounded-lg border border-white/20 text-white/70 disabled:opacity-40"
                            onClick={goNext}
                            disabled={currentPage === totalPages}
                        >
                            {t("nextPage")}
                        </button>
                    </div>
                )}
                <div className="text-center pt-2 md:pt-8">
                    <button 
                        onClick={() => {
                            nav("/index")
                            openDomainQueryPage()
                        }}
                        className="font-normal text-[12px] md:text-[14px] px-6 py-3 rounded-xl border-[2px] border-[#B4FC75]/50 text-[#B4FC75] hover:bg-[#B4FC75]/10 transition-colors flex items-center mx-auto gap-2"
                    >
                        <Search size={18} /> {t("registerNewDomain")}
                    </button>
                </div>
            </div>
        );
    }else {
        return (
            <div className="space-y-8 animate-fade-in">
            
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-1 md:pb-2 border-b border-white/5">
                        <h3 className="text-[12px] md:text-[18px] font-bold flex items-center gap-2 text-white">
                            <Activity size={ifMd? 20:12} style={{ color: primaryColor }} /> 
                            {t("ongoingAuctions")} ({auctionItems.length})
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
                            {t("noAuctionsParticipated")}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h3 className="text-[12px] md:text-[18px] font-bold flex items-center gap-2 text-white">
                            <AlertCircle size={ifMd? 20:12} className="text-yellow-400" /> 
                            {t("pendingSettlement")} ({settleItems.length})
                        </h3>
                        <span className="text-[10px] md:text-xs text-gray-500 font-normal">{t("assetsNeedManualClaim")}</span>
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
                            {t("noPendingSettlementItems")}
                        </div>
                    )}
                </div>

            </div>
        );
    }
};

export default ManageContent;
