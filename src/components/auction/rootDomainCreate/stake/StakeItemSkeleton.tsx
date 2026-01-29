

const StakeItemSkeleton = () => {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse">
            <div className="h-5 w-32 bg-white/10 rounded mb-4" />
            <div className="h-4 w-24 bg-white/10 rounded mb-6" />

            <div className="h-2 w-full bg-white/10 rounded mb-4" />

            <div className="flex justify-between mb-6">
                <div className="h-3 w-12 bg-white/10 rounded" />
                <div className="h-3 w-16 bg-white/10 rounded" />
            </div>

            <div className="h-10 w-full bg-white/10 rounded-xl" />
        </div>
    );
};

export default StakeItemSkeleton;
