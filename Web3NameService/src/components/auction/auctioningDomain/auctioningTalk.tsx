import MessageBlcok, { MessageType, type messageClass } from "@/components/auction/auctioningDomain/auctioningAnswer/messageBlcok"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"


import "@/style/components/auction/auctioningDomain/auctioningTalk.css"
import { animate } from "animejs"
import AuctioningAnswer from "./auctioningAnswer/auctioningAnswer"

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
    const [ifHandleMessage, setIfHandleMessage] = useState(false)
    const [ifShowAuctioningAnswer, setIfShowAuctioningAnswer] = useState(false)
    const [ifInputOnFucus, setIfInputOnFocus] = useState(false)

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(e.target.value)
    }

    const commonMessage = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(ifHandleMessage){
            if(!commonMessage.current)return
            animate(commonMessage.current, {
                translateY: [0, -380],
                duration: 500,
                onComplete: () => {
                    setIfHandleMessage(false)
                    setIfShowAuctioningAnswer(true)
                }
            })
        }
    }, [ifHandleMessage])

    return(
        <div className="auctionphone">
            <div className="phoneplace">
                <div className="phoneBar">
                    <h1>{t("messagename")}</h1>
                </div>
                {!ifShowAuctioningAnswer ?
                (
                    <div className="messageBlcok" ref={commonMessage}>
                        <MessageBlcok message={one} />
                        <MessageBlcok message={two} />
                        <MessageBlcok message={three} />
                        <MessageBlcok message={four} />
                    </div>
                ):(
                    <AuctioningAnswer queryingDomain={queryingDomain}/>
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
                    <button className="sendbutton pixel" onClick={() => setIfHandleMessage(true)}>
                        send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuctioningTalk;