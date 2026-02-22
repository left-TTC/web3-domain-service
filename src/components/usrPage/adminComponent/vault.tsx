import { useState } from "react";
import { Lock, ArrowDownLeft, ArrowUpRight, RefreshCw, History, AlertCircle } from "lucide-react";

interface Transaction {
    id: string;
    type: 'deposit' | 'withdraw';
    amount: number;
    time: string;
}

interface VaultProps {
    isProjectActive: boolean;
}

const Vault = ({ isProjectActive }: VaultProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: "1", type: "deposit", amount: 50.5, time: "2024-01-15 14:32" },
        { id: "2", type: "withdraw", amount: 25.0, time: "2024-01-15 13:15" },
        { id: "3", type: "deposit", amount: 100.0, time: "2024-01-15 12:45" },
    ]);

    const handleVaultAction = async (action: 'deposit' | 'withdraw') => {
        if (!inputValue || parseFloat(inputValue) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setIsProcessing(true);
        try {
            // Simulate blockchain transaction
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const newTransaction: Transaction = {
                id: Date.now().toString(),
                type: action,
                amount: parseFloat(inputValue),
                time: new Date().toLocaleString(),
            };
            
            setTransactions([newTransaction, ...transactions]);
            setInputValue("");
        } catch (error) {
            console.error("Transaction failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            {isProjectActive ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* 金库操作面板 */}
                    <div className="bg-[#111] border border-white/5 rounded-3xl p-8">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Lock size={18} className="text-[#B4FC75]" /> 金库资金控制 (Admin Only)
                        </h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-black text-gray-500 uppercase mb-2 block">输入操作金额</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-2xl font-bold focus:outline-none focus:border-[#B4FC75] transition-colors tabular-nums"
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-gray-500">SOL</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    disabled={isProcessing}
                                    onClick={() => handleVaultAction('deposit')}
                                    className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all group disabled:opacity-50"
                                >
                                    <ArrowDownLeft className="text-[#B4FC75] group-hover:text-black" />
                                    <span className="font-bold">DEPOSIT</span>
                                </button>
                                <button 
                                    disabled={isProcessing}
                                    onClick={() => handleVaultAction('withdraw')}
                                    className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-red-500 hover:text-white transition-all group disabled:opacity-50"
                                >
                                    <ArrowUpRight className="text-red-500 group-hover:text-white" />
                                    <span className="font-bold">WITHDRAW</span>
                                </button>
                            </div>

                            {isProcessing && (
                                <div className="flex items-center justify-center gap-3 text-sm text-gray-500 animate-pulse">
                                    <RefreshCw size={16} className="animate-spin" />
                                    正在链上同步资金状态...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 交易历史记录 */}
                    <div className="bg-[#111] border border-white/5 rounded-3xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <History size={18} className="text-gray-500" /> 操作历史
                            </h3>
                            <button className="text-[10px] font-black tracking-widest text-gray-600 hover:text-white transition-colors">VIEW ALL</button>
                        </div>

                        <div className="space-y-4">
                            {transactions.map(tx => (
                                <div key={tx.id} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${tx.type === 'deposit' ? 'bg-[#B4FC75]/10 text-[#B4FC75]' : 'bg-red-500/10 text-red-500'}`}>
                                            {tx.type === 'deposit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm uppercase tracking-tight">{tx.type === 'deposit' ? 'Vault Inbound' : 'Vault Outbound'}</p>
                                            <p className="text-[10px] text-gray-600">{tx.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${tx.type === 'deposit' ? 'text-[#B4FC75]' : 'text-red-500'}`}>
                                            {tx.type === 'deposit' ? '+' : '-'}{tx.amount.toFixed(2)} SOL
                                        </p>
                                        <p className="text-[9px] text-gray-700 font-mono">TX: {Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ) : (
                /* 未启动时的占位提示 */
                <div className="bg-[#111] border border-dashed border-white/10 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle size={40} className="text-gray-700" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Vault Monitoring Offline</h3>
                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                        项目协议尚未启动。请点击上方按钮初始化系统，以开启实时监控与金库资金管理功能。
                    </p>
                </div>
            )}
        </>
    );
}

export default Vault;