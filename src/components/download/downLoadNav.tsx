
import { Menu, X } from "lucide-react";

import kilo from "@/assets/kilo-64.svg"
interface DownLoadNavProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DownLoadNav: React.FC<DownLoadNavProps> = ({
    isMenuOpen, setIsMenuOpen
}) => {

    return(
        <nav className="w-full h-20 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 bg-[#050505]/80">
            <div className="flex items-center gap-[20px]">
                <div className="bg-white/30 rounded-xl p-[3px]">
                    <img src={kilo} className="w-[45px]"/>
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic">KILO BROWSER</span>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </nav>
    )
}

export default DownLoadNav;


