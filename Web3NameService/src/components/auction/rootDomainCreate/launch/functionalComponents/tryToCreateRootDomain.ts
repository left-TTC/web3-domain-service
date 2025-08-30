import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import { useConnection } from "@solana/wallet-adapter-react";



export function tryToCreateRootDomain(
    rootDomainName: string
) {
    const solanaToast = useSolanaToast()
    const {connectrion} = useConnection()
}