
import Identicon from "@/components/common/show/usr/identicon";
import "@/style/components/usrPage/usrComponents/usrDomain/block/detailItem.css"
import { cutDomain } from "@/utils/functional/common/cutDomain";

import onSale from "@/assets/On-Sale.svg"
import onSaleAble from "@/assets/On-SaleAble.svg"
import ipfs from "@/assets/ipfsdetail.svg"
import ipfsDetailAble from "@/assets/ipfsDetaiAble.svg"
import price from "@/assets/price.svg"
import priceAble from "@/assets/priceAble.svg"


import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { DEFAULT_CUSTOM_VALUE } from "@/utils/constants/constants";

export interface DetailItemProps {
    itemName: string,
    ipfsData: string | null
    openDomainSet: () => void,
    nameState: NameRecordState | null | undefined,
    onSaleDomains: string[]
}


const DetailItem: React.FC<DetailItemProps> = ({
    itemName, ipfsData, openDomainSet, nameState, onSaleDomains
}) => {

    const {t} = useTranslation()

    const [ifLessThan640, setIfLessThan640] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIfLessThan640(window.innerWidth < 640);
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const hasCustomValue = () => {
        if(!nameState) return false
        if(nameState.customPrice.toNumber() === DEFAULT_CUSTOM_VALUE)return false
        return true
    }

    const ifAuctioning = () => {
        if(onSaleDomains.includes(itemName))return true
        return false
    }

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
                    {ipfsData!=null ? (
                        <img src={ipfsDetailAble} className={`detailimg couldCopyIpfs`}/>
                    ):(
                        <img src={ipfs} className="detailimg"/>
                    )}
                    {hasCustomValue()? (
                        <img src={priceAble} className="detailimg detailprice couldCopyIpfs"/>
                    ):(
                        <img src={price} className="detailimg detailprice"/>
                    )}
                    {ifAuctioning()? (
                        <img src={onSaleAble} className="detailimg detailsale couldCopyIpfs"/>
                    ):(
                        <img src={onSale} className="detailimg detailsale"/>
                    )}
                </div>
            </div>
            
            <button className="detailToopensetting" onClick={() => openDomainSet()}>
                {ifLessThan640? (
                    <h1>{t("configure").slice(0,3)}</h1>
                ):(
                    <h1>{t("configure")}</h1>
                )}
            </button>
            <div className="detailitemline" />
        </div>
    )
}

export default DetailItem;
