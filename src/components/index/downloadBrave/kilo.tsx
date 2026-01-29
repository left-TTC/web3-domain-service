
import { ArrowRight, Layers, Monitor, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Kilo = () => {

    const nav = useNavigate()

    return(
        <div className="lg:col-span-6 z-10 py-20">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-12 bg-[#B4FC75]"></div>
                <span className="text-[#B4FC75] font-bold tracking-[0.2em] uppercase text-sm">Next Generation Browser</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 italic uppercase leading-[0.9] tracking-tighter">
                KILO <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">BROWSER</span>
            </h2>

            <p className="text-xl text-gray-400 mb-12 max-w-xl leading-relaxed font-light">
                专为 Web3 域名打造的极速浏览器。深度集成 Solana 节点，支持原生域名解析与硬件级加密保护，重新定义你的链上交互体验。
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
                <button 
                    onClick={() => {nav("/download"); window.scrollTo({ top: 0, behavior: "instant" })}}
                    className="group relative px-10 py-5 bg-[#B4FC75] text-black font-black text-lg rounded-full overflow-hidden transition-all hover:pr-14"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        立即进入下载页面 <ArrowRight size={22} />
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 text-gray-500">
                        <Monitor size={20} className="hover:text-white transition-colors" />
                        <Smartphone size={20} className="hover:text-white transition-colors" />
                        <Layers size={20} className="hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs text-gray-600 font-mono tracking-tighter">SUPPORTED: WIN / MAC / LINUX / IOS / ANDROID</span>
                </div>
            </div>

            <div className="mt-20 grid grid-cols-3 gap-8">
                {[
                { label: 'Speed', value: '0.1s', desc: 'Node Sync' },
                { label: 'Security', value: 'AES', desc: 'Encrypted' },
                { label: 'Open', value: 'GPLv3', desc: 'Source Code' }
                ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                    <div className="text-[#B4FC75] font-black text-2xl mb-1 group-hover:translate-x-1 transition-transform">{stat.value}</div>
                    <div className="text-white text-[10px] uppercase font-bold tracking-widest mb-1">{stat.label}</div>
                    <div className="text-gray-600 text-[10px]">{stat.desc}</div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Kilo;


