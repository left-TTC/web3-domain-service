import { Gavel, List } from "lucide-react";
import ManageContent, { MOCK_DOMAINS, MOCK_MY_AUCTIONS, MOCK_PENDING_SETTLEMENTS } from "./index/manageContent";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";



const primaryColor = '#B4FC75'; 

interface UsrManageProps {
    setActiveTab: React.Dispatch<React.SetStateAction<"mydomain" | "economy">>,
    activeTab: "mydomain" | "economy",
    usrDomains: string[],
    recordMap: Map<string, IPFSRecordState> | null,
}

const UsrManage: React.FC<UsrManageProps> = ({
    setActiveTab, activeTab, usrDomains, recordMap,
}) => {


    return(
        <section className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50">
            <div className="flex border-b border-white/10 mb-8">
                {['mydomain', 'economy'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as 'mydomain' | 'economy')}
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
                myAuctions={MOCK_MY_AUCTIONS}
                settlements={MOCK_PENDING_SETTLEMENTS}
            />

        </section>
    )
}

export default UsrManage;