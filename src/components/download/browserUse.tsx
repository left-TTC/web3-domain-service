import { Globe, Settings, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

const BrowserUse = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <Settings className="text-blue-400" />,
            title: t("checkNetworkPortStatus"),
            description: t("checkNetworkPortStatusDesc")
        },
        {
            icon: <Globe className="text-[#B4FC75]" />,
            title: t("accessWeb3Domains"),
            description: t("accessWeb3DomainsDesc")
        },
        {
            icon: <Wrench className="text-purple-400" />,
            title: t("troubleshooting"),
            description: t("troubleshootingDesc")
        }
    ];

    return (
        <section className="py-18 md:py-24 px-6relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        {t("usageGuide")}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-4">
                        {t("howToStartUsingKilo")}
                    </h2>
                    <p className="text-gray-500 max-w-xl font-normal mx-auto">
                        {t("downloadInstallSimpleSteps")}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="group p-5 md:p-8 rounded-[1rem] md:rounded-[2.5rem] border border-white/5 bg-white/5 hover:border-white/20 transition-all duration-500"
                        >
                            <div className="w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center border border-white/10 mb-3 md:mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-[13px] md:text-xl font-bold mb-3 italic tracking-tight uppercase">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 font-normal text-[11px] md:text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowserUse;