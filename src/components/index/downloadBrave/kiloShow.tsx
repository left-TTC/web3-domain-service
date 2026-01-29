
import { Infinity, Lock, Shield} from "lucide-react";


const KiloShow = () => {

    return(
        <div className="lg:col-span-6 relative h-full flex items-center justify-center">
            <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">

                <div className="absolute w-full h-3/4 bg-[#0a0a0a] border border-[#B4FC75]/30 rounded-2xl shadow-[0_0_50px_rgba(180,252,117,0.1)] overflow-hidden z-10">
                
                    <div className="w-full bg-[#111] p-4 border-b border-white/5 flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-[#B4FC75]/20"></div>
                        </div>
                        
                        <div className="flex-1 bg-black rounded-lg border border-[#B4FC75]/20 px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Lock size={14} className="text-[#B4FC75]" />
                                <span className="text-[#B4FC75] font-mono text-sm tracking-tight italic">dns.kilo</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-[#B4FC75]/10 text-[#B4FC75] px-2 py-0.5 rounded border border-[#B4FC75]/20">PERMANENT</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 h-full">
                        <div className="grid grid-cols-12 gap-6 h-full">
                            <div className="col-span-5 bg-[#B4FC75]/5 border border-[#B4FC75]/10 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B4FC75]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#B4FC75]/40 flex items-center justify-center mb-4 relative">
                                    <Shield size={40} className="text-[#B4FC75] opacity-50" />
                                    <div className="absolute inset-0 animate-spin-slow">
                                        <div className="w-2 h-2 bg-[#B4FC75] rounded-full absolute -top-1 left-1/2"></div>
                                    </div>
                                </div>
                                <span className="text-[10px] text-[#B4FC75] font-bold tracking-widest uppercase">Anonymous</span>
                            </div>

                            <div className="col-span-7 space-y-4">
                                <div className="h-1/2 bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Infinity size={24} className="text-white opacity-40" />
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                                        BLOCK_HEIGHT: 249,102,441<br/>
                                        STATUS: IMMUTABLE<br/>
                                        OWNER: XXXX
                                    </p>
                                </div>
                                <div className="h-1/3 flex gap-4">
                                    <div className="flex-1 bg-[#B4FC75] rounded-xl flex items-center justify-center">
                                        <span className="text-black font-black text-xs tracking-tighter italic">NO EXPIRE</span>
                                    </div>
                                    <div className="flex-1 border border-white/10 rounded-xl flex items-center justify-center">
                                        <span className="text-white/40 font-black text-xs tracking-tighter italic">P2P NODE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 border-[1px] border-[#B4FC75]/5 [mask-image:radial-gradient(white,transparent)] scale-150"></div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                    }
                    .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                    }
                    .text-glow {
                    text-shadow: 0 0 30px rgba(180,252,117,0.3);
                    }
            `}} />
        </div>
    )
}

export default KiloShow;


