import { X } from "lucide-react";
import { SettleType } from "../settlement";


interface SettleHeadProps {
    type: SettleType,
    onClose: () => void,
}

const SettleHead: React.FC<SettleHeadProps> = ({
    type, onClose
}) => {

    const getHeaderInfo = () => {
        switch (type) {
            case SettleType.STARTNAME: return { title: '启动竞拍', desc: 'Minting New Root Domain' };
            case SettleType.SETTLE: return { title: '结算', desc: 'Secondary Market Purchase' };
            default: return { title: '交易结算', desc: 'Transaction Settlement' };
        }
    };

    const header = getHeaderInfo();

    return(
        <div className="px-8 py-2 md:py-6 border-b border-white/5 flex justify-between items-start">
            <div>
                <h2 className="text-[13px] md:text-xl font-bold text-white flex items-center gap-2">
                    {header.title}
                </h2>
                <p className="text-[10px] md:text-xs text-gray-500 font-mono mt-1 uppercase tracking-wider">{header.desc}</p>
            </div>
            <button 
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
                <X size={20} />
            </button>
        </div>
    )
}

export default SettleHead;
