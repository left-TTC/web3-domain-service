import { Code, Globe, User, Wallet, Zap } from "lucide-react"
import { UsrStateCard } from "./index/statCard";


const primaryColor = '#B4FC75'; 

const UsrInfo = () => {


    return(
        <section className="animate-fade-in-down">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-white/10">
                <h1 className="text-4xl font-bold mb-4 md:mb-0 flex items-center gap-3">
                    <User size={32} style={{ color: primaryColor }} />
                    usr name
                </h1>
                <div className="flex items-center text-sm font-mono text-gray-400 bg-[#111] px-4 py-2 rounded-lg border border-white/10">
                    <Wallet size={16} className="mr-2" />
                    wallet address
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <UsrStateCard icon={Globe} label="拥有的域名" value={`2 个`} />
                <UsrStateCard icon={Code} label="链上资产估值" value={`0 SOL`} />
                <UsrStateCard icon={Zap} label="主域名状态" value="已设置" />
            </div>
        </section>
    )
}

export default UsrInfo;
