import { useState } from "react";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useAtom } from "jotai";
import { addressStringListAtom } from "@/utils/functional/common/storage/storageStarDomain";

export function useStarDomains() {
    const { publicKey: wallet } = useWalletEnv();
    const walletAddress = wallet?.toBase58();

    const [tempDomains, setTempDomains] = useState<string[]>([]);
    const [atomDomains, setAtomDomains] = useAtom(addressStringListAtom(walletAddress || "guest"));

    const isWalletConnected = !!walletAddress;
    const [starDomains, setStarDomains] = isWalletConnected
        ? [atomDomains, setAtomDomains]
        : [tempDomains, setTempDomains];

    return { starDomains, setStarDomains, walletAddress };
}
