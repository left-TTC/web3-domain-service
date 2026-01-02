import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { Globe, Settings } from "lucide-react"
import { useState } from "react";
import DomainEditor from "./domainEditor";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";


interface DomainItemProps {
    domainName: string,
    ipfsState: IPFSRecordState | null,
    nameState: NameRecordState | null,
}

const primaryColor = '#B4FC75'; 

const DomainItem: React.FC<DomainItemProps> = ({
    domainName, ipfsState, nameState
}) => {

    const [showEditor, setShowEditor] = useState(false)

    return(
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10 hover:border-[#B4FC75]/50 transition-colors">
            <div className="flex items-center gap-4">
                <Globe size={24} style={{ color: primaryColor }} />
                <div>
                    <p className="text-xl font-bold">{domainName}</p>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400 uppercase">
                            {ipfsState?.type ?? ""}
                        </span>
                        <p className="text-[11px] text-gray-500 font-mono truncate max-w-[150px]">
                            {ipfsState?.recordData ?? "未设置"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button 
                    onClick={() => setShowEditor(true)}
                    className="px-3 py-1.5 rounded-full text-black text-sm font-bold flex items-center gap-1 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: primaryColor }}
                >
                    管理 <Settings size={14} />
                </button>
            </div>

            {showEditor && 
                <DomainEditor
                    domainName={domainName}
                    IPFSState={ipfsState}
                    nameState={nameState}
                    closeFn={() => setShowEditor(false)}
                />
            }
        </div>
    )
}

export default DomainItem;
