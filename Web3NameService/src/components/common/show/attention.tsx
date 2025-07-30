
import more from "@/assets/more.png"
import { useState } from "react"

import "@/style/components/commonStyle/show/attention.css"

export interface AttentionProps {
    word: string
}

const Attention: React.FC<AttentionProps> = ({
    word
}) => {

    const [ifShowDetail, setIfShowDetail] = useState(false)

    return(
        <div className="attentionShow"
            onMouseEnter={() => setIfShowDetail(true)}
            onMouseLeave={() => setIfShowDetail(false)}
        >
            <img src={more} 
                className="attentionbumore"     
            />
            {ifShowDetail &&
                <div className="attentionShowdetail">
                    <h1>{word}</h1>
                </div>
            }
        </div>
    )
}

export default Attention;