import { Coins, Globe, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

const DownLoadIntroduce = () => {
    const { t } = useTranslation();

    return(
        <section className="py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center border-t border-white/5">
            <div className="space-y-6">
                <h3 className="text-[11px] md:text-[22px] font-black italic uppercase leading-none">
                    {t("whyChooseKiloBrowser")}
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[#B4FC75] shrink-0"><Layers size={24} /></div>
                        <div>
                            <h4 className="text-[12px] md:text-[14px] font-bold mb-1">{t("nativeWeb3DomainResolution")}</h4>
                            <p className="text-[11px] md:text-[12px] text-gray-500 font-normal">{t("nativeWeb3DomainResolutionDesc")}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[#B4FC75] shrink-0"><Coins size={24} /></div>
                        <div>
                            <h4 className="text-[12px] md:text-[14px] font-bold mb-1">{t("domainsThatPayYou")}</h4>
                            <p className="text-[11px] md:text-[12px] text-gray-500 font-normal">{t("domainsThatPayYouDesc")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative aspect-video bg-gradient-to-br from-[#B4FC75]/20 to-purple-600/20 rounded-[2rem] border border-white/10 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-700"></div>
                <Globe className="w-20 h-20 text-[#B4FC75] relative z-10 animate-pulse" />
            </div>
        </section>
    )
}

export default DownLoadIntroduce;
