

interface UsrStateCardProps {
    icon: React.ComponentType<{ size?: number; color?: string }>;
    label: string;
    canClink: boolean;
    value?: string | number;
    extraValue?: string | number;
    clinck?: () => void
}

const primaryColor = '#B4FC75'; 

export const UsrStateCard: React.FC<UsrStateCardProps> = ({
    icon: Icon, label, value, clinck, canClink, extraValue
}) => {
    return (
        <div 
            onClick={() => {clinck? clinck(): {}}}
            className={`bg-black/30 border-2 border-white/10 rounded-xl p-3 md:p-5 transition-all duration-300 hover:border-[#B4FC75]/50 hover:shadow-[0_0_15px_rgba(180,252,117,0.1)] ${canClink && "cursor-pointer"}`}
        >
            <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] md:text-sm uppercase tracking-wider text-gray-300 font-normal">{label}</p>
                <Icon size={20} color={primaryColor} />
            </div>

            {value && (
            <div className="mb-1 flex flex-row items-baseline gap-5">
                <p className="text-[15px] md:text-3xl font-extrabold font-mono text-white">
                    {value}
                </p>
                {extraValue && (
                    <p className="text-[13px] md:text-1.5xl text-[#B4FC75]">
                        - {extraValue}
                    </p>
                )}
            </div>
            )}
        </div>
    );
};