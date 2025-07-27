import { useEffect, useState } from "react";
import MessageBlcok, { type messageClass, MessageType } from "./messageBlcok";

import "@/style/components/auction/auctioningDomain/auctioningAnswer/auctioningAnswer.css"

export interface AuctioningAnswerProps {
    queryingDomain: string
}

const AuctioningAnswer: React.FC<AuctioningAnswerProps> = ({
    queryingDomain
}) => {
    const [usrAsk, setUsrAsk] = useState<messageClass>({
        message: "aa",
        messageType: MessageType.User
    })
    const [answer, setAnswer] = useState<messageClass>({
        message: "aa",
        messageType: MessageType.Computer
    })

    useEffect(() => {
        if(queryingDomain){
            const change = usrAsk
            change.message = queryingDomain;
            setUsrAsk(change)

            //change domain info check
        }
    }, [queryingDomain])

    return(
        <div className="auctionanswer">
            <MessageBlcok message={usrAsk} />
            <MessageBlcok message={answer} />
        </div>
    )
}

export default AuctioningAnswer;
