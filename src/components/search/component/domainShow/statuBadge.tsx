import { SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState";
import { Gavel, Lock, Sparkles, Tag } from "lucide-react";
import type { JSX } from "react";

// Define the type for each config item
type ConfigItem = {
    bg: string;
    text: string;
    label: string;
    icon: JSX.Element;
};

// Define the allowed keys
type DomainStatus = 0 | 1 | 2 | 3;

// Config object with explicit typing
const config: Record<DomainStatus, ConfigItem> = {
    0: {
        bg: "bg-[#B4FC75]",
        text: "text-black",
        label: "未初始化 / Available",
        icon: <Sparkles size={14} />,
    },
    1: {
        bg: "bg-[#8b5cf6]",
        text: "text-white",
        label: "拍卖进行中 / Live Auction",
        icon: <Gavel size={14} />,
    },
    2: {
        bg: "bg-[#eab308]",
        text: "text-black",
        label: "随时被结算 / Settling",
        icon: <Lock size={14} />,
    },
    3: {
        bg: "bg-[#f97316]",
        text: "text-white",
        label: "可购买 / Listed",
        icon: <Tag size={14} />,
    },
};

const StatusBadge = ({ status }: { status: SearchDomainResult | null }) => {
    if (status === null || status === SearchDomainResult.loading) {
        return (
            <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider overflow-hidden bg-zinc-800">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-24 h-3 rounded bg-white/30" />
            </div>
        );
    }

    // Ensure status is treated as DomainStatus
    if (!(status in config)) {
        return null; // 或者 fallback UI
    }

    const style = config[status as DomainStatus];

    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text}`}
        >
            {style.icon}
            {style.label}
        </div>
    );
};

export default StatusBadge;
