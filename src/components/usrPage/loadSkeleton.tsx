import React from 'react';

const LoadSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pb-24 relative overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[30%] w-[400px] h-[400px] bg-[#B4FC75] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.08]"/>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-7 md:pt-12 relative z-10 flex flex-col gap-10 md:gap-16 mt-20">
                <section className="animate-fade-in-down">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8 pb-4 border-b border-white/10">
                        <div className="ml-3 md:ml-8 text-[12px] md:text-xl font-bold mb-2 md:mb-0 flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 animate-pulse" />
                            <div className="h-6 w-32 md:w-48 bg-white/10 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center text-[11px] md:text-sm font-mono text-gray-300 bg-[#111] px-4 py-2 rounded-lg border border-white/10">
                            <div className="w-4 h-4 bg-white/10 rounded mr-2 animate-pulse" />
                            <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
                        <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/10" />
                                <div className="h-4 w-16 bg-white/10 rounded" />
                            </div>
                            <div className="h-8 w-24 bg-white/10 rounded mb-2" />
                            <div className="h-4 w-32 bg-white/10 rounded" />
                        </div>

                        <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/10" />
                                <div className="h-4 w-16 bg-white/10 rounded" />
                            </div>
                            <div className="h-8 w-32 bg-white/10 rounded mb-2" />
                            <div className="h-4 w-40 bg-white/10 rounded" />
                        </div>

                        <div className="p-4 md:p-6 rounded-2xl border border-white/10 bg-white/[0.04] animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/10" />
                                <div className="h-4 w-16 bg-white/10 rounded" />
                            </div>
                            <div className="h-8 w-32 bg-white/10 rounded mb-2" />
                            <div className="h-4 w-40 bg-white/10 rounded" />
                        </div>
                    </div>
                </section>

                <section className="bg-[#111] border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl shadow-black/50">
                    <div className="flex border-b border-white/10 mb-4 md:mb-8">
                        {[1, 2].map((tab) => (
                            <div
                                key={tab}
                                className="py-2 md:py-3 px-3 md:px-6 text-[10px] md:text-lg font-semibold flex items-center gap-2"
                            >
                                <div className="w-4 h-4 md:w-5 md:h-5 bg-white/10 rounded animate-pulse" />
                                <div className="h-4 w-16 md:w-24 bg-white/10 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <div className="h-6 w-32 bg-white/10 rounded animate-pulse" />
                            </div>
                            
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="p-4 rounded-xl border border-white/10 bg-white/[0.04] animate-pulse">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="h-5 w-40 bg-white/10 rounded" />
                                        <div className="h-4 w-16 bg-white/10 rounded" />
                                    </div>
                                    <div className="h-4 w-64 bg-white/10 rounded mb-2" />
                                    <div className="h-3 w-48 bg-white/10 rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-4 pt-4">
                            <div className="h-8 w-20 bg-white/10 rounded-lg animate-pulse" />
                            <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
                            <div className="h-8 w-20 bg-white/10 rounded-lg animate-pulse" />
                        </div>

                        <div className="text-center pt-2 md:pt-8">
                            <div className="h-12 w-40 bg-white/10 rounded-xl mx-auto animate-pulse" />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="max-w-7xl mx-auto px-6 mt-20 border-t border-white/10 pt-8 text-gray-400 text-center text-sm font-normal">
                <p>Solana Web3 Domain Service © 2024. Dashboard Access.</p>
            </footer>
        </div>
    );
};

export default LoadSkeleton;