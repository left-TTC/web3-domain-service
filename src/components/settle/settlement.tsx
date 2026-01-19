import { ArrowRight, Cpu, CreditCard, Loader2} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RefferrerVerify from "./components/refferrerVerify";
import type { PublicKey } from "@solana/web3.js";
import DomainHero from "./components/domainHero";
import SettleHead from "./components/settleHead";
import FeeItems from "./components/feeItems";
import { useCalculateAllFees } from "./components/function/useCalculateAllFee";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { TransactionState } from "@/utils/functional/instructions/transactionState";
import AuctionBidMultiplier from "./components/auctionBidMultiplier";
import CustomPriceInput from "./components/customPriceInput";
import { useGlobalModal } from "../common/show/info";
import { getTransactionContent } from "../common/show/infoContent/getInfoContent";
import { useConnection } from "@solana/wallet-adapter-react";
import { useConfirm } from "./components/function/useConfirm";

export enum SettleType {
    buy,
    createRoot,
    addRoot,
    settle,
    increase,
}

export interface DomainSettlementConfirmPayload {
    totalFee?: number,
    customValue?: number,
    newPrice?: number,
    stakeSol?: number,
    usrBalance?: number,
    refferrerKey?: PublicKey
}

interface DomainSettlementProps {
    opearationName: string;
    actionType: SettleType;
    basePrice: number;
    onClose: () => void; 
    onConfirm: (payload: DomainSettlementConfirmPayload) => TransactionState | Promise<TransactionState>;
    onInfoOk?: () => void;
}

export default function DomainSettlementModal({
    opearationName, actionType, basePrice, onClose,
    onConfirm, onInfoOk
}: DomainSettlementProps) {

    const {publicKey: usr, wallet} = useWalletEnv()
    const {activeRootDomain} = useRootDomain()
    const {connection} = useConnection()

    const info = useGlobalModal()

    const [isProcessing, setIsProcessing] = useState(false);
    
    const [refferrerKey, setRefferrerKey] = useState<PublicKey | null>(null);
    const [ifRefferrerValid, setIfRefferrerValid] = useState(false);

    // create root - extra add
    // increase - new price
    // add root - stake
    // buy - start price
    const [currentPrice, setCurrentPrice] = useState(basePrice);
    const increaseOrigin = useRef(basePrice)

    const [usrBalance, setUsrBalance] = useState<number | null>(null)
    const gotBalance = useRef(false)
    useEffect(() => {
        (async() => {
            if(gotBalance.current) return
            if(!usr)return
            gotBalance.current = true
            setUsrBalance(await connection.getBalance(usr))
        })()
    }, [usr])

    const {fees, totalFee, calculating} = useCalculateAllFees(
        actionType, basePrice, opearationName, usr, activeRootDomain, refferrerKey, ifRefferrerValid, increaseOrigin.current
    )

    const {ableToConfirm} = useConfirm(0, calculating, actionType, ifRefferrerValid, basePrice===currentPrice)

    const stakeSol = 200_000_000

    useEffect(() => {

    }, [])

    const handlePayment = async() => {
        setIsProcessing(true);
        const state = await onConfirm({
            totalFee: totalFee, refferrerKey: refferrerKey? refferrerKey:undefined,
            customValue: currentPrice, newPrice: currentPrice, stakeSol
        });
        setIsProcessing(false)

        const infos = getTransactionContent(state, onInfoOk)
        if(infos){
            info.showModal({
                title: infos.title,
                type: infos.type,
                content: infos.node,
                onConfirm: infos.infoOk,
                onCancel: infos.infoOk,
            })
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#B4FC75] via-purple-500 to-[#B4FC75]" />

                <SettleHead
                    type={actionType}
                    onClose={onClose}
                />

                <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
                    <DomainHero
                        title={opearationName}
                        type={actionType}
                    />
                    {(actionType===SettleType.buy || actionType===SettleType.increase) &&
                        <RefferrerVerify 
                            setRefferrerKey={setRefferrerKey}
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
                    {(actionType===SettleType.settle || actionType===SettleType.addRoot) &&
                        <CustomPriceInput
                            value={currentPrice}
                            onChange={setCurrentPrice}
                            action={actionType}
                        />
                    }
                    <div className="space-y-4 mb-2 md:mb-8 mt-4 md:mt-8">
                        <h3 className="text-[12px] md:text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wide">
                            <CreditCard size={14} /> 账单明细
                        </h3>
                        <FeeItems
                            feeItems={fees}
                            total={totalFee}
                        />
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 md:py-3 bg-[#B4FC75]/5 border border-[#B4FC75]/10 rounded-xl text-[11px] text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#B4FC75] animate-pulse"/>
                            <span className="font-mono font-[600]">钱包余额: {usrBalance? (usrBalance/1e9).toFixed(4)+" SOL":"Checking"}</span>
                        </div>
                        <span className="uppercase font-bold tracking-tighter text-[#B4FC75]/60">{wallet? "Connected via "+wallet.adapter.name:"Not connected"}</span>
                    </div>
                </div>

                <div className="px-4 py-3 md:p-6 border-t border-white/5 bg-[#0a0a0a]">
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
                            className={`
                                col-span-2 py-3.5 rounded-xl font-bold text-black bg-[#B4FC75] transition-all 
                                flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                                ${!ableToConfirm ? "bg-gray-400 pointer-events-none cursor-default" : "hover:opacity-90"}
                                ${calculating? "pointer-events-none cursor-default bg-blue-500":""}
                            `}
                        >
                            {calculating? (
                                <>
                                    <Cpu size={20} />Calculating...
                                </>
                            ):(
                                isProcessing ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> 正在处理...
                                    </>
                                ) : (
                                    <>
                                        确认支付 <ArrowRight size={20} />
                                    </>
                                )
                            )}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}