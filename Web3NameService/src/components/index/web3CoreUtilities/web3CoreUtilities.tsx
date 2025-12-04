import { useTranslation } from "react-i18next";

import { Layers3, ShieldCheck, Zap } from "lucide-react";

const Web3CoreUtilities = () => {

    const primaryColor = '#B4FC75';
    const {t} = useTranslation()

    return(
        <section className="mt-60">
            <h2 className="mt-40 text-3xl md:text-4xl font-bold text-center mb-16">
                为何选择 <span style={{ color: primaryColor }}>Web3 Domain Service </span>?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                { 
                    icon: <ShieldCheck size={32} style={{ color: primaryColor }} />, 
                    title: "永久所有权", 
                    desc: "域名作为 NFT 存储在您的钱包中，完全抗审查，由您终身拥有，不受中心化机构控制。" 
                },
                { 
                    icon: <Zap size={32} style={{ color: primaryColor }} />, 
                    title: "超低 Gas 费", 
                    desc: "基于 Solana 高性能网络，注册、转账和管理域名的成本极低，速度极快，几乎瞬间完成。" 
                },
                { 
                    icon: <Layers3 size={32} style={{ color: primaryColor }} />, 
                    title: "跨链兼容性", 
                    desc: "不仅仅是 Solana 地址，一个域名可以解析到 ETH, BTC, Polygon 等多个链的地址，实现一站式支付。" 
                },
                ].map((feature, index) => (
                    <div 
                        key={index} 
                        className="bg-[#111] border border-white/10 rounded-xl p-8 transition-all duration-300 hover:border-[#B4FC75]/50 hover:shadow-[0_0_25px_rgba(180,252,117,0.15)]"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Web3CoreUtilities;


