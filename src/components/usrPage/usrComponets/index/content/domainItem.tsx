import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { Globe, Settings } from "lucide-react"
import { useState } from "react";
import DomainEditor from "./domainEditor";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";


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

    const ifMd = window.innerWidth >= 768;

    console.log("kilo root:", getNameAccountKey(getHashedName("kilo")).toBase58())
    console.log("test3.kilo: ", getNameAccountKey(getHashedName("test3"), null, getNameAccountKey(getHashedName("kilo"))).toBase58())

    return(
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10 hover:border-[#B4FC75]/50 transition-colors">
            <div className="flex items-center gap-4">
                <Globe 
                    onClick={() => {
                        if(nameState){
                            console.log("=== NameRecordState ===");
                            console.log("parentName:", nameState.parentName.toBase58());
                            console.log("owner:", nameState.owner.toBase58());
                            console.log("class:", nameState.class.toBase58());
                            console.log("previewer:", nameState.previewer.toBase58());
                            console.log("isFrozen:", nameState.isFrozen);
                            console.log("customPrice:", nameState.customPrice.toString());
                        }
                        if(ipfsState){
                            console.log("=== IPFSRecordState ===");
                            console.log("parentName:", ipfsState.parentName.toBase58());
                            console.log("owner:", ipfsState.owner.toBase58());
                            console.log("class:", ipfsState.class.toBase58());
                            console.log("previewer:", ipfsState.previewer.toBase58());
                            console.log("isFrozen:", ipfsState.isFrozen);
                            console.log("customPrice:", ipfsState.updataTime.toString());
                            console.log("recordType:", ipfsState.recordType);
                            console.log("setter:", ipfsState.setter.toBase58());
                            console.log("recordData:", ipfsState.recordData);
                            console.log("length:", ipfsState.length);
                        }
                    }}
                    size={ifMd? 24:15} style={{ color: primaryColor }} />
                <div>
                    <p className="text-[13px] md:text-xl font-bold">{domainName}</p>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400 uppercase">
                            {ipfsState?.recordType ?? ""}
                        </span>
                        <p className="text-[11px] text-gray-500 font-mono truncate max-w-[150px] hidden md:flex">
                            {ipfsState?.recordData ?? "未设置"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button 
                    onClick={() => setShowEditor(true)}
                    className="px-4 sm:px-3 py-2 sm:py-1.5 rounded-full text-black text-[11px] sm:text-sm font-bold flex items-center gap-1 hover:opacity-90 transition-opacity"
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
