
import { ArrowRight, Layers, Monitor, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReferrer } from "@/provider/referrerProvider.tsx/referrerProvider";


const Kilo = () => {

    const {referrer} = useReferrer()

    const { t } = useTranslation();
    const nav = useNavigate();

    return(
        <div className="lg:col-span-6 z-10 py-10 md:py-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-8 sm:w-12 bg-[#B4FC75]"></div>
                <span className="text-[#B4FC75] font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm">Next Generation Browser</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-white mb-5 md:mb-8 italic uppercase leading-[0.9] tracking-tighter">
                KILO <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">BROWSER</span>
            </h2>

            <p className="text-[14px] md:text-[16px] text-gray-400 mb-12 max-w-xl leading-relaxed font-light">
                {t("kiloBrowserDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
                <button 
                    onClick={() => {if(referrer){nav("/download?r=" + referrer)}else{nav("/download")}; window.scrollTo({ top: 0, behavior: "instant" })}}
                    className="group relative px-10 py-5 bg-[#B4FC75] text-black font-black text-lg rounded-full overflow-hidden transition-all hover:pr-14"
                >
                    <span className="text-[13px] md:text-[15px] relative z-10 flex items-center gap-2">
                        {t("enterDownloadPage")} <ArrowRight size={22} />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>

                <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-4 text-gray-500">
                        <Monitor size={20} className="hover:text-white transition-colors" />
                        <Smartphone size={20} className="hover:text-white transition-colors" />
                        <Layers size={20} className="hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs text-gray-600 font-mono tracking-tighter">SUPPORTED: WIN / LINUX / ANDROID</span>
                </div>
            </div>

            <div className="mt-10 md:mt-20 grid grid-cols-3 gap-8">
                {[
                    { label: 'Speed', value: '0.1s', desc: 'Node Sync' },
                    { label: 'Security', value: 'AES', desc: 'Encrypted' },
                    { label: 'Open', value: 'MPL-2.0', desc: 'Source Code' }
                ].map((stat, i) => (
                    <div key={i} className="group cursor-default">
                        <div className="text-[#B4FC75] font-black text-[13px] md:text-2xl mb-1 group-hover:translate-x-1 transition-transform">{stat.value}</div>
                        <div className="text-white text-[10px] uppercase font-bold tracking-widest mb-1">{stat.label}</div>
                        <div className="text-gray-600 text-[10px]">{stat.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Kilo;


