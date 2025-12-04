import { Activity, AlertCircle, Search, Send } from "lucide-react";
import DomainItem from "./content/domainItem";
import AuctionListItem, { type AuctionItem } from "./content/auctionlistItem";
import type { SettlementItem } from "./content/settlementListItem";
import SettlementListItem from "./content/settlementListItem";

//test 
export const MOCK_MY_AUCTIONS: AuctionItem[] = [
    { id: 101, name: "super-dao.sol", currentPrice: 15.0, myBid: 15.0, endTime: "2h 45m", status: 'winning' },
    { id: 102, name: "pixel-art.sol", currentPrice: 8.5, myBid: 6.0, endTime: "10m 30s", status: 'outbid' },
];

export const MOCK_PENDING_SETTLEMENTS: SettlementItem[] = [
    { id: 201, name: "meta-login.sol", amount: 0, }, 
    { id: 202, name: "banana-coin.sol", amount: 4.2, }, 
];

export const MOCK_DOMAINS: string[] = [
    "aa.aa", "aa.ss", "as.asa", "skjad.ashdj"
];


interface ManageContentProps {
    activeTab: "mydomain" | "economy",
    domainNum: number,
    myDomains: string[],
    myAuctions: AuctionItem[],
    settlements: SettlementItem[],
}

const primaryColor = '#B4FC75'; 

const ManageContent: React.FC<ManageContentProps> = ({
    activeTab, domainNum, myDomains, myAuctions, settlements
}) => {
    
    if (activeTab === 'mydomain') {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="text-2xl font-bold">我的域名 ({domainNum})</h3>
                    <button className="text-sm text-[#B4FC75] hover:underline flex items-center gap-1">
                        <Send size={16} /> 批量转移
                    </button>
                </div>
                {myDomains.map(domain => (
                    <DomainItem 
                        key={domain}  
                        domainName={domain}
                        ipfs="xxxxxxxxx"
                    />
                ))}
                <div className="text-center pt-8">
                    <button className="px-6 py-3 rounded-xl border border-[#B4FC75]/50 text-[#B4FC75] hover:bg-[#B4FC75]/10 transition-colors flex items-center mx-auto gap-2">
                        <Search size={18} /> 注册新域名
                    </button>
                </div>
            </div>
        );
    }else {
        return (
            <div className="space-y-8 animate-fade-in">
            
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                            <Activity size={20} style={{ color: primaryColor }} /> 
                            进行中的拍卖 ({myAuctions.length})
                        </h3>
                    </div>
                    
                    {myAuctions.length > 0 ? (
                        myAuctions.map(auction => (
                            <AuctionListItem key={auction.id} item={auction} />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-black/20 rounded-xl">
                            暂无参与的拍卖
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                            <AlertCircle size={20} className="text-yellow-400" /> 
                            等待结算 ({settlements.length})
                        </h3>
                        <span className="text-xs text-gray-500">结束后需手动领取资产</span>
                    </div>

                    {settlements.length > 0 ? (
                        settlements.map(item => (
                            <SettlementListItem key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-black/20 rounded-xl">
                            没有待结算的项目
                        </div>
                    )}
                </div>

            </div>
        );
    }
};

export default ManageContent;
