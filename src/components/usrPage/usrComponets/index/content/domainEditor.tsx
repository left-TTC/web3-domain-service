import { useSmallInfo } from "@/components/common/show/smallInfo";
import DomainSetModel, { DomainSetType } from "@/components/settle/domainSetModel";
import { UseProtocol, type IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { PublicKey } from "@solana/web3.js";
import { ChevronLeft, Database, Globe, Info, Save, Settings, ShieldCheck} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const primaryColor = '#B4FC75'; 

interface DomainEditorProps {
    closeFn: () => void,
    IPFSState: IPFSRecordState | null,
    nameState: NameRecordState | null,
    domainName: string,
}

const DomainEditor: React.FC<DomainEditorProps> = ({
    closeFn, IPFSState, nameState, domainName
}) => {

    const {t} = useTranslation()
    const smallInfo = useSmallInfo()

    const [tempPrice, setTempPrice] = useState((nameState?.customPrice?.toNumber() ?? 0) / 1e9);
    const [tempCid, setTempCid] = useState('');
    const [selectedProtocol, setSelectedProtocol] = useState<UseProtocol>(UseProtocol.IPFS);

    const [newValue, setNewValue] = useState<string | number>("")
    const [showSetModel, setShowSetModel] = useState(false)

    const rewritePrice = () => {
        setNewValue(tempPrice)
        setShowSetModel(true)
    }
    const rewriteCid = () => {
        setNewValue(tempCid)
        setShowSetModel(true)
    }

    return (
        <div className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto">
            <div className="max-w-7xl mb-20 mx-auto px-6 mt-30 sm:mt-50 bg-[#111111] pb-8 pt-8 border-2 border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <button 
                        onClick={() => closeFn()}
                        className="flex text-[14px] items-center font-normal gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} /> {t("backToList")}
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#B4FC75]/10 border border-[#B4FC75]/20 rounded-full text-[#B4FC75] text-xs font-mono">
                        <ShieldCheck size={14} /> {t("ownershipVerified")}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-6 w-full">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-[15px] md:text-[18px] font-bold mb-2 md:mb-4 flex items-center gap-2">
                                <Settings size={20} style={{ color: primaryColor }} /> {domainName}
                            </h3>
                            
                            <div className="space-y-5 mb-5">
                                <label className="text-xs font-bold text-gray-500 uppercase">{t("marketPrice")}</label>
                                <div className="flex gap-3 mt-2">
                                    <div className="relative flex-1 group">
                                        <div 
                                            className=" absolute left-4 top-1/2 -translate-y-1/2
                                            md:text-xs font-mono font-bold
                                            text-gray-500  text-[11px]
                                            group-focus-within:text-[#B4FC75]
                                        ">
                                            SOL
                                        </div>
                                        <input 
                                            placeholder={String(nameState?.customPrice.toNumber() || 0)}
                                            type="number"
                                            value={(tempPrice)}
                                            onChange={(e) => setTempPrice(parseFloat(e.target.value))}
                                            className="w-full text-[13px] md:text-[15px] pl-11 md:pl-15 bg-white/5 border border-white/10 rounded-xl py-3 pr-4 font-mono text-white focus:outline-none focus:border-[#B4FC75]/50"
                                        />
                                    </div>
                                    <button 
                                        onClick={() => rewritePrice()}
                                        className="px-6 rounded-xl bg-white/10 border border-white/10 text-sm font-bold hover:bg-white/20 transition-all"
                                    >
                                        {t("updatePrice")}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">{t("contentAddressingDeployment")}</label>
                        
                                <div className="flex mt-2 p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
                                    {Object.values(UseProtocol).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setSelectedProtocol(p)}
                                            className={`px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all ${selectedProtocol === p ? 'bg-white/10 text-[#B4FC75]' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            {p.toUpperCase()}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="relative flex-1 group">
                                        <Database size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#B4FC75]" />
                                        <input 
                                            type="text"
                                            value={tempCid}
                                            onChange={(e) => setTempCid(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 font-mono text-[11px] md:text-sm text-white focus:outline-none focus:border-[#B4FC75]/50"
                                            placeholder={selectedProtocol === 'ipfs' ? t("enterIpfsCid") : t("enterIpnsId")}
                                        />
                                    </div>
                                    <button 
                                        disabled={tempCid.length === 0}
                                        onClick={() => rewriteCid()}
                                        className={`w-full py-4 rounded-xl bg-white/5 border border-white/10 text-[#B4FC75] font-bold hover:bg-white/10 transition-all text-[12px] md:text-sm flex items-center justify-center gap-2 disabled:cursor-none disabled:opacity-50 disabled:hover:bg-white/5`}
                                    >
                                        <Save size={16} /> {t("updateProtocolRecord", { protocol: selectedProtocol.toUpperCase() })}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex gap-3 items-start">
                            <Info size={16} className="text-blue-400 mt-0.5" />
                            <p className="text-[9px] md:text-xs text-gray-400 font-normal leading-relaxed">
                                {t("protocolInfo")}
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-80 space-y-6">
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#B4FC75]/10 rounded-full blur-2xl"/>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-[#B4FC75] text-black flex items-center justify-center mb-6">
                                    <Globe size={24} />
                                </div>
                                <h4 className="text-2xl font-bold mb-1">{domainName}</h4>
                                <p className="text-xs text-gray-500 font-mono mb-6">WEB3 NAME SERVICE</p>
                                
                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-600 uppercase">{t("currentResolutionService")}</p>
                                        <p className="text-xs text-[#B4FC75] font-mono">{(IPFSState?.recordType ?? t("none")).toUpperCase()}</p>
                                    </div>
                                    <div className="space-y-1"> 
                                        <p className="text-[10px] font-bold text-gray-600 uppercase">{t("currentContent")}</p>
                                        <p 
                                            onClick={() => {
                                                if(IPFSState?.recordData){
                                                    navigator.clipboard.writeText(IPFSState?.recordData);
                                                    smallInfo.showToast({message: t("copied"), type: 'success'})
                                                }
                                            }}
                                            className={`text-[10px] text-white font-mono break-all opacity-80 ${IPFSState?.recordData && "cursor-pointer"}`}
                                        >
                                            {IPFSState?.recordData || t("notConfigured")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showSetModel &&
                    <DomainSetModel
                        domainName={domainName}
                        newValue={newValue}
                        type={typeof newValue === 'number'? DomainSetType.Price : DomainSetType.Cid}
                        onClose={() => setShowSetModel(false)}
                        protocol={selectedProtocol}
                        lastSetter={IPFSState? IPFSState.setter:PublicKey.default}
                        ifInitIpfs={IPFSState===null? true:false}
                        lastVaule={IPFSState?.recordData ?? undefined}
                    />
                }
            </div>
        </div>  
    );
};

  export default DomainEditor;