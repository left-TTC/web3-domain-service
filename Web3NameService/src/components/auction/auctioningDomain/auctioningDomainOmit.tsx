

import "@/style/components/auction/auctioningDomain/auctioningDomainOmit.css"


import mushroom from "@/assets/mushroomgreen.svg"
import { useTranslation } from "react-i18next"
import MessageBlcok, { MessageType, type messageClass } from "./messageBlcok"
import { useState } from "react"

const AuctioningDomainOmit = () => {

    const {t} = useTranslation()

    const [phoneValue, setPhoneValue] = useState("")

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(e.target.value)
    }

    const one: messageClass = {
        message: t("bought") + " 😭😭",
        messageType: MessageType.User,
    }
    const two: messageClass = {
        message: t("sad") + " 😭",
        messageType: MessageType.User,
    }
    const three: messageClass = {
        message: t("tryauction") ,
        messageType: MessageType.Computer,
    }

    return(
        <div className="auctiondomainomit">
            <div className="auctionphone">
                <div className="phoneplace">
                    <div className="phoneBar">
                        <h1>{t("messagename")}</h1>
                    </div>
                    <div className="messageBlcok">
                        <MessageBlcok message={one} />
                        <MessageBlcok message={two} />
                        <MessageBlcok message={three} />
                    </div>
                    <div className="phoneinput">
                        <input
                            type="text"
                            placeholder={`Check Domain`}
                            value={phoneValue}
                            onChange={handDomainInput}
                            className="phoneinputbar"
                        />
                        <button className="sendbutton pixel">
                            send
                        </button>
                    </div>
                </div>
            </div>
            <div className="gotoauction">
                <h1>{t("auctionhouse")}</h1>
                <button className="gotoauctionbutton pixel">
                    <h1>{t("trynow")}</h1>
                </button>
            </div>
        </div>
    )
}

export default AuctioningDomainOmit;