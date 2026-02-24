import { useState } from 'react';
import { useWalletEnv } from '@/provider/walletEnviroment/useWalletEnv';
import { 
    Cog, 
    X, 
    Cpu, 
    Activity, 
    Plus, 
    Globe, 
    Check, 
} from 'lucide-react';

export default function RpcSettings() {
    const { customRpc, setCustomRpc, availableRpcs, endpoint } = useWalletEnv();
    const [isOpen, setIsOpen] = useState(false);
    const [newRpc, setNewRpc] = useState(customRpc || '');
    const [showCustomInput, setShowCustomInput] = useState(false);

    const handleSaveCustomRpc = () => {
        if (newRpc.trim() !== '') {
            setCustomRpc(newRpc.trim());
            setShowCustomInput(false);
        }
    };

    const handleSelectRpc = (rpcUrl: string) => {
        if (rpcUrl === '') {
            setShowCustomInput(true);
            setNewRpc('');
        } else {
            setCustomRpc(rpcUrl);
            setShowCustomInput(false);
        }
    };

    return (
        <div className="relative mr-2 sm:mr-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    relative flex items-center gap-2 px-3 py-2 rounded-lg
                    bg-white/5 transition-colors border-[2px]
                    ${endpoint
                        ? 'border-[#B4FC75]/50 shadow-[0_0_0_0_rgba(34,197,94,0.7)] animate-pulse-green'
                        : 'border-red-500/20 shadow-[0_0_0_0_rgba(239,68,68,0.7)] animate-pulse-red'
                    }
                `}
                title="RPC设置"
            >
                <Cog className="w-4 h-4 text-white" />
                <span className="text-sm font-medium hidden sm:flex">RPC</span>
            </button>

            {isOpen && (
                <div className="absolute right-[-100px] md:right-auto mt-4 w-[80vw] sm:w-[calc(100vw-2rem)] w-60 sm:w-96 max-w-[400px] bg-[#0a0a0a] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                    
                    <div className="px-6 pt-6 pb-3 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-[#B4FC75]/10 rounded-lg">
                                <Cpu size={18} className="text-[#B4FC75]" />
                            </div>
                            <div>
                                <h3 className="text-[9px] sm:text-sm font-black uppercase tracking-widest italic">Node Settings</h3>
                                <p className="text-[7px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-tighter">网络节点配置</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <div className="mb-3 p-3 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
                                    <Activity size={10} /> Status
                                </span>
                                <span className="text-[10px] px-2 py-0.5 bg-[#B4FC75]/20 text-[#B4FC75] rounded-full font-bold">已连接</span>
                            </div>
                            <div className="font-mono text-xs text-[#B4FC75] truncate">
                                {endpoint}
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div className="px-1 flex justify-between items-center">
                                <span className="text-[7px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Endpoint</span>
                                <button 
                                    onClick={() => setShowCustomInput(true)}
                                    className="text-[7px] sm:text-[10px font-black text-[#B4FC75] uppercase hover:underline flex items-center gap-1"
                                >
                                    <Plus size={10} /> Add Custom
                                </button>
                            </div>
                            
                            {availableRpcs.map((rpc, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectRpc(rpc.url)}
                                    className={`group w-full text-left p-2 sm:p-3 rounded-2xl transition-all duration-300 border ${
                                        endpoint === rpc.url
                                            ? 'bg-[#B4FC75]/10 border-[#B4FC75]/30'
                                            : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl transition-colors ${endpoint === rpc.url ? 'bg-[#B4FC75] text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                                <Globe size={16} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] sm:text-sm font-bold ${endpoint === rpc.url ? 'text-white' : 'text-gray-400'}`}>{rpc.name}</span>
                                                    <span className="text-[9px] px-1.5 py-0.5 bg-white/5 text-gray-500 rounded font-black uppercase">
                                                        {rpc.network === 'mainnet-beta' ? 'Mainnet' : 'Devnet'}
                                                    </span>
                                                </div>
                                                <div className="text-[8px] sm:text-[10px] text-gray-400 font-mono font-normal truncate max-w-[180px] mt-0.5">
                                                    {rpc.url}
                                                </div>
                                            </div>
                                        </div>
                                        {endpoint === rpc.url && (
                                            <div className="w-6 h-6 bg-[#B4FC75] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(180,252,117,0.4)]">
                                                <Check size={14} className="text-black stroke-[3]" />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {showCustomInput && (
                            <div className="mt-4 p-2 sm:p-4 bg-black border border-[#B4FC75]/30 rounded-xl sm:rounded-2xl animate-in slide-in-from-top-2">
                                <div className="text-[8px] sm:text-[10px] font-bold text-[#B4FC75] uppercase mb-2 tracking-widest">Custom RPC URL</div>
                                <input
                                    type="text"
                                    value={newRpc}
                                    onChange={(e) => setNewRpc(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] sm:text-xs font-mono text-white focus:outline-none focus:border-[#B4FC75]/50 mb-3"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSaveCustomRpc}
                                        className="flex-1 py-1.5 sm:py-2.5 bg-[#B4FC75] text-black rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                                    >
                                        Save Node
                                    </button>
                                    <button
                                        onClick={() => setShowCustomInput(false)}
                                        className="px-4 py-1.5 sm:py-2.5 bg-white/5 text-gray-400 rounded-xl text-[10px] sm:text-xs font-black uppercase hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-3 sm:p-4 bg-white/[0.02] border-t border-white/5 flex gap-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
                        >
                            Close
                        </button>
                    </div>

                    <div className="px-3 sm:px-6 py-4 bg-[#B4FC75] text-black text-[6px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-center">
                        Changes will be synced to local storage
                    </div>
                </div>
            )}
        </div>
    );
}