

import { Code } from "lucide-react";
import { StateCard } from "./stateCard";

const DomainUsrShow = () => {

    const primaryColor = '#B4FC75'; 

    return (
        <section className="bg-[#111] mt-20 md:mt-50 border border-white/10 rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold mb-6">简单的三步注册流程</h2>
                    <div className="space-y-6">
                        {[
                        { step: 1, title: "搜索与检查", desc: "在搜索栏输入想要的名称，系统将实时检查该域名是否可用，以及当前的最低注册价格。" },
                        { step: 2, title: "连接并购买", desc: "连接您的 Solana 钱包，确认交易。您的 SOL 将用于支付域名注册费和微量网络费。" },
                        { step: 3, title: "设置解析记录", desc: "注册成功后，即可进入管理后台，将您的域名指向任何您拥有的钱包地址或 IPFS 内容哈希。" }
                        ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-black" style={{ backgroundColor: primaryColor }}>
                            {item.step}
                            </div>
                            <div>
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10 pt-8 lg:pt-0 space-y-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Code size={24} style={{ color: primaryColor }} /> 核心数据
                    </h2>
                    
                    <StateCard label="已注册域名总数" value="482,109" color={primaryColor} />
                    <StateCard label="总交易量 (SOL)" value="2.5M+" color={primaryColor} />
                    <StateCard label="当前地板价" value="2.0 SOL" color={primaryColor} />

                </div>
            </div>
        </section>
    )
}

export default DomainUsrShow;
