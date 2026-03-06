import { Users, Globe, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const BrowserProfit = () => {
    const { t } = useTranslation();

    const earningSchemes = [
        {
            title: t("invitationDividendMechanism"),
            desc: t("invitationDividendMechanismDesc"),
            reward: t("invitationDividendMechanismReward"),
            icon: <Users className="text-blue-400" />,
            tag: t("passiveIncome"),
            color: "from-blue-500/20 to-transparent"
        },
        {
            title: t("earlyDomainMinting"),
            desc: t("earlyDomainMintingDesc"),
            reward: t("earlyDomainMintingReward"),
            icon: <Globe className="text-[#B4FC75]" />,
            tag: t("lowRiskInvestment"),
            color: "from-[#B4FC75]/20 to-transparent"
        },
        {
            title: t("domainSpeculationAuction"),
            desc: t("domainSpeculationAuctionDesc"),
            reward: t("domainSpeculationAuctionReward"),
            icon: <TrendingUp className="text-red-400" />,
            tag: t("highReturn"),
            color: "from-red-500/20 to-transparent"
        }
    ];

    return (
        <section className="py-16 sm:py-20 px-6 bg-[#0a0a0a] relative overflow-hidden rounded-2xl">
            {/* Background glow effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B4FC75]/5 blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-6 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        {t("economyModel")}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-4">
                        {t("digitalLandEarnFuture")}
                    </h2>
                    <p className="text-[12px] md:text-[15px] font-normal text-gray-500 max-w-xl mx-auto">
                        {t("kiloDomainNotJustEntry")}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {earningSchemes.map((item, i) => (
                        <div 
                            key={i} 
                            className={`group p-6 md:p-8 rounded-[1rem] md:rounded-[2.5rem] border border-white/5 bg-white/5 hover:border-white/20 transition-all duration-500 relative overflow-hidden`}
                        >
                            {/* Decorative card background gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-5 md:mb-8">
                                    <div className="w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center border border-white/10">
                                        {item.icon}
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                        {item.tag}
                                    </span>
                                </div>
                                <h3 className="text-[14px] md:text-xl font-bold mb-3 italic tracking-tight uppercase">{item.title}</h3>
                                <p className="font-normal text-[12px] md:text-[14px] text-gray-500 leading-relaxed mb-4 md:mb-8">
                                    {item.desc}
                                </p>
                                <div className="p-3 md:p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <div className="text-[10px] font-black text-gray-500 uppercase mb-1">{t("estimatedReturn")}</div>
                                    <div className="text-[13px] md:text-lg font-black italic tracking-tighter text-white group-hover:text-[#B4FC75] transition-colors">{item.reward}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowserProfit;