import { Gavel, List, RefreshCw } from "lucide-react";
import ManageContent from "./index/manageContent";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useSortSettleAndAuction } from "./hook/useSortSettleAndAuction";
import type { PublicKey } from "@solana/web3.js";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { useTranslation } from "react-i18next";
import { useGlobalModal } from "@/components/common/show/info";
import { useRefreshItems } from "./index/function/tool/useRefreshItems";
import { useState } from "react";



const primaryColor = '#B4FC75'; 

interface UsrManageProps {
    setActiveTab: React.Dispatch<React.SetStateAction<"mydomain" | "auction">>,
    activeTab: "mydomain" | "auction",
    usrDomains: string[],
    recordMap: Map<string, IPFSRecordState> | null,
    allAuctionName: Record<string, number>,
    ifLoadedAuctionState: boolean,
    auctionState: NameAuctionState[],
    searchKey: PublicKey | null,
    domainStateMap: Map<string, NameRecordState> | null,
    openDomainQueryPage: () => void;
}

const UsrManage: React.FC<UsrManageProps> = ({
    setActiveTab, activeTab, usrDomains, recordMap, ifLoadedAuctionState, 
    allAuctionName, auctionState, searchKey, domainStateMap, openDomainQueryPage
}) => {
    const { t } = useTranslation();
    const info = useGlobalModal()

    const [refreshing, setRefreshing] = useState(false)
    const { refresh } = useRefreshItems(searchKey, allAuctionName)
    const { onAuctionItems, onSettleItems, allRecordState, reFetch } = useSortSettleAndAuction(auctionState, ifLoadedAuctionState, allAuctionName)

    const ifMd = window.innerWidth >= 768;

    const refreshName = async() => {
        setRefreshing(true)
        info.showModal({
            title: "refresh auction",
            content: "这个操作将读取当前钱包地址链上当前作为最高出价者的拍卖项目",
            type: 'info',
            onConfirm: async() => {await refresh(); reFetch(); setRefreshing(false)}
        })
    }

    return(
        <section className="bg-[#111] border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl shadow-black/50 sm:min-h-[420px]">
            <div className="w-full flex justify-between">
                <div className="flex border-b border-white/10 mb-4 md:mb-6">
                    {['mydomain', 'auction'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as 'mydomain' | 'auction')}
                            className={`py-2 md:py-3 px-3 md:px-6 text-[10px] md:text-[14px] font-bold transition-colors duration-200 flex items-center gap-2 ${
                            activeTab === tab
                                ? 'border-b-4 text-white'
                                : 'text-gray-500 hover:text-white/80'
                            }`}
                            style={{ borderColor: activeTab === tab ? primaryColor : 'transparent' }}
                        >
                            {tab === 'mydomain' ? <List size={ifMd? 20: 14} /> : <Gavel size={ifMd? 20: 14} />}
                            {tab === 'mydomain' ? t("domainManagement") : t("myAuctionsSettlement")}
                        </button>
                    ))}
                </div>
                {activeTab==='auction' && 
                    <button
                        onClick={refreshName}
                        disabled={refreshing}
                        className={`flex items-center gap-1 text-[11px] md:text-sm transition cursor-pointer
                            ${refreshing ? "text-gray-500 cursor-not-allowed" : "text-gray-400 hover:text-white"}
                        `}
                    >
                        <RefreshCw
                            size={ifMd ? 18 : 14}
                            className={refreshing ? "animate-spin" : ""}
                        />
                        {refreshing ? t("refreshing") : t("refresh")}
                    </button>
                }
            </div>

            <ManageContent
                activeTab={activeTab}
                domainNum={usrDomains.length}
                myDomains={usrDomains}
                recordMap={recordMap}
                auctionItems={onAuctionItems}
                settleItems={onSettleItems}
                localAuctionName={allAuctionName}
                searchKey={searchKey}
                domainStateMap={domainStateMap}
                allRecordState={allRecordState}
                openDomainQueryPage={openDomainQueryPage}
            />

        </section>
    )
}

export default UsrManage;
