import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";

import "@/style/components/usrPage/usrComponents/usrAuction/settleAuction.css"
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import array from "@/assets/array.svg"
import OnSettlementItem from "./item/onSettlementItem";
import { useAnimateItem } from "./function/useAnimateItem";

export interface SettleAuctionProps {
    settlingDomain: Map<string, NameAuctionState | null> | null,
    ifCheckingOtherUsr: boolean,
}

const SettleAuction: React.FC<SettleAuctionProps> = ({
    settlingDomain, ifCheckingOtherUsr
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

    const itemsRef = useRef<HTMLDivElement | null>(null)
    const arrowRef = useRef<HTMLImageElement | null>(null)
    const { clinckSettle } = useAnimateItem(showTheBills, setShowTheBills, itemsRef, arrowRef)

    return(
        <div className="settleauctionbl">
            <div className="showsettlebu" onClick={() => clinckSettle()}>
                <h1>{t("settle")}</h1>
                <div className="numbershow">
                    <h1>({billsName.length})</h1>
                    <img src={array} className="settlearray" ref={arrowRef}/>
                </div>
            </div>
            {showTheBills ? 
                (
                    <div className="settleitemshow" ref={itemsRef}>
                        {billsName.map((billName, index) => (
                            <OnSettlementItem 
                                key={index}
                                itemName={"test.domain"} 
                                settleState={settlingDomain!.get(billName)!}
                                ifCheckingOtherUsr={ifCheckingOtherUsr}
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

export default SettleAuction;
