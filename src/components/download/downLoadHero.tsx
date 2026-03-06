
import { Code, Cpu, Download } from "lucide-react";
import kilo from "@/assets/kilo-64.svg"
import { useTranslation } from "react-i18next";

const DownLoadHero = () => {
    const { t } = useTranslation();

    return(
        <section id="about" className="pt-5 pb-25">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex items-center gap-[20px]">
                        <div className="bg-white/30 rounded-xl p-[3px]">
                            <img src={kilo} className="w-[36px] md:w-[45px]"/>
                        </div>
                        <span className="text-[13px] md:text-xl font-black tracking-tighter uppercase italic">KILO BROWSER</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#B4FC75]">
                        <Cpu size={14} /> {t("poweredBySolana")}
                    </div>
                </div>

                <h3 className="text-5xl md:text-7xl font-black mb-8 leading-[1.3] tracking-tighter uppercase italic mt-25 md:mt-30">
                    {t("futureInternetFirstEntry")}
                </h3>

                <p className="text-gray-400 text-[12px] md:text-[20px] max-w-3xl font-medium leading-relaxed mb-10">
                    {t("kiloBrowserDescriptionHero")}
                </p>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    <a href="#download" className="px-10 py-4 bg-[#B4FC75] text-black font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-[#B4FC75]/20">
                        <Download size={20} /> {t("installNow")}
                    </a>
                    <a href="https://github.com/left-TTC/kilo-browser" className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:scale-105 transition-transform text-gray-400 text-sm flex items-center gap-4 uppercase">
                        <Code size={18} /> 
                        <span>{t("checkSourceCode")}</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default DownLoadHero;


