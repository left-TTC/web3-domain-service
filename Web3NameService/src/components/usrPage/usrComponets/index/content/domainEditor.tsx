import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { Activity, ChevronLeft, DollarSign, ExternalLink, FileCode, Globe, Info, Settings, ShieldCheck} from "lucide-react";
import { useState } from "react";


const primaryColor = '#B4FC75'; 

interface DomainEditorProps {
    closeFn: () => void,
    IPFSState: IPFSRecordState | null,
    nameState: NameRecordState | null,
    domainName: string,
}

const DomainEditor: React.FC<DomainEditorProps> = ({
    closeFn, IPFSState, nameState, domainName
}) => {
    const [tempPrice, setTempPrice] = useState(nameState?.customPrice.toNumber() || 0);
    const [tempCid, setTempCid] = useState(IPFSState?.recordData || '');

    

    return (
        <div className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 mt-50 bg-[#111111] pb-8 pt-8 border-2 border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <button 
                        onClick={() => closeFn()}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} /> 返回列表
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#B4FC75]/10 border border-[#B4FC75]/20 rounded-full text-[#B4FC75] text-xs font-mono">
                        <ShieldCheck size={14} /> 所有权已验证
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-6 w-full">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Settings size={20} style={{ color: primaryColor }} /> 配置: {domainName}
                        </h3>
                        
                        <div className="space-y-4 mb-8">
                            <label className="text-xs font-bold text-gray-500 uppercase">市场标价 (SOL)</label>
                            <div className="flex gap-3">
                                <div className="relative flex-1 group">
                                    <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#B4FC75]" />
                                    <input 
                                        type="number"
                                        value={tempPrice}
                                        onChange={(e) => setTempPrice(parseFloat(e.target.value))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 font-mono text-white focus:outline-none focus:border-[#B4FC75]/50"
                                    />
                                </div>
                                <button 
                                    onClick={() => {}}
                                    className="px-6 rounded-xl bg-white/10 border border-white/10 text-sm font-bold hover:bg-white/20 transition-all"
                                >
                                    更新价格
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-500 uppercase">IPFS 内容部署 (CID)</label>
                            <div className="flex gap-3">
                            <div className="relative flex-1 group">
                                <FileCode size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#B4FC75]" />
                                <input 
                                    type="text"
                                    value={tempCid}
                                    onChange={(e) => setTempCid(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 font-mono text-sm text-white focus:outline-none focus:border-[#B4FC75]/50"
                                    placeholder="Qm..."
                                />
                            </div>
                            <button 
                                onClick={() => {}}
                                className="px-6 rounded-xl bg-white/10 border border-white/10 text-sm font-bold hover:bg-white/20 transition-all"
                            >
                                更新记录
                            </button>
                            </div>
                        </div>
                        </div>

                        <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex gap-3 items-start">
                            <Info size={16} className="text-yellow-500 mt-0.5" />
                            <p className="text-xs text-gray-400 leading-relaxed">
                                每次修改记录都会触发一次 Solana 链上交互。请确保您的钱包中有足够的 SOL 用于支付网络燃料费。
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-80 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#B4FC75]/10 rounded-full blur-2xl"/>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[#B4FC75] text-black flex items-center justify-center mb-6">
                                    <Globe size={24} />
                                </div>
                                <h4 className="text-2xl font-bold mb-1">{domainName}</h4>
                                <p className="text-xs text-gray-500 font-mono mb-6">SOLANA NAME SERVICE</p>
                                
                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">当前价值</span>
                                        <span className="text-white font-mono">{tempPrice || '未定价'} SOL</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">状态</span>
                                        <span className="text-green-400 font-bold">活跃 (Active)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs text-gray-400 space-y-2">
                            <div className="flex items-center gap-2"><Activity size={12} /> 24h 访问量: 1,204</div>
                            <div className="flex items-center gap-2"><ExternalLink size={12} /> <span className="underline cursor-pointer">在浏览器中查看</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

  export default DomainEditor;