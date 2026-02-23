import React, { useState } from 'react';
import { 
    ArrowUpRight, 
    Info, 
    AlertCircle, 
    Wallet, 
    ChevronRight,
    ShieldCheck,
    Percent
} from 'lucide-react';

interface WithdrawModalProps {
    availableBalance: number;
    onWithdraw: (amount: number) => Promise<void>;
    onClose: () => void;
    minThreshold?: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
    availableBalance,
    onWithdraw,
    onClose,
    minThreshold = 0.1,
}) => {
    const FEE_PERCENT = 0.02;
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const amountNum = parseFloat(withdrawAmount) || 0;
    const isBelowThreshold = amountNum > 0 && amountNum < minThreshold;
    const serviceFee = amountNum * FEE_PERCENT;
    const receiveAmount = Math.max(0, amountNum - serviceFee);

    const handleWithdraw = async () => {
        if (amountNum < minThreshold) return;
        setIsLoading(true);
        try {
            await onWithdraw(amountNum);
            setWithdrawAmount('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-md bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4FC75]/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
                            <ArrowUpRight className="text-[#B4FC75]" /> 提现账单
                        </h2>
                        <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">Withdrawal Settlement</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                        <Wallet size={20} className="text-gray-400" />
                    </div>
                </div>

                {/* Input Area */}
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-3 px-1">
                        <span className="text-xs font-black text-gray-500 uppercase tracking-wider">提现金额</span>
                        <span className="text-[10px] text-gray-600 font-mono">可用余额: {availableBalance.toFixed(3)} SOL</span>
                    </div>
                    <div className={`relative transition-all duration-300 ${isBelowThreshold ? 'scale-[1.02]' : ''}`}>
                        <input 
                            type="number" 
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="0.00"
                            className={`w-full bg-black/50 border ${isBelowThreshold ? 'border-red-500/50' : 'border-white/10'} focus:border-[#B4FC75]/50 rounded-2xl py-5 px-6 text-3xl font-black focus:outline-none transition-all placeholder:text-white/10 tabular-nums`}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end">
                            <span className="text-[#B4FC75] font-black italic">SOL</span>
                        </div>
                    </div>
                    
                    {/* Threshold Warning */}
                    {isBelowThreshold && (
                        <div className="mt-3 flex items-center gap-2 text-red-500 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={14} />
                            <span className="text-[11px] font-bold uppercase tracking-tight">提现金额必须大于 {minThreshold} SOL</span>
                        </div>
                    )}
                </div>

                {/* Bill Details */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1.5">
                            <Percent size={14} /> 平台手续费 (2%)
                        </span>
                        <span className="font-mono text-gray-300">-{serviceFee.toFixed(6)}</span>
                    </div>
                    <div className="h-px bg-white/5 w-full my-2"></div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="text-sm font-black uppercase text-white tracking-widest">实际到账金额</span>
                        <span className="text-xl font-black text-[#B4FC75] tabular-nums">
                            {receiveAmount.toFixed(6)} <span className="text-[10px] italic">SOL</span>
                        </span>
                    </div>
                </div>

                {/* Fee Explanation */}
                <div className="mb-8 px-2">
                    <div className="flex items-start gap-3 p-4 bg-[#B4FC75]/5 border border-[#B4FC75]/10 rounded-2xl">
                        <Info size={16} className="text-[#B4FC75] mt-0.5" />
                        <div className="text-[11px] text-gray-400 leading-relaxed font-medium">
                            说明：提现将通过 <span className="text-white">Solana Mainnet</span> 进行。2% 的手续费用于维护匿名节点池与金库安全。最小提现额度为 <span className="text-[#B4FC75]">{minThreshold} SOL</span>。
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    disabled={amountNum < minThreshold || isLoading}
                    onClick={handleWithdraw}
                    className={`w-full py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all active:scale-95 ${
                        amountNum >= minThreshold 
                            ? 'bg-[#B4FC75] text-black hover:shadow-[0_0_30px_rgba(180,252,117,0.3)]' 
                            : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                    }`}
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    ) : (
                        <>确认提现 <ChevronRight size={18} /></>
                    )}
                </button>

                {/* Security Notice */}
                <p className="mt-6 text-center text-[9px] text-gray-700 font-bold tracking-[0.3em] uppercase">
                    SECURED BY ARWEAVE & SOLANA NODE POOL
                </p>
            </div>
        </div>
    );
}

export default WithdrawModal;