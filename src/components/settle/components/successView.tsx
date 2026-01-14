import { CheckCircle2, ExternalLink, History } from "lucide-react"


interface SuccessViewProps {
    domainName: string, 
    txHash: string, 
    onDone: () => void
}

const SuccessView: React.FC<SuccessViewProps> = ({
    domainName, txHash, onDone
}) => {



    return(
        <div className="p-8 flex flex-col items-center text-center animate-fade-in">
            <div className="w-20 h-20 bg-[#B4FC75]/20 rounded-full flex items-center justify-center text-[#B4FC75] mb-6 shadow-[0_0_30px_rgba(180,252,117,0.2)]">
                <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">交易已提交</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                您的域名 <span className="text-[#B4FC75] font-mono">{domainName}</span> 的拍卖申请已在区块链上成功广播。
            </p>

            <div className="w-full space-y-3 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="text-left">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">交易哈希</p>
                        <p className="text-sm font-mono text-gray-300">{txHash.slice(0, 8)}...{txHash.slice(-8)}</p>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-colors">
                        <ExternalLink size={16} />
                    </button>
                </div>
            </div>

            <button 
                onClick={onDone}
                className="w-full py-4 rounded-xl font-bold text-black bg-[#B4FC75] hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
                查看我的域名 <History size={18} />
            </button>
        </div>
    )
}


export default SuccessView;
