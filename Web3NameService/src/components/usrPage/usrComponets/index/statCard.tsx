

interface UsrStateCardProps {
    icon: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
    value: string | number;
    clinck?: () => void
}

const primaryColor = '#B4FC75'; 

export const UsrStateCard: React.FC<UsrStateCardProps> = ({
    icon: Icon, label, value, clinck
}) => {
    return (
        <div 
            onClick={() => {clinck? clinck(): {}}}
            className="bg-black/30 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-[#B4FC75]/50 hover:shadow-[0_0_15px_rgba(180,252,117,0.1)]">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm uppercase tracking-wider text-gray-500">{label}</p>
                <Icon size={20} color={primaryColor} />
            </div>

            <p className="text-3xl font-extrabold font-mono text-white mb-1">{value}</p>
        </div>
    );
};