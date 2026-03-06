
import { Layers3, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const primaryColor = '#B4FC75';

const Web3CoreUtilities = () => {

    const {t} = useTranslation()

    return(
        <section className="mt-20 md:mt-70">
            <h2 className="text-[25px] md:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">
                {t("whytchoose")} <span style={{ color: primaryColor }}>Web3 Domain Service </span>?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[ 
                    { 
                        icon: <ShieldCheck size={32} style={{ color: primaryColor }} />, 
                        titleKey: "fullyDecentralizedOwnership", 
                        descKey: "fullyDecentralizedOwnershipDesc" 
                    },
                    { 
                        icon: <Layers3 size={32} style={{ color: primaryColor }} />, 
                        titleKey: "anonymousIdentityPrivacy", 
                        descKey: "anonymousIdentityPrivacyDesc" 
                    },
                    { 
                        icon: <Zap size={32} style={{ color: primaryColor }} />, 
                        titleKey: "ultraLowGasFees", 
                        descKey: "ultraLowGasFeesDesc" 
                    },
                ].map((feature, index) => (
                    <div 
                        key={index} 
                        className="bg-[#111] border border-white/10 rounded-xl p-6 sm:p-8 transition-all duration-300 hover:border-[#B4FC75]/50 hover:shadow-[0_0_25px_rgba(180,252,117,0.15)]"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{t(feature.titleKey)}</h3>
                        <p className="text-gray-400 font-normal text-[13px]">{t(feature.descKey)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Web3CoreUtilities;


