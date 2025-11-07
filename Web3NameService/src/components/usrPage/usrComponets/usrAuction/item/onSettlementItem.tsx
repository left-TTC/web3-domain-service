
import Identicon from "@/components/common/show/usr/identicon";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettleDomain from "../settlePage/settleDomain";

import "@/style/components/usrPage/usrComponents/usrAuction/item/settleItemDetail.css"


export interface OnSettlementItemProps {
    itemName: string
    settleState: NameAuctionState,
    ifCheckingOtherUsr: boolean,
}

const OnSettlementItem: React.FC<OnSettlementItemProps> = ({
    itemName, settleState, ifCheckingOtherUsr
}) => {

    const {t} = useTranslation()

    const [showSettleBlock, setShowSettleBlcok] = useState(false)

    return(
        <div className="onAuctionItem">
            <div className="itemheads">
                <div className="realheads">
                    <div className="head1">
                        <Identicon pubkey={itemName} />
                    </div>
                    <div className="itemdomainames">
                        <h1>{cutDomain(itemName)[0]}</h1>
                        <h2>.{cutDomain(itemName)[1]}</h2>
                    </div>
                </div>
                <div className="priceAndhighest">
                    <div className="auctionPrice">
                        <h1>{t("finalprice")}:</h1>
                        <h2>{(settleState.highestPrice.toNumber()/1e9).toFixed(4)} SOL</h2>
                    </div>
                </div>
            </div>
            
            <div className="itemauctionState">
                <button className={`settleBU ${ifCheckingOtherUsr && ""}`} onClick={() => setShowSettleBlcok(true)}>
                    <h1>settle</h1>
                </button>
            </div>
            <div className="itemline" />

            {showSettleBlock &&
                <SettleDomain
                    settleName={itemName}
                    settleInfo={settleState}
                    back={() => setShowSettleBlcok(false)}
                />
            }
        </div>
    )
}

export default OnSettlementItem;
