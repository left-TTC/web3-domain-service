import { useState } from 'react';
import UsrInfo from './usrComponets/usrInfo';
import UsrManage from './usrComponets/usrManage';



export default function UsrIndex() {
    
    const [activeTab, setActiveTab] = useState<'mydomain' | 'economy'>('mydomain');
 

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#B4FC75] selection:text-black pb-24 relative overflow-x-hidden">

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[30%] w-[400px] h-[400px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.08]"></div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10 flex flex-col gap-16 mt-20">
                <UsrInfo />
                <UsrManage
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </main>

            <footer className="max-w-7xl mx-auto px-6 mt-20 border-t border-white/10 pt-8 text-gray-500 text-center text-sm">
                <p>Solana Web3 Domain Service © 2024. Dashboard Access.</p>
            </footer>
        </div>
    );
}