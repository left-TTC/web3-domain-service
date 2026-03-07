import { useState } from "react"
import { Copy, Check, Languages, X } from "lucide-react"
import { generateInvitePromo } from "@/utils/functional/common/project/genInvitation"
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv"
import { PublicKey } from "@solana/web3.js"

interface InviteChooserProps {
    onClose: () => void
}

interface LanguageOption {
    id: string
    code: string
    name: string
}

const LANGUAGES: LanguageOption[] = [
    { id: "en", code: "US", name: "English" },
    { id: "zh", code: "CN", name: "中文"},
    // { id: "ja", code: "JP", name: "日本語"},
    // { id: "ko", code: "KR", name: "한국어"}
];

const InviteChooser: React.FC<InviteChooserProps> = ({
    onClose
}) => {

    const { publicKey: usrKey } = useWalletEnv()

    const [copied, setCopied] = useState(false)
    const [selected, setSelected] = useState<LanguageOption>(LANGUAGES[0])

    const origin =
        typeof window !== "undefined"
            ? window.location.origin
            : ""

    const downloadUrl = `${origin}/#/download`
    const siteUrl = origin

    const copyText = async (text: string) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text)
            } else {
                const textarea = document.createElement("textarea")
                textarea.value = text
                textarea.style.position = "fixed"
                textarea.style.opacity = "0"

                document.body.appendChild(textarea)
                textarea.focus()
                textarea.select()

                document.execCommand("copy")
                document.body.removeChild(textarea)
            }

            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 2000)

        } catch (err) {
            console.error("Copy failed:", err)
        }
    }

    const handleCopy = () => {
        const inviteMessage = generateInvitePromo(
            downloadUrl,
            siteUrl,
            usrKey ?? PublicKey.default,
            selected.id
        )

        copyText(inviteMessage)
    }

    const handleLanguageSelect = (lang: LanguageOption) => {
        setSelected(lang)
        setCopied(false)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/80 backdrop-blur-md"
            onClick={onClose}
        >

            <div
                className="w-full max-w-sm bg-[#111] border border-white/10 rounded-3xl shadow-2xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-3 md:mb-6">

                    <div className="w-10 h-10 rounded-full bg-[#B4FC75]/10 flex items-center justify-center border border-[#B4FC75]/20">
                        <Languages className="text-[#B4FC75]" size={20} />
                    </div>

                    <div>
                        <h2 className="text-[12px] md:text-[14px] text-white font-semibold">
                            Select Invitation Language
                        </h2>

                        <p className="text-[10px] md:text-[13px] text-gray-500">
                            Automatically format sharing text
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 md:mb-8">

                    {LANGUAGES.map((lang) => (

                        <button
                            key={lang.id}
                            onClick={() => handleLanguageSelect(lang)}
                            className={`relative px-4 py-1 md:py-2 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                                selected.id === lang.id
                                    ? "bg-[#B4FC75] border-[#B4FC75] text-black shadow-[0_0_15px_rgba(180,252,117,0.3)]"
                                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10"
                            }`}
                        >

                            <span className="text-lg opacity-80">
                                {lang.code === "CN"
                                    ? "🇨🇳"
                                    : lang.code === "US"
                                    ? "🇺🇸"
                                    : lang.code === "JP"
                                    ? "🇯🇵"
                                    : "🇰🇷"}
                            </span>

                            <span className="text-sm font-medium">
                                {lang.name}
                            </span>

                            {selected.id === lang.id && (
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                            )}
                        </button>

                    ))}

                </div>

                <div className="space-y-4">

                    <button
                        onClick={handleCopy}
                        className={`w-full py-3 md:py-4 rounded-xl text-[12px] md:text-[14px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                            copied
                                ? "bg-[#B4FC75] text-black"
                                : "bg-[#B4FC75] text-black hover:opacity-90"
                        }`}
                    >

                        {copied ? (
                            <>
                                <Check size={18} />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy size={18} />
                                Copy Invitation
                            </>
                        )}

                    </button>

                </div>

                <div className="mt-4 md:mt-6 pt-4 border-t border-white/5 flex justify-center">

                    <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-gray-800"
                            />
                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default InviteChooser