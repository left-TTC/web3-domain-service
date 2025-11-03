

import domain from "@/assets/domain.svg"
import domainWhite from "@/assets/domainwhite.svg"
// import profit from "@/assets/profit.svg"
import auction from "@/assets/auction.svg"
import auctionWhite from "@/assets/auction white.svg"

import "@/style/components/usrPage/usrBack/usrStateManage.css"
import { useTranslation } from "react-i18next"

export enum UsrComponents {
    Domain = "Domian",
    // Profit = "Profit",
    Auction = "Auction",
}

export interface UsrStateManageProps {
    showingComponents: UsrComponents,
    setShowUsrComponent: React.Dispatch<React.SetStateAction<UsrComponents>>,
}

const UsrStateManage: React.FC<UsrStateManageProps> = ({
    setShowUsrComponent, showingComponents
}) => {

    const {t} = useTranslation()

    const getImg = (com: UsrComponents) => {
        switch (com) {
            case UsrComponents.Domain:
                if(showingComponents === com){
                    return domain;
                }else return domainWhite
            case UsrComponents.Auction:
                if(showingComponents === com){
                    return auction
                }else return auctionWhite
        }
    }

    const getName = (com: UsrComponents) => {
        switch (com) {
            case UsrComponents.Domain:
                return t("domain");
            case UsrComponents.Auction:
                return t("auctions");
            // case UsrComponents.Profit:
            //     return profit
        }
    }

    return(
        <div className="usrcommanage">
            {Object.values(UsrComponents).map((com, index) => (
                <button key={index} 
                    className={`comBu ${showingComponents === com && "activeComponent"}`} 
                    onClick={() => setShowUsrComponent(com)}>
                    <img src={getImg(com)} className={`comimg`} />
                    <h1>{getName(com)}</h1>
                </button>
            ))}
        </div>
    )
}

export default UsrStateManage;
