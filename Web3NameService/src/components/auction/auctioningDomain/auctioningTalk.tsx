import MessageBlcok, { MessageType, type messageClass } from "@/components/auction/auctioningDomain/messageBlcok"
import { useState } from "react"
import { useTranslation } from "react-i18next"


import "@/style/components/auction/auctioningDomain/auctioningTalk.css"

export interface AuctioningTalkProps {

}

const AuctioningTalk: React.FC<AuctioningTalkProps> = ({

}) => {

    const {t} = useTranslation()

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
    const four: messageClass = {
        message: t("ihelpyou"),
        messageType: MessageType.Computer,
    }

    const [phoneValue, setPhoneValue] = useState("")
    const [queryingDomain, setQueryingDomain] = useState("")
    const [ifInputOnFucus, setIfInputOnFocus] = useState(false)

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(e.target.value)
    }

    return(
        <div className="auctionphone">
            <div className="phoneplace">
                <div className="phoneBar">
                    <h1>{t("messagename")}</h1>
                </div>
                {(queryingDomain === "") ?
                (
                    <div className="messageBlcok">
                        <MessageBlcok message={one} />
                        <MessageBlcok message={two} />
                        <MessageBlcok message={three} />
                        <MessageBlcok message={four} />
                    </div>
                ):(
                    <div ></div>
                )}
                <div className="phoneinput">
                    <input
                        type="text"
                        placeholder={`Check Domain`}
                        value={phoneValue}
                        onChange={handDomainInput}
                        className="phoneinputbar"
                        onFocus={() => setIfInputOnFocus(true)}
                        onBlur={() => setIfInputOnFocus(false)}
                    />
                    <button className="sendbutton pixel">
                        send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuctioningTalk;