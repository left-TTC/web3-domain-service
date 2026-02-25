import DomainSetModel, { DomainSetType } from "@/components/settle/domainSetModel";
import { UseProtocol, type IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { PublicKey } from "@solana/web3.js";
import { Activity, ChevronLeft, Database, ExternalLink, Globe, Info, Save, Settings, ShieldCheck} from "lucide-react";
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
    const [tempCid, setTempCid] = useState('');
    const [selectedProtocol, setSelectedProtocol] = useState<UseProtocol>(UseProtocol.IPFS);

    const [newValue, setNewValue] = useState<string | number>("")
    const [showSetModel, setShowSetModel] = useState(false)

    const rewritePrice = () => {
        setNewValue(tempPrice)
        setShowSetModel(true)
    }
    const rewriteCid = () => {
        setNewValue(tempCid)
        setShowSetModel(true)
    }

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
                                    <div className="
                                        absolute left-4 top-1/2 -translate-y-1/2
                                        text-xs font-mono font-bold
                                        text-gray-500
                                        group-focus-within:text-[#B4FC75]
                                    ">
                                        SOL
                                    </div>
                                    <input 
                                        placeholder={String(nameState?.customPrice.toNumber() || 0)}
                                        type="number"
                                        value={tempPrice}
                                        onChange={(e) => setTempPrice(parseFloat(e.target.value))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 font-mono text-white focus:outline-none focus:border-[#B4FC75]/50"
                                    />
                                </div>
                                <button 
                                    onClick={() => rewritePrice()}
                                    className="px-6 rounded-xl bg-white/10 border border-white/10 text-sm font-bold hover:bg-white/20 transition-all"
                                >
                                    更新价格
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">内容寻址与部署 (Content Resolver)</label>
                
                        <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
                            {Object.values(UseProtocol).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setSelectedProtocol(p)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedProtocol === p ? 'bg-white/10 text-[#B4FC75]' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {p.toUpperCase()}
                                </button>
                            ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="relative flex-1 group">
                                    <Database size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#B4FC75]" />
                                    <input 
                                        type="text"
                                        value={tempCid}
                                        onChange={(e) => setTempCid(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 font-mono text-sm text-white focus:outline-none focus:border-[#B4FC75]/50"
                                        placeholder={selectedProtocol === 'ipfs' ? "输入 Qm... 或 ba..." : "输入动态 IPNS ID 或 Hash"}
                                    />
                                </div>
                                <button 
                                    onClick={() => rewriteCid()}
                                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-[#B4FC75] font-bold hover:bg-white/10 transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    <Save size={16} /> 更新 {selectedProtocol.toUpperCase()} 记录
                                </button>
                            </div>
                        </div>
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-3 items-start">
                            <Info size={16} className="text-blue-400 mt-0.5" />
                            <p className="text-xs text-gray-400 leading-relaxed">
                                <span className="text-white font-bold">IPFS</span> 适用于静态内容，<span className="text-white font-bold">IPNS</span> 允许您在不更改解析地址的情况下更新内容。选择适合您 DApp 部署需求的协议。
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
                                <p className="text-xs text-gray-500 font-mono mb-6">WEB3 NAME SERVICE</p>
                                
                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-600 uppercase">当前解析服务</p>
                                        <p className="text-xs text-[#B4FC75] font-mono">{(IPFSState?.recordType ?? "无").toUpperCase()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-600 uppercase">当前哈希</p>
                                        <p className="text-[10px] text-white font-mono break-all opacity-80">{IPFSState?.recordData || '未配置'}</p>
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

                {showSetModel &&
                    <DomainSetModel
                        domainName={domainName}
                        newValue={newValue}
                        type={typeof newValue === 'number'? DomainSetType.Price : DomainSetType.Cid}
                        onClose={() => setShowSetModel(false)}
                        protocol={selectedProtocol}
                        lastSetter={IPFSState? IPFSState.setter:PublicKey.default}
                        ifInitIpfs={IPFSState===null? true:false}
                    />
                }
            </div>
        </div>  
    );
};

  export default DomainEditor;