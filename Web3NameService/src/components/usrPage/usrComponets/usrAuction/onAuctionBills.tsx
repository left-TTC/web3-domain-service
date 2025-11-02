import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrAuction/item/onAuctionBills.css"
import array from "@/assets/array.svg"
import { useEffect, useRef, useState } from "react";
import OnAuctionItem from "./item/onAuctionItem";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useAnimateItem } from "./function/useAnimateItem";

export interface OnAuctionBillsProps {
    onAuctionBills: Map<string, NameAuctionState | null> | null,
}

const OnAuctionBills: React.FC<OnAuctionBillsProps> = ({
    onAuctionBills
}) => {

    const {t} = useTranslation()

    // origin false
    const [showTheBills, setShowTheBills] = useState(true)
    const [billsName, setBillsName] = useState<string[]>([])
    useEffect(() => {
        if(onAuctionBills){
            setShowTheBills(true)
            const onAuctionDomains = Array.from(onAuctionBills.keys());
            setBillsName(onAuctionDomains)
        }
    }, [onAuctionBills])

    const itemsRef = useRef<HTMLDivElement | null>(null)
    const arrowRef = useRef<HTMLImageElement | null>(null)
    const { clinckSettle } = useAnimateItem(showTheBills, setShowTheBills, itemsRef, arrowRef)

    return(
        <div className="onAuctionBills">
            <div className="showsettlebu"  onClick={() => clinckSettle()}>
                <h1>{t("onauction")}</h1>
                <div className="numbershow">
                    <h1>({billsName.length})</h1>
                    <img src={array} className="settlearray" ref={arrowRef}/>
                </div>
            </div>
            {showTheBills ? 
                (
                    <div className="settleitemshow" ref={itemsRef}>
                        {billsName.map((billName, index) => (
                            <OnAuctionItem
                                key={index} 
                                itemName={"test.domain"} 
                                auctionState={onAuctionBills!.get(billName)!}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="onAuctionItem" />
                )
            }
        </div>
    )
}

export default OnAuctionBills;
