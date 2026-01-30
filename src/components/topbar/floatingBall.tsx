import { ArrowLeft, Check, ChevronRight, Languages } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export interface FloatingBallProps {
    showBack: boolean,
}

const FloatingBall: React.FC<FloatingBallProps> = ({
    showBack
}) => {

    const { i18n } = useTranslation();
    const languages = Object.keys(i18n.options.resources ?? {});
    const navi = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState(i18n.language);

    const navigate = () => {
        navi("/index");
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getLangFlag = (lang: string) => {
        switch(lang){
            case "en": 
                return "US"
        }
    }

    const getLangWord = (lang: string) => {
        switch(lang){
            case "en": 
                return "English"
        }
    }
    
    return(
        <div className="fixed bottom-54 md:bottom-18 right-8 md:right-18 z-[100] flex flex-col items-end gap-4">
        
            {!showBack && isMenuOpen && (
                <div className="mb-2 bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {languages!.map((lang, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                i18n.changeLanguage(lang);
                                setLanguage(lang);
                                setIsMenuOpen(false);
                            }}
                                className={`flex items-center gap-3 w-40 px-4 py-3 rounded-xl transition-all ${
                                language === lang ? 'bg-[#B4FC75] text-black' : 'hover:bg-white/5 text-gray-400'
                            }`}
                        >
                            <span className="text-[10px] font-black opacity-50">{getLangFlag(lang)}</span>
                            <span className="text-sm font-bold flex-1 text-left">{getLangWord(lang)}</span>
                                {language === lang && <Check size={14} />}
                        </button>
                    ))}
                </div>
            )}

            <button
                onClick={() => {
                    if (showBack) {
                        navigate();
                    } else {
                        setIsMenuOpen(!isMenuOpen);
                    }
                }}
                className={`group relative w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(180,252,117,0.15)] ${
                    showBack 
                    ? 'bg-white text-black hover:scale-110' 
                    : 'bg-[#B4FC75] text-black hover:shadow-[0_0_40px_rgba(180,252,117,0.4)]'
                }`}
            >
                <div className="relative w-6 h-6 flex items-center justify-center">
                    {showBack ? (
                        <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
                    ) : (
                        <div className="transition-all duration-500 flex items-center justify-center">
                            {isMenuOpen ? (
                                <ChevronRight className="rotate-90" />
                            ) : (
                                <Languages />
                            )}
                        </div>
                    )}
                </div>

                <div className="absolute inset-0 rounded-full border border-white/20 scale-125 group-hover:scale-150 transition-transform opacity-0 group-hover:opacity-100 duration-500" />
                
                <div className="absolute right-20 bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {showBack ? 'Back to Home' : 'Switch Language'}
                </div>
            </button>
        </div>
    )
}

export default FloatingBall;