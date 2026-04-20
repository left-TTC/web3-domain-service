import { Unplug, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface InactiveAccountPlaceholderProps {
    onActivateClick?: () => void;
}

const InactiveAccountPlaceholder: React.FC<InactiveAccountPlaceholderProps> = ({
    onActivateClick,
}) => {
    const { t } = useTranslation();

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col items-center justify-center p-8 md:p-12 rounded-xl border border-orange-400/30 bg-gradient-to-br from-[#111] to-[#1a1a1a]">
                <div className="mb-6 p-4 rounded-full bg-orange-400/10 border border-orange-400/30">
                    <AlertCircle size={48} className="text-orange-400" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center">
                    {t("accountNotActivated")}
                </h3>
                
                <p className="text-gray-400 text-sm md:text-base text-center max-w-md mb-8">
                    {t("accountNotActivatedDescription")}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
                    <div className="p-4 rounded-lg border border-white/10 bg-[#111]">
                        <div className="text-orange-400 font-semibold mb-2">1</div>
                        <div className="text-white text-sm mb-1">{t("connectWallet")}</div>
                        <div className="text-gray-400 text-xs">{t("connectWalletDescription")}</div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-white/10 bg-[#111]">
                        <div className="text-orange-400 font-semibold mb-2">2</div>
                        <div className="text-white text-sm mb-1">{t("activateAccount")}</div>
                        <div className="text-gray-400 text-xs">{t("activateAccountDescription")}</div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-white/10 bg-[#111]">
                        <div className="text-orange-400 font-semibold mb-2">3</div>
                        <div className="text-white text-sm mb-1">{t("startEarning")}</div>
                        <div className="text-gray-400 text-xs">{t("startEarningDescription")}</div>
                    </div>
                </div>
                
                <button
                    onClick={onActivateClick}
                    className="flex items-center justify-center gap-3 px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <Unplug size={20} />
                    <span>{t("clickToActivate")}</span>
                </button>
                
                <div className="mt-6 text-gray-500 text-xs text-center">
                    {t("activationNote")}
                </div>
            </div>
        </div>
    );
};

export default InactiveAccountPlaceholder;
