import { Activity, RefreshCw } from "lucide-react";
import { useState } from "react";

const VaultLog = () => {

    const [logs, _] = useState<string[]>([
        "DISABLED"
    ]);

    return (
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black tracking-widest text-gray-400 uppercase flex items-center gap-2">
                    <Activity size={14} /> System Logs
                </h3>
                <RefreshCw size={14} className="text-gray-700 animate-spin-slow" />
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto max-h-[220px] scrollbar-hide">
                {logs.map((log, i) => (
                    <div key={i} className="text-[11px] font-mono text-gray-400 border-l border-[#B4FC75]/30 pl-3 py-1">
                        {log}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VaultLog;