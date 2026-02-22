import { useWalletEnv } from '@/provider/walletEnviroment/useWalletEnv';
import { startProject } from '@/utils/net/mainFunction/startProject';
import { useConnection } from '@solana/wallet-adapter-react';
import { ShieldCheck, Play } from 'lucide-react';

interface HeaderProps {
    isProjectActive: boolean;
}

const Header = ({ isProjectActive }: HeaderProps) => {

    const {connection} = useConnection()
    const {publicKey: admin, signTransaction} = useWalletEnv()

    const startweb3Project = async() => {
        await startProject(
            connection, signTransaction, admin
        )
    }

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-15 mt-30">
            <div>
                <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    <ShieldCheck className="text-[#B4FC75]" size={32} />
                    VAULT <span className="text-gray-500 italic">MANAGER</span>
                </h1>
                <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">Admin Terminal v2.4.0</p>
            </div>

            <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                    isProjectActive ? 'border-[#B4FC75]/20 bg-[#B4FC75]/5 text-[#B4FC75]' : 'border-red-500/20 bg-red-500/5 text-red-500'
                }`}>
                    <div className={`w-2 h-2 rounded-full ${isProjectActive ? 'bg-[#B4FC75] animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-xs font-bold uppercase tracking-wider">
                        {isProjectActive ? 'Project Active' : 'Project Offline'}
                    </span>
                </div>
                
                {!isProjectActive && (
                    <button 
                        onClick={startweb3Project}
                        className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-[#B4FC75] transition-all active:scale-95"
                    >
                        <Play size={16} fill="currentColor" /> START PROJECT
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
