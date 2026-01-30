import DownLoadIntroduce from "@/components/download/downLoadIntroduce";
import DownLoadHero from "@/components/download/downLoadHero";
import { Globe } from "lucide-react";
import DownLoadContent from "@/components/download/downLoadContent";



export function DownLaodPage(){



    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24">

            <main className="max-w-6xl mx-auto">
                <DownLoadHero />
                <DownLoadContent />
                <DownLoadIntroduce />
            </main>

            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 opacity-50">
                        <Globe className="w-5 h-5" />
                        <span className="text-sm font-black uppercase italic tracking-tighter">KILO BROWSER</span>
                    </div>
                    <div className="flex gap-8 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                    <div className="text-[10px] text-gray-800 font-mono">
                        &copy; 2026 OPEN SOURCE PROJECT. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </footer>
        </div>
    );
}