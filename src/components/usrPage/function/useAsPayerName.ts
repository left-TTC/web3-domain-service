// import type { Connection, PublicKey } from "@solana/web3.js";
// import { useAtom } from "jotai";
// import { atomWithStorage } from "jotai/utils";
// import { useEffect } from "react";


// export const payerDomain = atomWithStorage<PublicKey[]>(
//     "DomainAsPayer",
//     []
// )

// export function useAsPayerName(
//     // connection: Connection,
//     usr: PublicKey | null,
// ){
//     const [asPayerDomain, setAsPayerDomain] = useAtom(payerDomain)
//         useEffect(() => {
//             const fetchMyAuctioningDomain = async() => {
//                 try{
                    
//                 }catch(err){
//                     console.log(err)
//                 }
//             }
    
//         fetchMyAuctioningDomain()
//     }, [usr])

//     return { asPayerDomain }
// }