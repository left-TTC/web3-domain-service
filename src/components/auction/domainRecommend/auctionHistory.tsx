import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutString } from "@/utils/functional/common/cutString";
import { getDeviceTypeByUA } from "@/utils/functional/wallet/isPhone";
import { BarChart3, Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AuctionHistoryProps {
    topItem: NameAuctionState[],
    itemName: string[],
}


const AuctionHistory: React.FC<AuctionHistoryProps> = ({
    topItem, itemName
}) => {
    
    const {t} = useTranslation()
    const ifPhone = getDeviceTypeByUA()

    return(
        <section className="bg-[#111]/90 border border-white/15 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 md:px-6 py-1 rounded-full bg-[#B4FC75]/10 border border-[#B4FC75]/20 text-[#B4FC75] text-[11px] md:text-[14px] font-bold uppercase tracking-widest">
                        <BarChart3 size={ifPhone==="desktop"? 16:12} /> {t("milestone")}
                    </div>
                    <h2 className="mt-3 text-xl md:text-4xl font-bold tracking-tight">{t("transactionhight")}</h2>
                    <p className="text-gray-500 font-normal text-[12px] md:text-[16px]">{t("witness")}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topItem.map((item, idx) => (
                    <div key={idx} className="relative group cursor-default">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0a0a0a] rounded-full flex items-center justify-center font-mono font-bold border border-white/10 group-hover:border-[#B4FC75] group-hover:text-[#B4FC75] transition-all z-10">
                            {idx + 1}
                        </div>
                        
                        <div className="bg-black/40 border border-white/5 rounded-3xl p-6 hover:bg-black/60 transition-all h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-3 md:mb-6">
                                <div>
                                    <h4 className="text-xl font-bold font-mono text-white mb-1 group-hover:text-[#B4FC75] transition-colors">{itemName[idx]}</h4>
                                    <p className="text-[8px] md:text-[11px] text-gray-500 font-mono tracking-widest uppercase font-normal">{t("transactiontime")}: {item.updateTime.toNumber()}</p>
                                </div>
                                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#B4FC75] transition-colors">
                                    <Inbox size={18} />
                                </button>
                            </div>

                            <div className="flex items-end justify-between pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">最终成交价</p>
                                    <p className="text-2xl font-mono font-bold text-white leading-none">{item.highestPrice.toNumber()} <span className="text-sm text-[#B4FC75] ml-0.5">SOL</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 text-right">owner</p>
                                    <p className="text-xs font-mono text-gray-400">{cutString(item.highestBidder.toBase58(), 3, 3, "...")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5">
                {[
                    { label: "最高持有人", value: "SOL_Capital" },
                    { label: "全网总域名数", value: "1.2M+" },
                    { label: "个人最高流水", value: "142.5 SOL" },
                    { label: "创造者", value: "52,042 SOL" },
                ].map((stat, index) => (
                    <div key={index} className="text-center md:text-left">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">{stat.label}</p>
                        <p className="text-[12px] md:text-lg font-bold font-mono text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AuctionHistory;