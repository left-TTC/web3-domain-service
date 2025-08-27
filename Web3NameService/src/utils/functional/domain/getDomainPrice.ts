import { MainFint, OtherFint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import type { Connection } from "@solana/web3.js";
import { getDomainUSDPrice } from "./getDomainUSDPrice";
import { 
    PythConnection, 
    PythHttpClient, 
    getPythProgramKeyForCluster, 
    type PythCluster 
} from "@pythnetwork/client";

export async function getDomainPrice(
    domainPriceUsd: number,
    connection: Connection,
): Promise<Map<MainFint | OtherFint, number>> {

    const result = new Map<MainFint | OtherFint, number>();

    result.set(MainFint.USDC, domainPriceUsd);
    result.set(MainFint.USDT, domainPriceUsd);

    const cluster: PythCluster = "devnet";
    const pythProgramKey = getPythProgramKeyForCluster(cluster);
    const pythClient = new PythHttpClient(connection, pythProgramKey);

    const data = await pythClient.getData();

    const wantedMap: Record<string, MainFint | OtherFint> = {
        "Crypto.SOL/USD": MainFint.SOL,
    };

    for (const [sym, fint] of Object.entries(wantedMap)) {
        let priceObj = data.productPrice.get(sym);

        if (!priceObj) {
            priceObj = data.productPrice.get(sym.replace(/^Crypto\./, ""));
        }

        if (!priceObj) {
            for (const [k, v] of data.productPrice.entries()) {
                if (k.endsWith(sym) || k.endsWith(sym.replace(/^Crypto\./, ""))) {
                    priceObj = v;
                    break;
                }
            }
        }

        if (priceObj) {
            const tokenPrice =
                typeof priceObj.price === "number"
                    ? priceObj.price
                    : priceObj.aggregate?.price;

            if (typeof tokenPrice === "number" && tokenPrice > 0) {
                const domainPriceInToken = domainPriceUsd / tokenPrice;
                if (isFinite(domainPriceInToken)) {
                    result.set(fint, domainPriceInToken);
                }
            } else {
                console.warn(`⚠️ Invalid price for ${sym}:`, tokenPrice);
            }
        } else {
            console.warn(`⚠️ No price data found for ${sym}`);
        }
    }

    return result;
}
