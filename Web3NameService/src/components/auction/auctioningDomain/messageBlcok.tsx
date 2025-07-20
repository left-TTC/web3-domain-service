
import "@/style/components/auction/auctioningDomain/messageBlock.css"

import computerIcon from "@/../public/background/head/dog.png"

export interface messageBlcokProps{
    message: messageClass
}

export enum MessageType {
    Computer,
    User,
}

export interface messageClass {
    messageType: MessageType,
    message: string,
}


const MessageBlcok: React.FC<messageBlcokProps> = ({message}) => {

    const isComputer = (type: MessageType) => type === MessageType.Computer

    const AInfo = (
        isComputer(message.messageType)? 
        (
            <div className="messageblock messageleft">
                <div className="usricon">
                    <img src={isComputer(message.messageType)? computerIcon : computerIcon} style={{width:'40px'}}/>
                </div>
                <div className="usrmessage">
                    <h1>{message.message}</h1>
                </div>
            </div>
        ):
        (
            <div className="messageblock messageright">
                <div className="usrmessage">
                    <h1>{message.message}</h1>
                </div>
                <div className="usricon">
                    <img src={isComputer(message.messageType)? computerIcon : computerIcon} style={{width:'40px'}}/>
                </div>
            </div>
        )
    )

    return(
        <div className="M">
            {AInfo}
        </div>
    )
}

export default MessageBlcok;
