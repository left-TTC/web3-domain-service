

import { useTranslation } from "react-i18next"

import { getAndReturnNowPosition } from "@/utils/functional/show/page/getAndReturnNowPosition"
import { ArrowRight, Search } from "lucide-react"

export interface BrowserDomainProps{
    setQueryPage: React.Dispatch<React.SetStateAction<boolean>>
    setBackFn: React.Dispatch<React.SetStateAction<()=>void>>
}

const BrowserDomain: React.FC<BrowserDomainProps> = ({
    setQueryPage, setBackFn
}) => {

    const {t} = useTranslation();

    const openSearchDomain = () => {
        setBackFn(() => getAndReturnNowPosition(false))
        setQueryPage(true)
    }

    const primaryColor = '#B4FC75';

    return(
        <section className="text-center pt-26 md:pt-88 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t("get")}  <span style={{ color: primaryColor }} className="drop-shadow-lg shadow-[#B4FC75]/50">{t("permanent")}</span>
            </h1>
            <p className="text-xl text-gray-400 font-normal mb-10 max-w-3xl mx-auto">
                在 Solana 上注册去中心化域名
            </p>

            <div className="flex justify-center">
                <div className="relative w-full max-w-2xl group">
                <div className="absolute -inset-0.5 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-300 blur-sm"
                    style={{ background: `linear-gradient(90deg, #111111 0%, ${primaryColor} 50%, #111111 100%)` }}
                />
                <div 
                    className="relative flex items-center bg-[#111] rounded-2xl p-2 border-2 border-white/10 group-hover:border-[#B4FC75]/50 transition-colors cursor-pointer"
                    onClick={() => openSearchDomain()}
                >
                    <Search className="w-6 h-6 text-gray-500 ml-4" />
                    <input 
                        type="text"
                        placeholder={t("startquery")}
                        disabled 
                        className="w-full bg-transparent border-none text-white placeholder-gray-600 px-4 py-4 text-lg outline-none font-mono pointer-events-none"
                    />
                    <button 
                        className="p-3 rounded-xl font-bold text-black hover:opacity-90 transition-all active:scale-95 flex items-center gap-1 pointer-events-none"
                        style={{ backgroundColor: primaryColor }}
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>
                </div>
            </div>
            
            <p className="text-sm font-medium text-gray-500 mt-4">支持长度 3 到 15 个字符，仅限小写字母和数字。</p>
        </section>
    )
}

export default BrowserDomain;