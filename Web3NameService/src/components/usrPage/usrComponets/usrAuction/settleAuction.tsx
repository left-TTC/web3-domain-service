import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";

import "@/style/components/usrPage/usrComponents/usrAuction/settleAuction.css"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import array from "@/assets/array.svg"
import { PublicKey } from "@solana/web3.js";
import { Numberu64 } from "@/utils/functional/common/number/number64";
import OnSettlementItem from "./item/onSettlementItem";

export interface SettleAuctionProps {
    settlingDomain: Map<string, NameAuctionState | null> | null,
}

const SettleAuction: React.FC<SettleAuctionProps> = ({
    settlingDomain
}) => {

    const {t} = useTranslation()

    const [showTheBills, setShowTheBills] = useState(true)
    const [billsName, setBillsName] = useState<string[]>([])
    useEffect(() => {
    
        if(settlingDomain){
            setShowTheBills(true)
            const onSettleDomains = Array.from(settlingDomain.keys())
            setBillsName(onSettleDomains)
        }
    }, [settlingDomain])

    const a: NameAuctionState = {
        highestBidder: new PublicKey("DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx"),
        rentPayer: new PublicKey("DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx"),
        updateTime: new Numberu64(Date.now() - 4800),
        highestPrice: new Numberu64(199999999),
    }

    return(
        <div className="settleauctionbl">
            <div className="showsettlebu">
                <h1>{t("settle")}</h1>
                <div className="numbershow">
                    <h1>({billsName.length})</h1>
                    <img src={array} className="settlearray" />
                </div>
            </div>
            {showTheBills && 
                <OnSettlementItem
                    test={a}
                />
            }
        </div>
    )
}

export default SettleAuction;
