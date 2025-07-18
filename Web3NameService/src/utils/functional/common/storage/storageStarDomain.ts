
import { atomFamily, atomWithStorage } from "jotai/utils";



export const addressStringListAtom = atomFamily((walletAddress: string) => 
    atomWithStorage<string[]>(`domainStar-${walletAddress}`, [])
);



