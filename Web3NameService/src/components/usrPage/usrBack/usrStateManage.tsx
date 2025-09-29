

import domain from "@/assets/domain.svg"
import profit from "@/assets/profit.svg"
import auction from "@/assets/Auction.svg"

import "@/style/components/usrPage/usrBack/usrStateManage.css"

export enum UsrComponents {
    Domain = "Domian",
    Profit = "Profit",
    Auction = "Auction",
}

export interface UsrStateManageProps {
    needAttentionCom: UsrComponents[],
    setShowUsrComponent: React.Dispatch<React.SetStateAction<UsrComponents>>,
}

const UsrStateManage: React.FC<UsrStateManageProps> = ({
    needAttentionCom, setShowUsrComponent
}) => {

    const getImg = (com: UsrComponents) => {
        switch (com) {
            case UsrComponents.Domain:
                return domain;
            case UsrComponents.Auction:
                return auction;
            case UsrComponents.Profit:
                return profit
        }
    }

    return(
        <div className="usrcommanage">
            {Object.values(UsrComponents).map((com, index) => (
                <button key={index} className="comBu" onClick={() => setShowUsrComponent(com)}>
                    {needAttentionCom.includes(com)&& 
                        <div className="redattention" />
                    }
                    <img src={getImg(com)} className="comimg" />
                </button>
            ))}
        </div>
    )
}

export default UsrStateManage;
