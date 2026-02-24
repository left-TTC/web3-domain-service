import React, { useState } from 'react';
import { 
    ArrowUpRight, 
    Info, 
    AlertCircle, 
    ChevronRight,
    Percent,
    X
} from 'lucide-react';

interface WithdrawModalProps {
    availableBalance: number;
    onClose: () => void;
    minThreshold?: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
    availableBalance,
    onClose,
    minThreshold = 100_000_000,
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
            setWithdrawAmount('');
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = amountNum < minThreshold || isLoading

    return (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="w-full max-w-md bg-[#111] border border-white/5 rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-8 shadow-2xl relative overflow-hidden mt-10">
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-10 group"
                    aria-label="close"
                >
                    <X size={16} className="sm:size-6 group-hover:scale-110 transition-transform" />
                </button>
                
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-[#B4FC75]/10 blur-[40px] sm:blur-[80px] rounded-full -mr-12 -mt-12 sm:-mr-20 sm:-mt-20"></div>

                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div>
                        <h2 className="text-l sm:text-[16px] font-black italic tracking-tighter uppercase flex items-center gap-2">
                            <ArrowUpRight className="text-[#B4FC75] size-5 sm:size-6" /> 提现账单
                        </h2>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1 sm:mt-2">Withdrawal Settlement</p>
                    </div>
                </div>

                <div className="mb-3 sm:mb-5">
                    <div className="flex justify-between items-end mb-3 sm:mb-3 px-1">
                        <span className="text-[11px] sm:text-sm font-black text-gray-500 uppercase tracking-wider">提现金额</span>
                        <span className="text-[9px] sm:text-xs text-gray-600 font-mono font-normal">可用余额: {availableBalance.toFixed(3)} SOL</span>
                    </div>
                    <div className={`relative transition-all duration-300 ${isBelowThreshold ? 'scale-[1.01]' : ''}`}>
    
                        <input 
                            type="text"
                            inputMode="decimal"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="0.00"
                            className={`w-full bg-black/50 border ${
                                isBelowThreshold ? 'border-red-500/50' : 'border-white/10'
                            } focus:border-[#B4FC75]/50 rounded-2xl py-3 sm:py-4 pl-5 pr-20 
                            text-[14px] sm:text-[18px] font-black focus:outline-none transition-all 
                            placeholder:text-white/10 tabular-nums`}
                        />

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                            <span className="text-[#B4FC75] font-black italic text-sm sm:text-base">
                                SOL
                            </span>
                            <button
                                type="button"
                                onClick={() => setWithdrawAmount(availableBalance.toString())}
                                className="px-3 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase rounded-lg bg-white/5 border border-white/10 text-white hover:bg-[#B4FC75] hover:text-black hover:border-[#B4FC75] active:scale-95 transition-all duration-200"
                            >
                                ALL
                            </button>
                        </div>
                    </div>
                    
                    {/* Threshold Warning */}
                    {isBelowThreshold && (
                        <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-3 text-red-500 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={12} />
                            <span className="text-[10px] sm:text-sm font-normal uppercase tracking-tight">提现金额必须大于 {minThreshold/1e9} SOL</span>
                        </div>
                    )}
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-6 mb-6">
                    <div className="flex justify-between text-xs sm:text-base">
                        <span className="text-gray-500 flex items-center gap-1.5 sm:gap-2 font-normal">
                            <Percent size={14}/>手续费 (1%)
                        </span>
                        <span className="font-mono text-gray-300 text-xs sm:text-base">-{serviceFee.toFixed(6)} SOL</span>
                    </div>
                    <div className="h-px bg-white/5 w-full my-1"></div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="text-xs sm:text-[13px] font-black uppercase text-white tracking-widest">实际到账金额</span>
                        <span className="text-[13px] sm:text-[14px] font-black text-[#B4FC75] tabular-nums">
                            {receiveAmount.toFixed(6)} <span className="text-[9px] sm:text-xs italic">SOL</span>
                        </span>
                    </div>
                </div>

                <div className="mb-8 px-1">
                    <div className="flex row items-center gap-2 sm:gap-4 p-3 bg-[#B4FC75]/5 border border-[#B4FC75]/10 rounded-xl">
                        <Info size={16} className="text-[#B4FC75] flex-shrink-0" />
                        <div className="text-[10px] md:text-[12px] text-gray-400 leading-relaxed font-medium">
                            说明：提现将通过 <span className="text-white">Solana Mainnet</span> 进行。2% 的手续费用于维护匿名节点池与金库安全。最小提现额度为 <span className="text-[#B4FC75]">{minThreshold} SOL</span>。
                        </div>
                    </div>
                </div>

                <button 
                    disabled={isDisabled}
                    onClick={handleWithdraw}
                    className={`w-full py-4 rounded-2xl font-black text-xs
                    tracking-[0.2em] uppercase flex items-center justify-center gap-2 sm:gap-4 
                    transition-all ${
                        isDisabled
                            ? 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed pointer-events-none'
                            : 'bg-[#B4FC75] text-black hover:shadow-[0_0_40px_rgba(180,252,117,0.4)] hover:scale-[1.02] active:scale-95'
                    }`}
                >
                    {isLoading ? (
                        <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    ) : (
                        <>确认提现 <ChevronRight size={16} /></>
                    )}
                </button>

                <p className="mt-6 sm:mt-8 text-center text-[8px] sm:text-[10px] text-gray-700 font-bold tracking-[0.3em] uppercase">
                    SECURED BY ARWEAVE & SOLANA NODE POOL
                </p>
            </div>
        </div>
    );
}

export default WithdrawModal;