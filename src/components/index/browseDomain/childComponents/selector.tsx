import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface NiceSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    className?: string;      
    placeholder?: string;    
}

export const NiceSelect: React.FC<NiceSelectProps> = ({
    options,
    value,
    onChange,
    className = "",
    placeholder = "Select"
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={`relative w-full ${className}`}>
            <div
                className="
                    bg-[#111]/70 border border-white/10 rounded-xl
                    px-3 md:px-4 py-2 md:py-3 text-white font-mono text-[16px] md:text-lg cursor-pointer
                    flex justify-between items-center
                    hover:border-white/20 transition-all
                    backdrop-blur-md
                "
                onClick={() => setOpen(!open)}
            >
                {value || placeholder}

                <ChevronDown
                    className={`
                        w-5 h-5 text-gray-400 transition-transform duration-300
                        ${open ? "rotate-180" : "rotate-0"}
                    `}
                />
            </div>

            {open && (
                <div
                    className="
                        absolute left-0 right-0 mt-2 bg-[#111]/90 
                        rounded-xl border border-white/10 shadow-xl 
                        z-50 backdrop-blur-lg overflow-hidden
                        animate-fadeIn
                    "
                >
                    {options.map((item) => (
                        <div
                            key={item}
                            className="
                                px-4 py-3 text-white font-mono cursor-pointer 
                                hover:bg-white/10 transition-colors
                            "
                            onClick={() => {
                                onChange(item);
                                setOpen(false);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
