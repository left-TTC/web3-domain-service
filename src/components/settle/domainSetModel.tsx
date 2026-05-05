import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { DollarSign, FileCode, Loader2, X, Zap } from "lucide-react";
import { useState } from "react";
import { setCustomPrice } from "./components/function/setCustomPrice";
import { useConnection } from "@solana/wallet-adapter-react";
import type { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";
import { setIPFS } from "./components/function/setIPFS";
import { IPFSOperation } from "@/utils/net/mainFunction/usrOperation/setDomainIPFSRecord";
import type { PublicKey } from "@solana/web3.js";
import { useCalculateSetFees } from "./components/function/useCalculateSetFee";
import FeeItems from "./components/feeItems";
import { getTransactionContent } from "../common/show/infoContent/getInfoContent";
import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { useGlobalModal } from "../common/show/info";
import { useTranslation } from "react-i18next";

export enum DomainSetType {
    Price,
    Cid,
} 

interface DomainSetModelProps {
    domainName: string;
    type: DomainSetType;
    newValue: string | number;
    onClose: () => void;
    protocol: UseProtocol;
    lastSetter: PublicKey,
    ifInitIpfs?: boolean
    lastVaule?: string
}

const DomainSetModel: React.FC<DomainSetModelProps> = ({
    domainName, type, newValue, onClose, protocol, ifInitIpfs, lastSetter, lastVaule
}) => {

    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {rootDomains} = useRootDomain()
    const {connection} = useConnection()
    const {t} = useTranslation()
    const info = useGlobalModal()

    const [isProcessing, setIsProcessing] = useState(false);

    const getActionTitle = () => {
        if (type === DomainSetType.Cid) return t("updateIPFSRecord");
        if (type === DomainSetType.Price) return t("adjustCustomPrice");
        return t("confirmTransaction");
    };

    const changePrice = async() => {
        if (typeof newValue != 'number') return TransactionState.Error
        return await setCustomPrice(
            newValue!,
            domainName,
            usr,
            rootDomains,
            connection,
            signTransaction
        )
    }
    const changeCid = async() => {
        if (typeof newValue === 'number') return TransactionState.Error
        return await setIPFS(
            newValue, 
            ifInitIpfs!? IPFSOperation.Init:IPFSOperation.Reset, 
            domainName,
            usr, 
            lastSetter,
            rootDomains, 
            connection, 
            protocol,
            signTransaction,
        )
    }

    const handleConfirm = async() => {
        setIsProcessing(true);
        let state;
        if(type === DomainSetType.Cid){
            state = await changeCid()
        }else {
            state = await changePrice()
        }
        setIsProcessing(false);

        const infos = getTransactionContent(state, t, onClose)
        if(infos){
            info.showModal({
                title: infos.title,
                type: infos.type,
                content: infos.node,
                onConfirm: infos.infoOk,
                onCancel: infos.infoOk,
            })
        }else{
            console.log("no infos")
        }
    };

    const { fees, totalFee, calculating } = useCalculateSetFees(type, rootDomains, domainName, onClose, newValue as string, lastVaule)

    return (
        <div className="fixed inset-0 z-99 flex items-center justify-center p-8 md:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-[420px] bg-[#111] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-1.5 w-full bg-[#B4FC75]" />
                
                <div className="p-5 md:p-8">
                    <div className="flex justify-between items-start mb-4 md:mb-5">
                        <h2 className="text-[12px] md:text-[15px] font-bold text-white">{getActionTitle()}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
                    </div>

                    <div className="space-y-4 md:space-y-6 mb-8">
                        <div className="md:p-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{t("operatingDomain")}</p>
                            <p className="text-[13px] md:text-[16px] font-mono text-[#B4FC75]">{domainName}</p>
                        </div>

                        <div className="md:p-4 p-3 bg-[#B4FC75]/5 rounded-2xl border border-[#B4FC75]/20">
                            <div className="flex items-center gap-2 mb-2">
                                {type === DomainSetType.Cid ? <FileCode size={14} className="text-[#B4FC75]" /> : <DollarSign size={14} className="text-[#B4FC75]" />}
                                <span className="text-[11px] md:text-xs font-bold text-[#B4FC75] uppercase">
                                    {type === DomainSetType.Cid ? t("newProtocolPointer", { protocol: protocol?.toUpperCase() }) : t("newSetPrice")}
                                </span>
                            </div>
                            <p className="text-[9px] md:text-[11px] font-mono text-white break-all">
                                {type === DomainSetType.Price ? `${(newValue)} SOL` : newValue}
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/5">
                            <FeeItems
                                feeItems={fees}
                                total={totalFee}
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleConfirm}
                        disabled={calculating}
                        className="w-full py-3 md:py-4 rounded-xl font-bold text-[13px] md:text-[15px] text-black disabled:bg-gray-500 bg-[#B4FC75] hover:opacity-90 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Zap size={18} fill="black" />}
                        {isProcessing ? t("signingTransaction") : t("confirmAndSendTransaction")}
                    </button>
                </div>
            </div>
        </div>
    );

}

export default DomainSetModel;
