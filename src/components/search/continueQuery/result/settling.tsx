
import { Lock } from "lucide-react"


const Settling = () => {
    

    return(
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4 md:p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-500 mb-2 md:mb-3">
                <Lock size={24} />
            </div>
            <h4 className="text-yellow-500 font-bold text-[15px] md:text-lg mb-1">拍卖结算中</h4>
            <p className="text-gray-400 text-[11px] font-normal md:text-sm mb-3 md:mb-4 max-w-sm">
                拍卖已结束，正在等待赢家领取域名资产。此阶段暂时无法进行任何交易。
            </p>
            <div className="px-4 py-2 bg-black/40 rounded-lg text-sm font-mono text-gray-300 border border-white/5">
                预计恢复时间: ~3 days
            </div>
        </div>
    )
}

export default Settling;
