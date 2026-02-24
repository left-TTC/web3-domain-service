import { Gavel, List } from "lucide-react";
import ManageContent from "./index/manageContent";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useSortSettleAndAuction } from "./hook/useSortSettleAndAuction";
import type { PublicKey } from "@solana/web3.js";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";



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
}

const UsrManage: React.FC<UsrManageProps> = ({
    setActiveTab, activeTab, usrDomains, recordMap, ifLoadedAuctionState, 
    allAuctionName, auctionState, searchKey, domainStateMap
}) => {

    const { onAuctionItems, onSettleItems, allRecordState } = useSortSettleAndAuction(auctionState, ifLoadedAuctionState, allAuctionName)

    const ifMd = window.innerWidth >= 768;

    return(
        <section className="bg-[#111] border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl shadow-black/50 min-h-[420px]">
            <div className="flex border-b border-white/10 mb-4 md:mb-8">
                {['mydomain', 'economy'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'mydomain' | 'auction')}
                    className={`py-2 md:py-3 px-3 md:px-6 text-[10px] md:text-lg font-semibold transition-colors duration-200 flex items-center gap-2 ${
                    activeTab === tab
                        ? 'border-b-4 text-white'
                        : 'text-gray-500 hover:text-white/80'
                    }`}
                    style={{ borderColor: activeTab === tab ? primaryColor : 'transparent' }}
                >
                    {tab === 'mydomain' ? <List size={ifMd? 20: 14} /> : <Gavel size={ifMd? 20: 14} />}
                    {tab === 'mydomain' ? '域名管理' : '我的拍卖 & 结算'}
                </button>
                ))}
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
            />

        </section>
    )
}

export default UsrManage;