import { Loader2 } from "lucide-react";

const Loading = () => {
    
    return(
        <div className="bg-[#B4FC75]/10 border border-[#B4FC75]/20 rounded-xl p-6 flex items-center justify-center">
            <Loader2
                className="w-6 h-6 text-[#B4FC75] animate-spin"
                strokeWidth={2.5}
            />
        </div>
    )
}

export default Loading;
