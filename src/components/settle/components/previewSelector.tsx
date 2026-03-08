import { Database } from "lucide-react";
import { UseProtocol } from "@/utils/functional/common/class/ipfsRecordState";
import { useTranslation } from "react-i18next";

interface PreviewSelectorProps {
    preview: string;
    previewType: UseProtocol;
    onPreviewChange: (preview: string) => void;
    onPreviewTypeChange: (previewType: UseProtocol) => void;
}

const PreviewSelector: React.FC<PreviewSelectorProps> = ({
    preview,
    previewType,
    onPreviewChange,
    onPreviewTypeChange,
}) => {
    const { t } = useTranslation();
    
    return (
        <div className="space-y-4 mb-6">
            <div className="space-y-2">
                <label className="text-[11px] md:text-sm font-bold text-gray-500 uppercase tracking-wider">{t("selectProtocolType")}</label>
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
                    {Object.values(UseProtocol).map(p => (
                        <button
                            key={p}
                            onClick={() => onPreviewTypeChange(p)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${previewType === p ? 'bg-white/10 text-[#B4FC75]' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            {p.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-[11px] md:text-sm font-bold text-gray-500 uppercase tracking-wider">{t("enterCID")}</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#B4FC75]">
                        <Database size={18} />
                    </div>
                    <input 
                        type="text"
                        value={preview}
                        onChange={(e) => onPreviewChange(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 md:py-4 pl-12 pr-4 text-sm md:text-base font-mono text-white focus:outline-none focus:border-[#B4FC75]/50"
                        placeholder={previewType === UseProtocol.IPFS ? t("enterIpfsCidPlaceholder") : 
                                   previewType === UseProtocol.IPNS ? t("enterIpnsIdPlaceholder") : 
                                   t("enterTorAddressPlaceholder")}
                    />
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                    {previewType === UseProtocol.IPFS ? t("ipfsCidExample") :
                     previewType === UseProtocol.IPNS ? t("ipnsExample") :
                     t("torAddressExample")}
                </p>
            </div>
        </div>
    );
};

export default PreviewSelector;
