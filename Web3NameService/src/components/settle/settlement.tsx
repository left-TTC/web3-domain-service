import { ArrowRight, CreditCard, Globe, Info, Loader2, ShieldCheck, Wallet, X } from "lucide-react";
import { useState } from "react";

export type TransactionType = 'register' | 'bid' | 'buy_now' | 'renew';

export interface FeeItem {
  label: string;
  amount: number;
  info?: string;
}

interface DomainSettlementProps {
    domainName?: string;
    actionType?: TransactionType;
    basePrice?: number;
    onClose?: () => void; // 退出回调
    onConfirm?: () => void; // 确认回调
}

// --- 辅助变量 ---
const PRIMARY_COLOR = '#B4FC75';

// --- 模拟费率计算 ---
const calculateFees = (type: TransactionType, price: number): FeeItem[] => {
    const networkFee = 0.00005;
    const serviceFee = type === 'buy_now' ? price * 0.02 : 0; // 2% fee for marketplace buys
    const storageFee = type === 'register' ? 0.05 : 0; // Rent exemption

    return [
        { label: '项目金额', amount: price },
        { label: '网络燃料费 (Est.)', amount: networkFee, info: 'Solana 网络交互费用' },
        ...(serviceFee > 0 ? [{ label: '平台服务费 (2%)', amount: serviceFee }] : []),
        ...(storageFee > 0 ? [{ label: '链上存储费', amount: storageFee, info: '账户租金豁免' }] : []),
    ];
};


export default function DomainSettlementModal({
    domainName = "solana-king.sol",
    actionType = "buy_now",
    basePrice = 125.0,
    onClose = () => console.log("Close clicked"),
    onConfirm = () => console.log("Confirm clicked"),
}: DomainSettlementProps) {

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 获取费用明细
    const fees = calculateFees(actionType, basePrice);
    const total = fees.reduce((acc, item) => acc + item.amount, 0);

    // 获取标题和描述
    const getHeaderInfo = () => {
        switch (actionType) {
        case 'register': return { title: '注册新域名', desc: 'Minting New Root Domain' };
        case 'bid': return { title: '确认竞价', desc: 'Placing Bid on Auction' };
        case 'buy_now': return { title: '立即购买', desc: 'Secondary Market Purchase' };
        case 'renew': return { title: '域名续费', desc: 'Extending Registration' };
        default: return { title: '交易结算', desc: 'Transaction Settlement' };
        }
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            onConfirm();
        }, 2000);
    };

    const header = getHeaderInfo();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#B4FC75] via-purple-500 to-[#B4FC75]" />

                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            {header.title}
                        </h2>
                        <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wider">{header.desc}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-[#B4FC75]/20 flex items-center justify-center text-[#B4FC75]">
                            <Globe size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Target Domain</p>
                            <p className="text-xl font-mono font-bold text-white tracking-tight">{domainName}</p>
                        </div>
                    </div>
                    <div className="space-y-4 mb-8">
                        <h3 className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wide">
                            <CreditCard size={14} /> 账单明细
                        </h3>
                        
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-3">
                            {fees.map((fee, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-1.5 text-gray-400 group relative">
                                        {fee.label}
                                        {fee.info && (
                                        <>
                                            <Info size={12} className="cursor-help hover:text-[#B4FC75]" />
                                            {/* Tooltip */}
                                            <div className="absolute left-0 bottom-full mb-2 w-max max-w-[200px] px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            {fee.info}
                                            </div>
                                        </>
                                        )}
                                    </div>
                                    <span className="font-mono text-white">{fee.amount.toFixed(5)} SOL</span>
                                </div>
                            ))}
                            
                            <div className="h-px bg-white/10 my-2"></div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold">总计 (Total)</span>
                                <span className="text-2xl font-mono font-bold text-[#B4FC75]">{total.toFixed(4)} SOL</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-3 bg-[#B4FC75]/5 border border-[#B4FC75]/20 rounded-xl text-sm">
                        <div className="flex items-center gap-2 text-[#B4FC75]">
                            <Wallet size={16} />
                            <span className="font-mono">8x92...kL2p</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                            <ShieldCheck size={14} />
                            安全连接
                        </div>
                    </div>

                </div>

                <div className="p-6 border-t border-white/5 bg-[#0a0a0a]">
                <div className="grid grid-cols-3 gap-4">
                    <button 
                        onClick={onClose}
                        className="col-span-1 py-3.5 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-white/10"
                        disabled={isProcessing}
                    >
                        取消
                    </button>
                    <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="col-span-2 py-3.5 rounded-xl font-bold text-black bg-[#B4FC75] hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                        <>
                            <Loader2 size={20} className="animate-spin" /> 正在处理...
                        </>
                        ) : (
                        <>
                            确认支付 <ArrowRight size={20} />
                        </>
                        )}
                    </button>
                </div>
                </div>

            </div>
        </div>
    );
}