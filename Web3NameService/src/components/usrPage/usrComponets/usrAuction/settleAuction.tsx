import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";

import "@/style/components/usrPage/usrComponents/usrAuction/settleAuction.css"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import array from "@/assets/array.svg"

export interface SettleAuctionProps {
    settlingDomain: string[],
}

const SettleAuction: React.FC<SettleAuctionProps> = ({
    settlingDomain
}) => {

    const {t} = useTranslation()

    const [showTheBills, setShowTheBills] = useState(false)
    useEffect(() => {
        if(settlingDomain)setShowTheBills(true)
    }, [settlingDomain])

    return(
        <div className="settleauctionbl">
            <div className="showsettlebu">
                <h1>{t("settle")}</h1>
                <div className="numbershow">
                    <h1>({settlingDomain.length})</h1>
                    <img src={array} className="settlearray" />
                </div>
            </div>
            {showTheBills && 
                settlingDomain.map((billName, index) => (
                    <div className="AsettleBill" key={index}>
                        <div className="abill">
                            <h1>{billName}</h1>
                        </div>
                        <div className="billLine" />
                    </div>
                ))
            }
        </div>
    )
}

export default SettleAuction;
