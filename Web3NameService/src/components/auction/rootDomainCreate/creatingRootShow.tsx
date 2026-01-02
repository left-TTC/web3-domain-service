import { CREATE_ROOT_TARGET } from "@/utils/constants/constants";
import type { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { cutString } from "@/utils/functional/common/cutString";
import { findCreatingRoot } from "@/utils/net/findCreatingRoot";
import { useConnection } from "@solana/wallet-adapter-react";
import { ArrowRight, Globe, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const primaryColor = '#B4FC75';

interface CreatingRootShowProps {
    openLanunchSettleAndRecordPosition: () => void
}

const CreatingRootShow: React.FC<CreatingRootShowProps> = ({
    openLanunchSettleAndRecordPosition
}) => {

    const {connection} = useConnection();
    
    const [sailingRootDomains, setSailingRootDomains] = useState<rootStateAccount[]> ([])
    const creatingLoaded = useRef(false)

    useEffect(() => {
        const getAllCreatingRootDomains = async() => {
            if(creatingLoaded.current)return
            creatingLoaded.current = true
            const allRoots = await findCreatingRoot(connection)
            setSailingRootDomains(allRoots);
        }

        getAllCreatingRootDomains()
    }, [])

    return(
        <section className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B4FC75]/30 bg-[#B4FC75]/5 text-[#B4FC75] text-xs font-mono mb-4">
                        <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B4FC75] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B4FC75]"></span>
                        </span>
                        LIVE AUCTIONS
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Root Domain <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Governance & Launch</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        支持您最喜爱的顶级域名（TLD）。当筹款达到目标时，该根域名将在 Solana 链上被激活并生成 NFT 权益。
                    </p>
                </div>
                
                {/* 统计数据 */}
                <div className="flex gap-8 border-l border-white/10 pl-8">
                    <div>
                        <p className="text-gray-500 text-sm font-mono uppercase">Total Value Locked</p>
                        <p className="text-2xl font-bold font-mono" style={{ color: primaryColor }}>142,059 SOL</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-mono uppercase">Active TLDs</p>
                        <p className="text-2xl font-bold text-white">14</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sailingRootDomains.map((item) => {
                    const progress = (item.fundState.toNumber() / CREATE_ROOT_TARGET) * 100;
                    return (
                        <div key={item.creatingName} className="group relative bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-[#B4FC75]/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#B4FC75] group-hover:text-black transition-colors duration-300">
                                <Globe size={20} />
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold mb-1 tracking-tight">{item.creatingName}</h3>
                            <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
                                由 <span className="text-white underline decoration-dotted font-normal">{cutString(item.rootSponsor.toBase58(), 5, 5, "...")}</span> 发起
                            </p>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2 font-mono">
                                <span className="text-white">{item.fundState.toLocaleString()} SOL</span>
                                <span className="text-gray-500">of {CREATE_ROOT_TARGET.toLocaleString()}</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${progress}%`, backgroundColor: primaryColor }}
                                ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Users size={14} />
                                    100 支持者
                                </div>
                                <button 
                                    onClick={() => openLanunchSettleAndRecordPosition()}
                                    className="text-sm font-bold hover:underline decoration-2 underline-offset-4 decoration-[#B4FC75] flex items-center gap-1 transition-all">
                                    Stake SOL <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}


export default CreatingRootShow;
