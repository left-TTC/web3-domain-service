import { TrendingUp } from "lucide-react";




export function StateCard({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="p-4 bg-black/30 rounded-lg border border-white/10 shadow-lg">
        <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-extrabold font-mono" style={{ color: color }}>{value}</p>
        <div className="flex items-center text-xs mt-2 text-green-400">
            <TrendingUp size={14} /> 
            <span className="ml-1">+15% (24h)</span>
        </div>
        </div>
    );
}