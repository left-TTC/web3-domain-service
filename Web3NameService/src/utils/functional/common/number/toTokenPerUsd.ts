import type { SupportedMint } from "@/provider/priceProvider/priceProvider";


// returm => 1usd === ? sol(not the lamports)

export function toTokenPerUsd(
    price: Map<SupportedMint, bigint>,
    expo: Map<SupportedMint, number> ,
    mint: SupportedMint,
): number {
    
    const expos = expo.get(mint);
    if (!expos) return 0

    const normalizedPrice = Number(price.get(mint)) * Math.pow(10, expos);

    if (normalizedPrice <= 0) {
        throw new Error("Invalid price data");
    }

    return 1 / normalizedPrice;
}