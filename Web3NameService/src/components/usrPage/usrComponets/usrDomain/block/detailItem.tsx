
import Identicon from "@/components/common/show/usr/identicon";
import "@/style/components/usrPage/usrComponents/usrDomain/block/detailItem.css"
import { cutDomain } from "@/utils/functional/common/cutDomain";

import onSale from "@/assets/On-Sale.svg"
import ipfs from "@/assets/ipfsdetail.svg"
import price from "@/assets/price.svg"
import { useTranslation } from "react-i18next";

export interface DetailItemProps {
    itemName: string,
    ipfsAble: boolean,
    openDomainSet: () => void,
}


const DetailItem: React.FC<DetailItemProps> = ({
    itemName, ipfsAble, openDomainSet
}) => {

    const {t} = useTranslation()

    return(
        <div className="detaildomainitem">
            <div className="itemhead">
                <div className="realhead">
                    <div className="head1">
                        <Identicon pubkey={itemName} />
                    </div>
                    <div className="itemdomainame">
                        <h1>{cutDomain(itemName)[0]}</h1>
                        <h2>.{cutDomain(itemName)[1]}</h2>
                    </div>
                </div>
                <div className="detailfuction">
                    <img src={ipfs} className="detailimg"/>
                    <img src={price} className="detailimg detailprice"/>
                    <img src={onSale} className="detailimg detailsale"/>
                </div>
            </div>
            
            <button className="detailToopensetting" onClick={() => openDomainSet()}>
                <h1>{t("configure")}</h1>
            </button>
            <div className="detailitemline" />
        </div>
    )
}

export default DetailItem;
