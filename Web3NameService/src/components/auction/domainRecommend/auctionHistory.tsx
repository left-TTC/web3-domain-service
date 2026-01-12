import { ArrowUpRight, BarChart3, Star } from "lucide-react";

interface AuctionHistoryProps {

}

interface TopSaleDomain {
    name: string;
    salePriceSOL: number;
    date: string;
    buyer: string;
}


const MOCK_TOP_SALES: TopSaleDomain[] = [
    { name: "wallet.sol", salePriceSOL: 5000.0, date: "2023-11-12", buyer: "7xR...9wP" },
    { name: "bank.sol", salePriceSOL: 2800.0, date: "2023-12-05", buyer: "Ax2...Klm" },
    { name: "play.sol", salePriceSOL: 1500.0, date: "2024-01-02", buyer: "D5s...tYq" },
    { name: "earn.sol", salePriceSOL: 950.0, date: "2024-01-08", buyer: "BfG...32z" },
    { name: "chat.sol", salePriceSOL: 820.0, date: "2023-10-20", buyer: "Kk9...pLm" },
    { name: "web3.sol", salePriceSOL: 750.0, date: "2024-01-10", buyer: "QwE...11x" },
];


const AuctionHistory: React.FC<AuctionHistoryProps> = ({
    
}) => {
    

    return(
        <section className="bg-[#111]/90 border border-white/15 rounded-[3rem] p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B4FC75]/10 border border-[#B4FC75]/20 text-[#B4FC75] text-[10px] font-bold uppercase tracking-widest">
                        <BarChart3 size={12} /> 历史里程碑
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">全网最高成交金额</h2>
                    <p className="text-gray-500 max-w-lg">见证 Solana 生态中最具价值的顶级域名成交纪录，数据通过链上实时验证。</p>
                </div>
                
                <button className="px-8 py-4 rounded-2xl border border-white/10 font-bold text-sm hover:bg-white/5 transition-all flex items-center gap-2 group">
                    查看完整排行榜 <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_TOP_SALES.map((sale, idx) => (
                    <div key={sale.name} className="relative group cursor-default">
                        {/* 排名数字 */}
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0a0a0a] rounded-full flex items-center justify-center font-mono font-bold border border-white/10 group-hover:border-[#B4FC75] group-hover:text-[#B4FC75] transition-all z-10">
                            {idx + 1}
                        </div>
                        
                        <div className="bg-black/40 border border-white/5 rounded-3xl p-6 hover:bg-black/60 transition-all h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xl font-bold font-mono text-white mb-1 group-hover:text-[#B4FC75] transition-colors">{sale.name}</h4>
                                    <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">成交时间: {sale.date}</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#B4FC75] transition-colors">
                                    <Star size={18} />
                                </div>
                            </div>

                            <div className="flex items-end justify-between pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">最终成交价</p>
                                    <p className="text-2xl font-mono font-bold text-white leading-none">{sale.salePriceSOL.toLocaleString()} <span className="text-sm text-[#B4FC75] ml-0.5">SOL</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 text-right">买家</p>
                                    <p className="text-xs font-mono text-gray-400">{sale.buyer}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5">
                {[
                    { label: "平均成交价", value: "142.5 SOL" },
                    { label: "总成交额 (24h)", value: "52,042 SOL" },
                    { label: "最高持有人", value: "SOL_Capital" },
                    { label: "全网总域名数", value: "1.2M+" }
                ].map((stat, index) => (
                    <div key={index} className="text-center md:text-left">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">{stat.label}</p>
                        <p className="text-lg font-bold font-mono text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AuctionHistory;