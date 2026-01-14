import { create } from "zustand";

export interface RecommendDomainData {
    recommendDomainAndInfoMap: Map<string, number> | null;
    ifDomainGenerated: boolean;
    checkingRoot: string;
    lastRoot: string;
    needDomainLength: number;
    mustConatData: string
}

interface AuctionStore {
    data: RecommendDomainData;
    setData: (partial: Partial<RecommendDomainData>) => void;
}

export const useAuctionStore = create<AuctionStore>((set) => ({
    data: {
        recommendDomainAndInfoMap: null,
        ifDomainGenerated: false,
        checkingRoot: "",
        lastRoot: "",
        needDomainLength: 3,
        mustConatData: ""
    },
    setData: (partial) =>
        set((state) => ({ data: { ...state.data, ...partial } })),
}));
