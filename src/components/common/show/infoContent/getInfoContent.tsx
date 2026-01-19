import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { Ban, CheckCircle2, Wallet, WifiOff } from "lucide-react";
import type { ReactNode } from "react";
import type { ModalType } from "../info";


export const getTransactionContent = (
    state: TransactionState, success?: () => void, errInfo?: string
): { 
    node: ReactNode, type: ModalType, title: string, infoOk?: () => void 
} | undefined => {
    switch (state) {
        case TransactionState.Success:
            return {
                title: "交易成功",
                type: 'success',
                node: (
                    <div className="flex flex-col items-center py-4 text-center">
                        <div className="w-16 h-16 bg-[#B4FC75]/20 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="text-[#B4FC75]" size={32} />
                        </div>
                        <p className="text-white font-medium">您的操作已生效</p>
                        <p className="text-sm text-gray-400 mt-2">区块已确认，您可以在用户界面中查看详情</p>
                    </div>
                ),
                infoOk: success,
            };
        case TransactionState.NoEnoughBalance:
            return {
                title: "余额不足",
                type: 'warning',
                node: (
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                            <Wallet className="text-yellow-400 shrink-0" size={20} />
                            <p className="text-sm text-yellow-200/80 leading-relaxed">
                                您的钱包余额不足以支付本次交易。请充值后重试。
                            </p>
                        </div>
                    </div>
                )
            };
        case TransactionState.NoConnect:
            return {
                title: "钱包未连接",
                type: 'error',
                node: (
                    <div className="flex flex-col items-center text-center py-2">
                        <WifiOff className="text-red-400 mb-4" size={40} />
                        <p className="text-gray-300">未检测到活跃的钱包连接，请先点击右上角连接钱包。</p>
                    </div>
                )
            };
        case TransactionState.Cancle:
            return {
                title: "交易已取消",
                type: 'info',
                node: (
                    <div className="flex items-center gap-3 p-4">
                        <Ban className="text-gray-500" size={24} />
                        <span className="text-gray-400">您已主动在钱包中拒绝了该笔交易。</span>
                    </div>
                )
            };
        case TransactionState.Error:
            return {
                title: "操作失败",
                type: 'error',
                node: (
                    <div className="space-y-4">
                        <div className="p-4 bg-red-400/5 border border-red-400/20 rounded-xl">
                            <p className="text-red-400 font-mono text-xs break-all">
                                Error: {errInfo}
                            </p>
                        </div>
                        <p className="text-sm text-gray-400">请检查您的网络连接或尝试切换 RPC 节点。</p>
                    </div>
                )
            };
    
        default:
            return 
    }
};
