import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { Ban, CheckCircle2, Wallet, WifiOff } from "lucide-react";
import type { ReactNode } from "react";
import type { ModalType } from "../info";
import type { TFunction } from "i18next";


export const getTransactionContent = (
    state: TransactionState, t: TFunction<"translation", undefined>, success?: () => void, errInfo?: string
): { 
    node: ReactNode, type: ModalType, title: string, infoOk?: () => void 
} | undefined => {
    
    switch (state) {
        case TransactionState.Success:
            return {
                title: t("transactionSuccessful"),
                type: 'success',
                node: (
                    <div className="flex flex-col items-center py-4 text-center">
                        <div className="w-16 h-16 bg-[#B4FC75]/20 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="text-[#B4FC75]" size={32} />
                        </div>
                        <p className="text-white font-medium">{t("operationTakenEffect")}</p>
                        <p className="text-sm text-gray-400 mt-2">{t("blockConfirmedViewDetails")}</p>
                    </div>
                ),
                infoOk: success,
            };
        case TransactionState.NoEnoughBalance:
            return {
                title: t("insufficientBalance"),
                type: 'warning',
                node: (
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                            <Wallet className="text-yellow-400 shrink-0" size={20} />
                            <p className="text-sm text-yellow-200/80 leading-relaxed">
                                {t("walletBalanceInsufficient")}
                            </p>
                        </div>
                    </div>
                )
            };
        case TransactionState.NoConnect:
            return {
                title: t("walletNotConnected"),
                type: 'error',
                node: (
                    <div className="flex flex-col items-center text-center py-2">
                        <WifiOff className="text-red-400 mb-4" size={40} />
                        <p className="text-gray-300">{t("noActiveWalletConnection")}</p>
                    </div>
                )
            };
        case TransactionState.Cancle:
            return {
                title: t("transactionCancelled"),
                type: 'info',
                node: (
                    <div className="flex items-center gap-3 p-4">
                        <Ban className="text-gray-500" size={24} />
                        <span className="text-gray-400">{t("transactionRejectedInWallet")}</span>
                    </div>
                )
            };
        case TransactionState.Error:
            return {
                title: t("operationFailed"),
                type: 'error',
                node: (
                    <div className="space-y-4">
                        <div className="p-4 bg-red-400/5 border border-red-400/20 rounded-xl">
                            <p className="text-red-400 font-mono text-xs break-all">
                                Error: {errInfo}
                            </p>
                        </div>
                        <p className="text-sm text-gray-400">{t("checkNetworkOrSwitchRPC")}</p>
                    </div>
                )
            };
    
        default:
            return 
    }
};
