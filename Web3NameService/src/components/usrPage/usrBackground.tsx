import "@/style/components/usrPage/usrBackground.css"
import SearchYourFrist from "./usrBack/searchYourFrist";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { findUsrBiddingDomain } from "@/utils/net/findUsrBiddingDomain";
import { useConnection } from "@solana/wallet-adapter-react";
import UsrIndex from "./usrBack/usrIndex";
import ConnectWalletFrist from "./usrBack/connectWallet";
import { PublicKey } from "@solana/web3.js";
import { useAuctioningDomain } from "./function/useAuctioningDomain";
import { useAsPayerName } from "./function/useAsPayerName";


export interface UsrBackgroundProps{
    domainNumber: number,
    openDomainQueryPage: () => void,
}


export const payerRootDomain = atomWithStorage<PublicKey[]>(
    "DomainAsPayer",
    []
)

const UsrBackground: React.FC<UsrBackgroundProps> = ({
    domainNumber, openDomainQueryPage
}) => {

    const {publicKey: usr} = useWalletEnv()
    const {connection} = useConnection()

    const { auctioningDomain } = useAuctioningDomain(connection, usr)
    const { asPayerDomain } = useAsPayerName(connection, usr)

    return(
        <div className="usrback">
            {usr? (
                (domainNumber === 1 && !auctioningDomain && !asPayerDomain)? (
                    <SearchYourFrist openDomainQueryPage={openDomainQueryPage}/>
                ):(
                    <UsrIndex usr={usr}/>
                )
            ):(
                <ConnectWalletFrist />
            )}
        </div>
    )
}

export default UsrBackground;
