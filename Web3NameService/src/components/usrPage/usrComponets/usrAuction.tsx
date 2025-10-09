
import "@/style/components/usrPage/usrComponents/usrAuction.css"
import { useTranslation } from "react-i18next";
import SettleAuction from "./usrAuction/settleAuction";
import OnAuctionBills from "./usrAuction/onAuctionBills";
import { useEffect, useRef, useState } from "react";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { getAuctionItemInfo } from "./usrAuction/function/tool/getAuctionItemInfo";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";

export interface UsrAuctionProps {
    allAuctionName: string[]
}

const UsrAuction: React.FC<UsrAuctionProps> = ({
    allAuctionName
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()
    const {publicKey: usr} = useWalletEnv()

    const [settleMap, setSettleMap] = useState<Map<string, NameAuctionState | null> | null>(null)
    const [onAuctionMap, setOnAuctionMap] = useState<Map<string, NameAuctionState | null> | null>(null)

    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchMaps = async() => {
            if(!usr || !hasFetched)return
            hasFetched.current = true
            const infoMaps = await getAuctionItemInfo(
                connection, allAuctionName, usr
            )
            setOnAuctionMap(infoMaps[0])
            setSettleMap(infoMaps[1])
        }

        if(usr)fetchMaps()
    }, [usr])

    return(
        <div className="usrAuction">
            <div className="usrAuction">
                <h1>{t("myauction")}</h1>
            </div>
            <div className="linedomain" />
            <SettleAuction settlingDomain={settleMap} />
            <OnAuctionBills onAuctionBills={onAuctionMap}/>
        </div>
    )
}

export default UsrAuction;
