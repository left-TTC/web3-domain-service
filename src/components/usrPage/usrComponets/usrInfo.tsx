import { Globe, Share2, TrendingUp, User, Wallet } from "lucide-react"
import { UsrStateCard } from "./index/statCard";
import type { PublicKey } from "@solana/web3.js";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { useEffect, useState } from "react";
import { cutString } from "@/utils/functional/common/cutString";


const primaryColor = '#B4FC75'; 

interface UsrInfoProps {
    checkUsr: PublicKey | null,
    usrDomains: string[], 
    ifCheckingOtherUsr: boolean,
    domainStateMap: Map<string, NameRecordState> | null,
    usrProfit: number | null,
    usrVolume: number | null,
}

const UsrInfo: React.FC<UsrInfoProps> = ({
    checkUsr, usrDomains, ifCheckingOtherUsr, 
    // domainStateMap, 
    usrProfit, 
    // usrVolume
}) => {

    const [profitValue, setProfitValue] = useState("")
    const [profitExtraValue, setProfitExtraValue] = useState("")

    useEffect(() => {
        if(usrProfit){
            setProfitValue((usrProfit/1e9).toFixed(4) + " SOL")
            if(usrProfit> 0.01001 * 1e9){
                setProfitExtraValue(((usrProfit - 0.1*1e9)/1e9).toFixed(4) + " SOL")
            }else setProfitExtraValue("未到体现门槛 0.01 SOL")
        }else {
            setProfitValue("0 SOL")
        }
    }, [usrProfit])

    const ifMd = window.innerWidth >= 768;

    return(
        <section className="animate-fade-in-down">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8 pb-4 border-b border-white/10">
                <div className="ml-3 md:ml-8 text-[12px] md:text-xl font-bold mb-2 md:mb-0 flex items-center gap-3">
                    <User size={ifMd? 40:20} style={{ color: primaryColor }} />
                    {ifMd? checkUsr?.toBase58() : (checkUsr? cutString(checkUsr.toBase58(), 5, 5, "...") : "Loading")}
                </div>
                <div className="flex items-center text-[11px] md:text-sm font-mono text-gray-300 bg-[#111] px-4 py-2 rounded-lg border border-white/10">
                    <Wallet size={16} className="mr-2" />
                    wallet address
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
                <UsrStateCard canClink={false} icon={Globe} label="拥有的域名" value={usrDomains.length} />
                <UsrStateCard canClink={!ifCheckingOtherUsr} icon={TrendingUp} label="收益" value={profitValue} extraValue={profitExtraValue}/>
                <UsrStateCard canClink={!ifCheckingOtherUsr} icon={Share2} label="推广" value="获取更多收益" />
            </div>
        </section>
    )
}

export default UsrInfo;
