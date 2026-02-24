

import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
const primaryColor = '#B4FC75';

const StakeEmpty = () => {

    const {t} = useTranslation();

    return(
        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-[#B4FC75]/10 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#B4FC75]/20 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-[#B4FC75]/30 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-[#B4FC75]" strokeWidth={2} />
                        </div>
                    </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#B4FC75]/20 border-2 border-[#0a0a0a] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[#B4FC75]">0</span>
                </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-white">
                暂无正在创建的根域名
            </h3>
            
            <p className="text-gray-400 max-w-md mb-6 text-sm leading-relaxed">
                当前没有正在筹款创建的顶级域名(TLD)。您可以成为第一个创建者，启动新的根域名项目。
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B4FC75]/30 bg-[#B4FC75]/5 text-[#B4FC75] text-sm font-mono">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B4FC75] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B4FC75]"></span>
                </span>
                等待新的机会
            </div>
        </div>
    )
}

export default StakeEmpty;




