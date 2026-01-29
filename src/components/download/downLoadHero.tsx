
import { Code, Cpu, Download } from "lucide-react";
import kilo from "@/assets/kilo-64.svg"

const primaryColor = '#B4FC75'; 

const DownLoadHero = () => {

    return(
        <section id="about" className="pt-16 pb-25">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex items-center gap-[20px]">
                        <div className="bg-white/30 rounded-xl p-[3px]">
                            <img src={kilo} className="w-[45px]"/>
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase italic">KILO BROWSER</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#B4FC75]">
                        <Cpu size={14} /> Powered by Solana 
                    </div>
                </div>

                <h3 className="text-5xl md:text-7xl font-black mb-8 leading-[1.3] tracking-tighter uppercase italic mt-30">
                    未来互联网的 <br/>
                    <span style={{ color: primaryColor }}>第一入口</span>
                </h3>

                <p className="text-gray-400 text-[15px] md:text-[20px] max-w-3xl font-medium leading-relaxed mb-10">
                    <span className="text-white">KILO</span> 不仅仅是一款浏览器，它是通往 Web3 世界的视窗。
                    基于 Brave 改造，我们将区块链解析能力原生植入浏览器底层，消除复杂插件，让去中心化域名体验与传统域名一样丝滑。
                </p>

                <div className="flex flex-wrap justify-center gap-8">
                    <a href="#download" className="px-10 py-4 bg-[#B4FC75] text-black font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-[#B4FC75]/20">
                        <Download size={20} /> 立即安装
                    </a>
                    <a href="https://github.com/left-TTC/kilo" className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:scale-105 transition-transform text-gray-400 text-sm flex items-center gap-4 uppercase">
                        <Code size={18} /> 
                        <span>Check source code</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default DownLoadHero;


