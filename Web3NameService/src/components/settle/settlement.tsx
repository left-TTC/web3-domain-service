import { ArrowRight, CreditCard, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";
import RefferrerVerify from "./components/refferrerVerify";
import type { PublicKey } from "@solana/web3.js";
import DomainHero from "./components/domainHero";
import SettleHead from "./components/settleHead";
import FeeItems from "./components/feeItems";
import { useCalculateAllFees } from "./components/function/useCalculateAllFee";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import type { TransactionState } from "@/provider/fixedToastProvider/fixedToastProvider";
import WalletView from "./components/walletView";
import AuctionBidMultiplier from "./components/auctionBidMultiplier";
import CustomPriceInput from "./components/customPriceInput";

export enum SettleType {
    buy,
    root,
    settle,
    increase,
}

export interface DomainSettlementConfirmPayload {
    totalFee?: number,
    customValue?: number,
    newPrice?: number,
    refferrerKey?: PublicKey
}

interface DomainSettlementProps {
    opearationName: string;
    actionType: SettleType;
    basePrice: number;
    onClose: () => void; 
    onConfirm: (payload: DomainSettlementConfirmPayload) => TransactionState | Promise<TransactionState>;
}

const PRIMARY_COLOR = '#B4FC75';

export default function DomainSettlementModal({
    opearationName, actionType, basePrice, onClose,
    onConfirm
}: DomainSettlementProps) {

    const {publicKey: usr} = useWalletEnv()
    const {activeRootDomain} = useRootDomain()

    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [ableToConfirm, setAbleToConfirm] = useState(false)
    const [refferrerKey, setRefferrerKey] = useState<PublicKey | null>(null);

    const [ifRefferrerValid, setIfRefferrerValid] = useState(false)
    const [currentPrice, setCurrentPrice] = useState(basePrice);

    const {fees, totalFee, calculating} = useCalculateAllFees(actionType, basePrice, opearationName, usr, activeRootDomain)

    const handlePayment = async() => {
        setIsProcessing(true);
        await onConfirm({
            totalFee: totalFee, refferrerKey: refferrerKey? refferrerKey:undefined,
            customValue: currentPrice, newPrice: currentPrice
        });
        setIsProcessing(false)
    };

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
                    {(actionType===SettleType.buy || actionType===SettleType.increase) &&
                        <RefferrerVerify 
                            setRefferrerKey={setRefferrerKey!}
                            setReffererValid={setIfRefferrerValid}
                            ifRefferValid={ifRefferrerValid}
                        />
                    }
                    {actionType===SettleType.increase &&
                        <AuctionBidMultiplier
                            currentPrice={currentPrice}
                            onUpdate={setCurrentPrice}
                        />
                    }
                    {actionType===SettleType.settle &&
                        <CustomPriceInput
                            value={currentPrice}
                            onChange={setCurrentPrice}
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
                    <WalletView />
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