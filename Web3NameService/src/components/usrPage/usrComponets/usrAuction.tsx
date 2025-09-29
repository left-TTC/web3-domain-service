
import "@/style/components/usrPage/usrComponents/usrAuction.css"
import { useTranslation } from "react-i18next";
import SettleAuction from "./usrAuction/settleAuction";
import OnAuctionBills from "./usrAuction/onAuctionBills";
import { useEffect, useState } from "react";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { getAuctionItemInfo } from "./usrAuction/function/getAuctionItemInfo";
import { useConnection } from "@solana/wallet-adapter-react";

export interface UsrAuctionProps {
    allAuctionName: string[]
}

const UsrAuction: React.FC<UsrAuctionProps> = ({
    allAuctionName
}) => {

    const {t} = useTranslation()
    const {connection} = useConnection()

    const [settleMap, setSettleMap] = useState<Map<string, NameAuctionState | null> | null>(null)
    const [onAuctionMap, setOnAuctionMap] = useState<Map<string, NameAuctionState | null> | null>(null)

    useEffect(() => {
        const fetchMaps = async() => {
            const infoMaps = await getAuctionItemInfo(
                connection, allAuctionName
            )
            setOnAuctionMap(infoMaps[0])
            setSettleMap(infoMaps[1])
        }

        fetchMaps()
    }, [])

    return(
        <div className="usrAuction">
            <div className="usrAuction">
                <h1>{t("myauction")}</h1>
            </div>
            <div className="linedomain" />
            <SettleAuction settlingDomain={[]} />
            <OnAuctionBills onAuctionBills={onAuctionMap}/>
        </div>
    )
}

export default UsrAuction;
