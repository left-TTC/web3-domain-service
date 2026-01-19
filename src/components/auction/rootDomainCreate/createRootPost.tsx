import { getDeviceTypeByUA } from "@/utils/functional/wallet/isPhone";
import { Plus, Rocket, ShieldCheck, Sliders, Terminal, Zap } from "lucide-react";

const primaryColor = '#B4FC75'; 

interface CreateRootPostProps {
    newRoot: string,
    setNewRoot: React.Dispatch<React.SetStateAction<string>>,
    showSettle: () => void,
}

const CreateRootPost: React.FC<CreateRootPostProps> = ({
    newRoot, setNewRoot, showSettle
}) => {

    const isPhone = getDeviceTypeByUA()

    return (
        <section className="relative mt-0 md:mt-10">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B4FC75]/30 to-transparent -z-10"/>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl md:rounded-3xl p-1 md:p-2 max-w-5xl mx-auto shadow-2xl shadow-black/50">
                <div className="bg-[#111] rounded-2xl p-6 md:p-8 md:p-12 overflow-hidden relative">
                    <Rocket className="absolute top-0 right-0 w-64 h-64 text-white/5 -rotate-12 translate-x-20 -translate-y-10" />

                    <div className="grid md:grid-cols-2 gap-6 md:gap-12 relative z-10">
                        <div>
                            <h2 className="text-xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded bg-[#B4FC75] text-black">
                                    <Plus size={isPhone==="desktop"? 24:17} strokeWidth={3} />
                                </span>
                                铸造新根域
                            </h2>
                            <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed font-normal text-[12px] md:text-[15px]">
                                没有找到想要的顶级域名？您可以发起一个新的提案。如果该域名符合 Solana 命名规范且在 7 天内筹集到足够的初始质押金，它将被永久写入根服务器。
                            </p>
                            
                            <ul className="space-y-4">
                                {[
                                    { icon: <Terminal size={18} />, text: "完全去中心化治理" },
                                    { icon: <ShieldCheck size={18} />, text: "抗审查的所有权记录" },
                                    { icon: <Sliders size={18} />, text: "完全自定义的域名" }
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-[13px] md:text-sm font-medium text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#B4FC75]">
                                            {feature.icon}
                                        </div>
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-[10px] md:rounded-xl p-6 flex flex-col justify-center">
                            <label className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Root Name to Mint
                            </label>
                            
                            <div className="relative mb-4 md:mb-16 group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-600 font-mono">.</span>
                                <input 
                                    type="text" 
                                    value={newRoot}
                                    onChange={(e) => setNewRoot(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                                    placeholder="web3"
                                    className="w-full bg-[#050505] border-2 border-white/20 rounded-xl py-3 md:py-4 pl-8 pr-4 placeholder:text-xl md:placeholder:text-3xl text-xl md:text-3xl font-bold font-mono text-white focus:outline-none focus:border-[#B4FC75] transition-colors placeholder-gray-700"
                                    maxLength={10}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {newRoot && <span className="text-[#B4FC75] text-xs font-mono bg-[#B4FC75]/10 px-2 py-1 rounded">AVAILABLE</span>}
                                </div>
                            </div>

                            <button
                                onClick={() => showSettle()} 
                                className="w-full py-2 md:py-4 rounded-[6px] md:rounded-xl font-bold text-[14px] md:text-lg text-black hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-[#B4FC75]/20 flex items-center justify-center gap-2"
                                style={{ backgroundColor: primaryColor }}
                            >
                                <Zap size={20} fill="black" />
                                Initialize Proposal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 

export default CreateRootPost;
