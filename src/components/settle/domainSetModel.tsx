import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { DollarSign, FileCode, Loader2, X, Zap } from "lucide-react";
import { useState } from "react";
import { setCustomPrice } from "./components/function/setCustomPrice";
import { useConnection } from "@solana/wallet-adapter-react";
import type { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";
import { setIPFS } from "./components/function/setIPFS";
import { IPFSOperation } from "@/utils/net/mainFunction/usrOperation/setDomainIPFSRecord";

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
    ifInitIpfs?: boolean
}

const DomainSetModel: React.FC<DomainSetModelProps> = ({
    domainName, type, newValue, onClose, protocol, ifInitIpfs
}) => {

    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {rootDomains} = useRootDomain()
    const {connection} = useConnection()

    const [isProcessing, setIsProcessing] = useState(false);

    const getActionTitle = () => {
        if (type === DomainSetType.Cid) return "更新 IPFS 记录";
        if (type === DomainSetType.Price) return "调整市场价格";
        return "确认交易";
    };

    const changePrice = async() => {
        if (typeof newValue != 'number') return
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
        if (typeof newValue === 'number') return
        return await setIPFS(
            newValue, 
            ifInitIpfs!? IPFSOperation.Init:IPFSOperation.Reset, 
            domainName,
            usr, 
            rootDomains, 
            connection, 
            protocol,
            signTransaction,
        )
    }

    const handleConfirm = async() => {
        setIsProcessing(true);
        if(type === DomainSetType.Cid){
            await changeCid()
        }else await changePrice()
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-1.5 w-full bg-[#B4FC75]"></div>
                
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-xl font-bold text-white">{getActionTitle()}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">正在操作域名</p>
                            <p className="text-lg font-mono text-[#B4FC75]">{domainName}</p>
                        </div>

                        <div className="p-4 bg-[#B4FC75]/5 rounded-2xl border border-[#B4FC75]/20">
                            <div className="flex items-center gap-2 mb-2">
                                {type === DomainSetType.Cid ? <FileCode size={14} className="text-[#B4FC75]" /> : <DollarSign size={14} className="text-[#B4FC75]" />}
                                <span className="text-xs font-bold text-[#B4FC75] uppercase">
                                    {type === DomainSetType.Cid ? `新的 ${protocol?.toUpperCase()} 指向` : '新设定的价格'}
                                </span>
                            </div>
                            <p className="text-sm font-mono text-white break-all">
                                {type === DomainSetType.Price ? `${newValue} SOL` : newValue}
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/5">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>网络燃料费 (Gas)</span>
                                <span className="font-mono text-white">0.00005 SOL</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>存储租金</span>
                                <span className="font-mono text-white">0.00 SOL (已豁免)</span>
                            </div>
                            <div className="flex justify-between items-end pt-2">
                                <span className="text-sm font-bold text-white">总计支出</span>
                                <span className="text-2xl font-mono font-bold text-[#B4FC75]">0.00005 <span className="text-xs uppercase">SOL</span></span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="w-full py-4 rounded-xl font-bold text-black bg-[#B4FC75] hover:opacity-90 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Zap size={18} fill="black" />}
                        {isProcessing ? "签署交易中..." : "确认并发送交易"}
                    </button>
                </div>
            </div>
        </div>
    );

}

export default DomainSetModel;
