import { AlertCircle, RefreshCcw, X } from "lucide-react"


interface ErrorViewProps {
    error: string, 
    onRetry: () => void, 
    onCancel: () => void 
}

const ErrorView: React.FC<ErrorViewProps> = ({
    error, onRetry, onCancel
}) => {

    const getErrorInfo = (err: string) => {
        if (err.includes("User rejected")) return { title: "已取消交易", desc: "您在钱包中拒绝了签名请求。", icon: <X size={40} /> };
        if (err.includes("insufficient funds")) return { title: "余额不足", desc: "您的钱包中没有足够的 SOL 来支付此次交易费用。", icon: <AlertCircle size={40} /> };
        return { title: "交易失败", desc: err || "发生未知错误，请检查网络后重试。", icon: <AlertCircle size={40} /> };
    };

    const info = getErrorInfo(error);

    return (
        <div className="p-8 flex flex-col items-center text-center animate-fade-in">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                {info.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{info.title}</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-[280px]">
                {info.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                    onClick={onCancel}
                    className="py-4 rounded-xl font-bold text-gray-400 border border-white/10 hover:bg-white/5 transition-all"
                >
                    取消
                </button>
                <button 
                    onClick={onRetry}
                    className="py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                    重试 <RefreshCcw size={18} />
                </button>
            </div>
        </div>
    );
}


export default ErrorView;
