
import "@/style/components/usrPage/usrComponents/usrDomain/block/simpleItem.css"

import ipfsDisable from "@/assets/ipfsdisable.svg"
import ipfsAbleImg from "@/assets/ipfsable.svg"
import { getCardStyleFromName } from "./function/getCardStyleFromName"

export interface SimpleItemProps {
    itemName: string,
    ipfsAble: boolean,
}

const SimpleItem: React.FC<SimpleItemProps> = ({
    itemName, ipfsAble
}) => {


    return(
        <div 
            className={`simpleitem ${ipfsAble? getCardStyleFromName(itemName):""}`}
            onClick={() => {}}    
        >
            <h1>{itemName}</h1>
            {ipfsAble?
                <img src={ipfsAbleImg} className="ipfsFlag true" /> :
                <img src={ipfsDisable} className="ipfsFlag" />
            }
        </div>
    )
}

export default SimpleItem;
