import TimeClock from "@/components/common/show/timeClock";
import Identicon from "@/components/common/show/usr/identicon";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import IncreasePrice from "../increasePrice";


export interface OnAuctionItemProps {
    itemName: string,
    auctionState: NameAuctionState
}

const OnAuctionItem: React.FC<OnAuctionItemProps> = ({
    itemName, auctionState
}) => {

    const {t} = useTranslation()

    const [showIncreaseBlock, setShowIncreaseBlock] = useState(false)

    return(
        <div className="onAuctionItem">
            <div className="itemhead">
                <div className="head1">
                    <Identicon pubkey={itemName} />
                </div>
                <div className="itemdomainame">
                    <h1>{cutDomain(itemName)[0]}</h1>
                    <h2>.{cutDomain(itemName)[1]}</h2>
                </div>
            </div>
            <div className="priceAndhighest">
                <div className="auctionPrice">
                    <h1>{t("currentprice")}:</h1>
                    <h2>$ {(auctionState.highestPrice.toNumber()/1e6).toFixed(2)}</h2>
                </div>
                <div className="biddershow">
                    <h1>{t("highestbidder")}:</h1>
                    <h2>{auctionState.highestBidder.toBase58()}</h2>
                </div>
            </div>
            <div className="auctionState">
                <div className="timeshow">
                    <h2 className="settlememtin">{t("settlememtin")}:</h2>
                    <TimeClock target={auctionState!.updateTime.toNumber() + 4800} />
                </div>
                <button className="increaseBU" onClick={() => setShowIncreaseBlock(true)}>
                    <h1>increase</h1>
                </button>
            </div>
            <div className="itemline" />

            {showIncreaseBlock &&
                <IncreasePrice 
                    addName={itemName} 
                    addInfo={auctionState} 
                    back={() => setShowIncreaseBlock(false)}
                />
            }
        </div>
    )
}

export default OnAuctionItem;
