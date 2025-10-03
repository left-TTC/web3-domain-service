import TimeClock from "@/components/common/show/timeClock";
import Identicon from "@/components/common/show/usr/identicon";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettleDomain from "../settleDomain";


export interface OnSettlementItemProps {
    test: NameAuctionState
}

const OnSettlementItem: React.FC<OnSettlementItemProps> = ({
    test, 
}) => {

    const a: string = "aaa.web3"

    const {t} = useTranslation()

    const [showSettleBlock, setShowSettleBlcok] = useState(false)

    return(
        <div className="onAuctionItem">
            <div className="itemhead">
                <div className="head1">
                    <Identicon pubkey={a} />
                </div>
                <div className="itemdomainame">
                    <h1>{cutDomain(a)[0]}</h1>
                    <h2>.{cutDomain(a)[1]}</h2>
                </div>
            </div>
            <div className="priceAndhighest">
                <div className="auctionPrice">
                    <h1>{t("finalprice")}:</h1>
                    <h2>$ {(test.highestPrice.toNumber()/1e6).toFixed(2)}</h2>
                </div>
            </div>
            <div className="auctionState">
                <div className="timeshow">
                    <h2 className="settlememtin">{t("endin")}:</h2>
                    <TimeClock target={test!.updateTime.toNumber() + 2400} />
                </div>
                <button className="settleBU" onClick={() => setShowSettleBlcok(true)}>
                    <h1>settle</h1>
                </button>
            </div>
            <div className="itemline" />

            {showSettleBlock &&
                <SettleDomain
                    settleName="aaa.web3"
                    settleInfo={test}
                    back={() => setShowSettleBlcok(false)}
                />
            }
        </div>
    )
}

export default OnSettlementItem;
