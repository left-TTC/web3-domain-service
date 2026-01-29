import { Clock, Download, Monitor, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PlatformItem {
  name: string;
  icon: React.ElementType; // Lucide icon 组件
  version: string;
  status: "Stable" | "Beta" | "Coming Soon";
  isAvailable: boolean;
  desc: string;
}

const DownLoadContent = () => {

    const {t} = useTranslation()

    const platforms: PlatformItem[] = [
        { name: "Windows", icon: Monitor, version: "v0.0.1", status: "Stable", isAvailable: true, desc: "支持 x64 / ARM64" },
        { name: "macOS", icon: Monitor, version: "v0.0.1", status: "Stable", isAvailable: true, desc: "Apple Silicon / Intel" },
        { name: "Linux", icon: Monitor, version: "v0.0.1", status: "Stable", isAvailable: true, desc: ".AppImage / .deb" },
        { name: "Android", icon: Smartphone, version: "0.0.1", status: "Stable", isAvailable: true, desc: "正在进行内部测试" },
        { name: "iOS", icon: Smartphone, version: "-", status: "Coming Soon", isAvailable: false, desc: "等待 App Store 审核" },
    ];

    return (
        <section id="download" className="py-22 border-t border-white/5">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black mb-4 italic uppercase">{t("downloadHub")}</h2>
                <p className="text-gray-500 font-medium">全平台支持，随时随地开启 Web3 之旅</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((p, idx) => {
                const Icon = p.icon; 

                return (
                    <div
                        key={idx}
                        className={`relative group p-8 rounded-[2.5rem] border transition-all duration-300 ${
                            p.isAvailable
                            ? "bg-white/5 border-white/10 hover:border-[#B4FC75]/50 hover:bg-white/[0.08]"
                            : "bg-white/[0.02] border-white/5 opacity-60 cursor-not-allowed"
                        }`}
                    >
                        <div
                            className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                            p.status === "Stable"
                                ? "bg-[#B4FC75] text-black"
                                : p.status === "Beta"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-800 text-gray-400"
                            }`}
                        >
                            {p.status}
                        </div>

                        <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                            p.isAvailable ? "bg-[#B4FC75]/10 text-[#B4FC75]" : "bg-white/5 text-gray-600"
                            }`}
                        >
                            <Icon size={32} />
                        </div>

                        <h3 className="text-2xl font-black mb-2">{p.name}</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-snug">{p.desc}</p>

                        {p.isAvailable ? (
                            <button className="w-full py-4 bg-white/10 group-hover:bg-[#B4FC75] group-hover:text-black rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                                <Download size={18} /> 获取安装包
                            </button>
                        ) : (
                            <div className="w-full py-4 bg-white/5 rounded-2xl font-bold text-gray-600 flex items-center justify-center gap-2">
                                <Clock size={18} /> 敬请期待
                            </div>
                        )}

                    </div>
                );
                })}
            </div>
        </section>
    );
};

export default DownLoadContent;
