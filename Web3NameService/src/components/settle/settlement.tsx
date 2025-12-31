import { ArrowRight, CreditCard, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";
import RefferrerVerify from "../common/transaction/refferrerVerify";
import type { PublicKey } from "@solana/web3.js";
import DomainHero from "./components/domainHero";
import SettleHead from "./components/settleHead";
import FeeItems from "./components/feeItems";
import { useCalculateAllFees } from "./components/function/useCalculateAllFee";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";

export enum SettleType {
    buy,
    set,
    settle,
}

interface DomainSettlementProps {
    opearationName: string;
    actionType: SettleType;
    basePrice: number;
    onClose: () => void; // 退出回调
    onConfirm?: () => void; // 确认回调
}

const PRIMARY_COLOR = '#B4FC75';

export default function DomainSettlementModal({
    opearationName,
    actionType,
    basePrice = 125.0,
    onClose,
    onConfirm = () => console.log("Confirm clicked"),
}: DomainSettlementProps) {

    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {activeRootDomain, rootDomains} = useRootDomain()

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            onConfirm();
        }, 2000);
    };

    const [refferrerKey, setRefferrerKey] = useState<PublicKey | null>(null)
    const [ifRefferrerValid, setIfRefferrerValid] = useState(false)

    const {fees, totalFee, calculating} = useCalculateAllFees(actionType, basePrice, opearationName, usr, activeRootDomain)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#B4FC75] via-purple-500 to-[#B4FC75]" />

                <SettleHead
                    type={actionType}
                    onClose={onClose}
                />

                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <DomainHero
                        title={opearationName}
                        type={actionType}
                    />

                    {actionType === SettleType.buy &&
                        <RefferrerVerify 
                            setRefferrerKey={setRefferrerKey}
                            setReffererValid={setIfRefferrerValid}
                            ifRefferValid={ifRefferrerValid}
                        />
                    }
                    <div className="space-y-4 mb-8 mt-8">
                        <h3 className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wide">
                            <CreditCard size={14} /> 账单明细
                        </h3>
                        
                        <FeeItems
                            feeItems={fees}
                            total={totalFee}
                        />
                    </div>

                    <div className="flex items-center justify-between px-4 py-3 bg-[#B4FC75]/5 border border-[#B4FC75]/20 rounded-xl text-sm">
                        <div className="flex items-center gap-2 text-[#B4FC75]">
                            <Wallet size={16} />
                            <span className="font-mono">{}</span>
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