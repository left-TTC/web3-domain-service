
import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/domainAuctionStateShow.css"
import { useTranslation } from "react-i18next"

import rent from "@/assets/rent.svg"
import usr from "@/assets/usr-dhs.svg"

import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { useEffect, useState } from "react"
import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState"
import { cutDomain } from "@/utils/functional/common/cutDomain"
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey"
import { getHashedName } from "@/utils/functional/solana/getHashedName"
import { useConnection } from "@solana/wallet-adapter-react"
import { cutString } from "@/utils/functional/common/cutString"
import { DomainState, getDomainTimeState } from "@/utils/functional/common/time/getDomainTimeState"

export interface DomainAuctionStateShowProps{
    domainName: string,
    domainState: NameRecordState | null | undefined
}

const DomainAuctionStateShow: React.FC<DomainAuctionStateShowProps> = ({
    domainName, domainState
}) => {

    const {t} = useTranslation()

    const { connection } = useConnection()

    const [nameAuctionState, setNameAuctopnState] = useState<NameAuctionState | null>(null)
    const [ifAtAuction, setIfAtAuction] = useState(false)
    const [ifAuctionStateLoading, setIfAuctionStateLoading] = useState(false)
    const [hasFetched, setHasFetched] = useState(false)
    useEffect(() => {
        const fetchAuctionState = async() => {
            if(domainState && !hasFetched){
                setHasFetched(true)
                setIfAuctionStateLoading(true)
                const name = cutDomain(domainName)[0]
                const nameAuctionStateKey = getNameStateKey(
                    getHashedName(name), domainState.parentName
                )
                const auctionInfo = await connection.getAccountInfo(nameAuctionStateKey)
                if(auctionInfo){
                    const auctionState = new NameAuctionState(auctionInfo)
                    setNameAuctopnState(auctionState)
                    if(getDomainTimeState(auctionState) === DomainState.Auctioning){
                        setIfAtAuction(ifAtAuction)
                    }
                }
                setIfAuctionStateLoading(false)
            }
        }

        fetchAuctionState()
    }, [domainState])

    return(
        <div className="domainauctionstateshow">
            <h1>{t("auctionState")}</h1>
            <div className="auctionstateshowline" />
            <div className="rentpayer">
                <div className="renthead">
                    <img src={rent} className="rentimg" />
                </div>
                <div className="rentintroduce">
                    <h1>{t("rentpayer")}:</h1>
                </div>
            </div>
            <div className="auctionState">
                <div className="highestbid">
                    <h1>{t("highest")}:</h1>
                    {domainState? (
                        ifAtAuction?(
                            <h2>${(nameAuctionState!.highestPrice.toNumber()/1e6).toFixed(2)}</h2>
                        ):(
                            <h3>${(domainState!.customPrice.toNumber()/1e6).toFixed(2)}</h3>
                        )
                    ):(
                        <div className="highestload"/>
                    )}
                    <div className="priceline" />
                </div>
                <div className="bidderandconfirm">
                    {ifAuctionStateLoading? (
                        <div className="lodingbidder"/>
                    ):(
                        ifAtAuction&&nameAuctionState? (
                            <div className="statebiddershow">
                                <div className="statebidderkeyshow">
                                    <div className="bidderhead">
                                        <img src={usr} className="bidderheadimg" />
                                    </div>
                                    <div className="bidderandkey">
                                        <h1>{t("bidder")}:</h1>
                                        <a>{cutString(nameAuctionState.highestBidder.toBase58(), 5, 5, "...")}</a>
                                    </div>
                                </div>
                                <button className="addToMyfollow">
                                    <h1>{t("addfollow")}</h1>
                                </button>
                            </div>
                        ):(
                            <div className="statebiddershowno">
                                <h1>{t("notauction")}</h1>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default DomainAuctionStateShow;
