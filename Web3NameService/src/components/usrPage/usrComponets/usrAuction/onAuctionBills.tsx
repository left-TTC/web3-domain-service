import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrAuction/onAuctionBills.css"
import array from "@/assets/array.svg"
import { useEffect, useState } from "react";
import OnAuctionItem from "./item/onAuctionItem";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";

export interface OnAuctionBillsProps {
    onAuctionBills: Map<string, NameAuctionState | null> | null,
}

const OnAuctionBills: React.FC<OnAuctionBillsProps> = ({
    onAuctionBills
}) => {

    const {t} = useTranslation()

    const [showTheBills, setShowTheBills] = useState(false)
    const [billsName, setBillsName] = useState<string[]>([])
    useEffect(() => {
        if(onAuctionBills){
            setShowTheBills(true)
            const onAuctionDomains = Array.from(onAuctionBills.keys());
            setBillsName(onAuctionDomains)
        }
    }, [onAuctionBills])

    return(
        <div className="onAuctionBills">
            <div className="showsettlebu">
                <h1>{t("onauction")}</h1>
                <div className="numbershow">
                    <h1>({billsName.length})</h1>
                    <img src={array} className="settlearray" />
                </div>
            </div>
            {showTheBills ? 
                (billsName.map((billName, _) => (
                    <OnAuctionItem itemName={billName} auctionState={onAuctionBills!.get(billName)!}/>
                ))) : (
                    <div className="onAuctionItem">

                    </div>
                )
            }
        </div>
    )
}

export default OnAuctionBills;
