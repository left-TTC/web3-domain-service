import { Globe, Layers, Zap } from "lucide-react";

const DownLoadIntroduce = () => {

    return(
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-t border-white/5">
            <div className="space-y-6">
                <h2 className="text-4xl font-black italic uppercase leading-none">
                    为什么选择<br/>KILO BROWSER?
                </h2>
                <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[#B4FC75] shrink-0"><Layers size={24} /></div>
                        <div>
                            <h4 className="font-bold mb-1">原生 web3 域名解析</h4>
                            <p className="text-sm text-gray-500 font-normal">无需安装任何插件,地址栏直接访问.kilo等顶级域名,支持去中心化内容的一键触达。</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[#B4FC75] shrink-0"><Zap size={24} /></div>
                        <div>
                            <h4 className="font-bold mb-1">完全匿名</h4>
                            <p className="text-sm text-gray-500 font-normal">采用IPFS系统与SOLANA RPC的结合, 实现域名完全自主与匿名</p>
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