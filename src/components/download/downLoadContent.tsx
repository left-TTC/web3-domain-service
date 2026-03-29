import { Clock, Download, Monitor, Smartphone, Github, HardDrive } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface PlatformItem {
    name: string;
    icon: React.ElementType; 
    version: string;
    status: "Stable" | "Beta" | "Coming Soon";
    isAvailable: boolean;
    desc?: string;
    githubLink?: string;
    ipfsLink?: string;
}

const DownLoadContent = () => {
    const {t} = useTranslation();
    const [splitPlatform, setSplitPlatform] = useState<string | null>(null);

    const platforms: PlatformItem[] = [
        { 
            name: "Windows", 
            icon: Monitor, 
            version: "v0.0.1", 
            status: "Beta", 
            isAvailable: true, 
            desc: t("windowsDesc"), 
            githubLink: "https://github.com/left-TTC/kilo-browser/releases/download/dev/Kilo.Installer.exe",
        },
        { 
            name: "Android", 
            icon: Smartphone, 
            version: "0.0.1", 
            status: "Coming Soon", 
            isAvailable: false, 
            desc: t("androidDesc")
        },
        { 
            name: "Linux", 
            icon: Monitor, 
            version: "v0.0.1", 
            status: "Coming Soon", 
            isAvailable: false, 
            desc: t("linuxDesc") 
        },
        { 
            name: "macOS", 
            icon: Monitor, 
            version: "v0.0.1", 
            status: "Coming Soon", 
            isAvailable: false, 
            desc: t("macOSDesc") 
        },
        { 
            name: "iOS", 
            icon: Smartphone, 
            version: "-", 
            status: "Coming Soon", 
            isAvailable: false, 
            desc: t("iOSDesc") 
        },
    ];

    const handleDownloadClick = (platformName: string) => {
        setSplitPlatform(platformName === splitPlatform ? null : platformName);
    };

    const handleLinkClick = (link: string) => {
        window.location.href = link;
    };

    return (
        <section id="download" className="py-10 md:py-22 border-t border-white/5">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-6xl font-black mb-4 italic uppercase">{t("downloadHub")}</h2>
                <p className="text-[12px] md:text-[15px] text-gray-500 font-medium">{t("downloadPlatformSupport")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((p, idx) => {
                    const Icon = p.icon; 
                    const isSplit = splitPlatform === p.name;

                    return (
                        <div
                            key={idx}
                            className={`relative group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 ${
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
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 ${
                                p.isAvailable ? "bg-[#B4FC75]/10 text-[#B4FC75]" : "bg-white/5 text-gray-600"
                                }`}
                            >
                                <Icon size={32} />
                            </div>

                            <h3 className="text-[15px] md:text-2xl font-black mb-2">{p.name}</h3>
                            <p className="text-gray-500 text-[12px] md:text-sm mb-5 md:mb-8 leading-snug">{p.desc}</p>

                            {p.isAvailable ? (
                                <div className="space-y-3">
                                    {!isSplit ? (
                                        <button 
                                            onClick={() => handleDownloadClick(p.name)}
                                            className="text-[12px] md:text-[16px] w-full py-4 bg-white/10 group-hover:bg-[#B4FC75] group-hover:text-black rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                                        >
                                            <Download size={18} /> {t("getInstaller")}
                                        </button>
                                    ) : (
                                        <>
                                            <div className="text-[10px] text-gray-500 text-center ">
                                                {t("chooseDownloadMethod")}
                                            </div>
                                            <div className="text-[12px] md:text-[16px] w-full py-4 transition-all flex items-center justify-between gap-2">
                                                {p.githubLink &&
                                                    <button 
                                                        onClick={() => p.githubLink && handleLinkClick(p.githubLink)}
                                                        className="text-[11px] px-2 md:text-[14px] w-full py-5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <Github size={16} /> 
                                                        <span className="text-[10px] text-blue-300 ml-auto">{t("forUsersWithVPN")}</span>
                                                    </button>
                                                }
                                                {p.ipfsLink && 
                                                    <button 
                                                        onClick={() => p.ipfsLink && handleLinkClick(p.ipfsLink)}
                                                        className="text-[11px] px-2 md:text-[14px] w-full py-5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <HardDrive size={16} /> 
                                                        <span className="text-[10px] text-purple-300 ml-auto">{t("forUsersWithoutVPN")}</span>
                                                    </button>
                                                }
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-[12px] md:text-[16px] w-full py-4 bg-white/5 rounded-2xl font-bold text-gray-600 flex items-center justify-center gap-2">
                                    <Clock size={18} /> {t("comingSoon")}
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
