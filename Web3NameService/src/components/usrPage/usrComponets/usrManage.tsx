import { Gavel, List } from "lucide-react";
import ManageContent from "./index/manageContent";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useSortSettleAndAuction } from "./hook/useSortSettleAndAuction";
import type { PublicKey } from "@solana/web3.js";



const primaryColor = '#B4FC75'; 

interface UsrManageProps {
    setActiveTab: React.Dispatch<React.SetStateAction<"mydomain" | "auction">>,
    activeTab: "mydomain" | "auction",
    usrDomains: string[],
    recordMap: Map<string, IPFSRecordState> | null,
    allAuctionName: Record<string, number>,
    ifLoadedAuctionState: boolean,
    auctionState: Map<string, NameAuctionState> | null,
    searchKey: PublicKey | null,
}

const UsrManage: React.FC<UsrManageProps> = ({
    setActiveTab, activeTab, usrDomains, recordMap, ifLoadedAuctionState, allAuctionName, auctionState, searchKey
}) => {

    const { onAuctionItems, onSettleItems } = useSortSettleAndAuction(auctionState, ifLoadedAuctionState, allAuctionName)

    return(
        <section className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50">
            <div className="flex border-b border-white/10 mb-8">
                {['mydomain', 'economy'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'mydomain' | 'auction')}
                    className={`py-3 px-6 text-lg font-semibold transition-colors duration-200 flex items-center gap-2 ${
                    activeTab === tab
                        ? 'border-b-4 text-white'
                        : 'text-gray-500 hover:text-white/80'
                    }`}
                    style={{ borderColor: activeTab === tab ? primaryColor : 'transparent' }}
                >
                    {tab === 'mydomain' ? <List size={20} /> : <Gavel size={20} />}
                    {tab === 'mydomain' ? '域名管理' : '我的拍卖 & 结算'}
                </button>
                ))}
            </div>

            <ManageContent
                activeTab={activeTab}
                domainNum={usrDomains.length}
                myDomains={usrDomains}
                recordMap={recordMap}
                myAuctions={onAuctionItems}
                settlements={onSettleItems}
                localAuctionName={allAuctionName}
                searchKey={searchKey}
            />

        </section>
    )
}

export default UsrManage;