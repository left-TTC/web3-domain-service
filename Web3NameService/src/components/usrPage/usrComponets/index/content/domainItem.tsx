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
                    <p className="text-xl font-bold text-white">{domainName}</p>
                    <p className="text-xs text-gray-400 font-mono mt-1 font-normal">
                        记录: <span className="text-gray-300">{ipfsState? (ipfsState.recordData? ipfsState.recordData : "未设置") : "未设置"}</span>
                    </p>
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
