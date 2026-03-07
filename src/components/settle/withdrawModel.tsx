import React, { useState } from 'react';
import { 
    ArrowUpRight, 
    Info, 
    AlertCircle, 
    ChevronRight,
    Percent,
    X
} from 'lucide-react';
import { extractUserProfit } from '../usrPage/usrComponets/index/function/extractUserProfit';
import { useWalletEnv } from '@/provider/walletEnviroment/useWalletEnv';
import { useConnection } from '@solana/wallet-adapter-react';
import { useGlobalModal } from '../common/show/info';
import { getTransactionContent } from '../common/show/infoContent/getInfoContent';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const {signTransaction, publicKey: usr} = useWalletEnv()
    const {connection} = useConnection()
    const info = useGlobalModal()

    const leastGet = 10_000_000
    
    const FEE_PERCENT = 0.01;
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const amountNum = parseFloat(withdrawAmount) || 0;
    const amountInLamports = amountNum * 1e9;
    const isBelowThreshold = amountNum > 0 && amountInLamports < leastGet && amountInLamports < availableBalance;
    const serviceFee = amountNum * FEE_PERCENT;
    const receiveAmount = Math.max(0, amountNum - serviceFee);

    // Smart formatting function for SOL amounts
    const formatSolAmount = (sol: number): string => {
        if (sol === 0) return "0.0000";
        if (sol < 0.000001) return sol.toExponential(6);
        if (sol < 0.001) return sol.toFixed(8);
        if (sol < 1) return sol.toFixed(6);
        if (sol < 1000) return sol.toFixed(4);
        if (sol < 10000) return sol.toFixed(3);
        return sol.toFixed(2);
    };

    // Format lamports to SOL with smart precision
    const formatLamportsToSol = (lamports: number): string => {
        const sol = lamports / 1e9;
        return formatSolAmount(sol);
    };

    // Format SOL amount with maximum 4 decimal places for input
    const formatSolForInput = (sol: number): string => {
        // Round to 4 decimal places, but keep as string to avoid floating point issues
        const rounded = Math.round(sol * 10000) / 10000;
        // Format with exactly 4 decimal places if needed
        if (rounded === 0) return "0.0000";
        const parts = rounded.toString().split('.');
        if (parts.length === 1) {
            return parts[0] + ".0000";
        }
        if (parts[1].length < 4) {
            return parts[0] + "." + parts[1].padEnd(4, '0');
        }
        return rounded.toString();
    };

    // Check if withdrawal would leave sufficient balance
    const wouldLeaveSufficientBalance = (availableBalance - amountInLamports) >= 0 && amountInLamports > 0;

    const handleWithdraw = async () => {
        if (!wouldLeaveSufficientBalance) return;
        setIsLoading(true);
        try {
            const state = await extractUserProfit(
                signTransaction, usr, connection, amountInLamports
            )
            const infos = getTransactionContent(state, t, onClose)
            if(infos){
                info.showModal({
                    title: infos.title,
                    type: infos.type,
                    content: infos.node,
                    onConfirm: infos.infoOk,
                    onCancel: infos.infoOk,
                })
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = !wouldLeaveSufficientBalance || isLoading

    // Handle input change with precision limit
    const handleInputChange = (value: string) => {
        // Remove any non-digit or non-decimal characters except dot
        const cleaned = value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            // If more than one decimal point, keep only the first part and first decimal part
            setWithdrawAmount(parts[0] + '.' + parts[1]);
            return;
        }
        
        // If there's a decimal part, limit to 4 digits
        if (parts.length === 2 && parts[1].length > 4) {
            setWithdrawAmount(parts[0] + '.' + parts[1].substring(0, 4));
            return;
        }
        
        setWithdrawAmount(cleaned);
    };

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

                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                        <h2 className="text-l sm:text-[16px] font-black italic tracking-tighter uppercase flex items-center gap-2">
                            <ArrowUpRight className="text-[#B4FC75] size-5 sm:size-6" /> {t("withdrawalBill")}
                        </h2>
                        <p className="text-[9px] sm:text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1 sm:mt-2">Withdrawal Settlement</p>
                    </div>
                </div>

                <div className="mb-3 sm:mb-5">
                    <div className="flex justify-between items-end mb-3 sm:mb-3 px-1">
                        <span className="text-[10px] sm:text-[12px] font-black text-gray-500 uppercase tracking-wider">{t("withdrawalAmount")}</span>
                        <span className="text-[9px] sm:text-[10px] font-normal text-gray-600 font-mono font-normal">{t("availableBalance")}: {formatLamportsToSol(availableBalance)} SOL</span>
                    </div>
                    <div className={`relative transition-all duration-300 ${isBelowThreshold ? 'scale-[1.01]' : ''}`}>
    
                        <input 
                            type="text"
                            inputMode="decimal"
                            value={withdrawAmount}
                            onChange={(e) => handleInputChange(e.target.value)}
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
                                onClick={() => setWithdrawAmount(formatSolForInput(availableBalance / 1e9))}
                                className="px-3 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase rounded-lg bg-white/5 border border-white/10 text-white hover:bg-[#B4FC75] hover:text-black hover:border-[#B4FC75] active:scale-95 transition-all duration-200"
                            >
                                ALL
                            </button>
                        </div>
                    </div>
                    
                    {isBelowThreshold && (
                        <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-3 text-red-500 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={12} />
                            <span className="text-[10px] sm:text-sm font-normal uppercase tracking-tight">{t("withdrawalAmountMustBeGreaterThan", { amount: formatLamportsToSol(leastGet) })}</span>
                        </div>
                    )}
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-5 mb-6">
                    <div className="flex justify-between text-xs sm:text-base">
                        <span className="text-[12px] text-gray-500 flex items-center gap-1.5 sm:gap-2 font-normal">
                            <Percent size={14}/>{t("serviceFee")}
                        </span>
                        <span className="font-mono text-gray-300 text-[13px] sm:text-[15px]">-{formatSolAmount(serviceFee)} SOL</span>
                    </div>
                    <div className="h-px bg-white/5 w-full my-1"></div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="text-[8px] sm:text-[9px] font-black uppercase text-white tracking-widest">{t("actualReceivableAmount")}</span>
                        <span className="text-[13px] sm:text-[14px] font-black text-[#B4FC75] tabular-nums">
                            {formatSolAmount(receiveAmount)} <span className="text-[9px] sm:text-xs italic">SOL</span>
                        </span>
                    </div>
                </div>

                <div className="mb-6 px-1">
                    <div className="flex row items-center gap-2 sm:gap-4 p-3 bg-[#B4FC75]/5 border border-[#B4FC75]/10 rounded-xl">
                        <Info size={16} className="text-[#B4FC75] flex-shrink-0" />
                        <div className="text-[10px] md:text-[11px] text-gray-400 leading-relaxed font-medium">
                            {t("withdrawalNote", { amount: formatLamportsToSol(minThreshold) })}
                        </div>
                    </div>
                </div>

                <button 
                    disabled={isDisabled}
                    onClick={handleWithdraw}
                    className={`w-full py-4 rounded-2xl font-black text-[12px]
                    tracking-[0.2em] uppercase flex items-center justify-center gap-2 sm:gap-4 
                    transition-all ${
                        isDisabled
                            ? 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed pointer-events-none'
                            : 'bg-[#B4FC75] text-black hover:shadow-[0_0_40px_rgba(180,252,117,0.4)] hover:scale-[1.02] active:scale-95'
                    }`}
                >
                    {isLoading ? (
                        <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"/>
                    ) : (
                        <>{t("confirmWithdrawal")} <ChevronRight size={16} /></>
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