import { Globe, Settings } from "lucide-react"


interface DomainItemProps {
    domainName: string,
    ipfs: string
}

const primaryColor = '#B4FC75'; 

const DomainItem: React.FC<DomainItemProps> = ({
    domainName, ipfs
}) => {



    return(
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10 hover:border-[#B4FC75]/50 transition-colors">
            <div className="flex items-center gap-4">
                <Globe size={24} style={{ color: primaryColor }} />
                <div>
                    <p className="text-xl font-bold text-white">{domainName}</p>
                    <p className="text-xs text-gray-400 font-mono mt-1 font-normal">
                        记录: <span className="text-gray-300">{ipfs}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="px-3 py-1.5 rounded-full text-black text-sm font-bold flex items-center gap-1 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: primaryColor }}
                >
                    管理 <Settings size={14} />
                </button>
            </div>
        </div>
    )
}

export default DomainItem;
