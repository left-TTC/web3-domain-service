

export function StateCard({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="p-4 bg-black/30 rounded-lg border border-white/10 shadow-lg">
            <p className="text-[11px] md:text-[13px] uppercase font-normal tracking-wider text-gray-500 mb-1">{label}</p>
            <p className="text-[15px] md:text-[19px] font-extrabold font-mono" style={{ color: color }}>{value}</p>
        </div>
    );
}