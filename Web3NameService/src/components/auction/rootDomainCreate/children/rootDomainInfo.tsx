
import "@/style/components/auction/rootDomainCreate/children/rootDomainInfo.css"
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { cutString } from "@/utils/functional/common/cutString";


import usrdefault from "@/../public/usr/usrdefault.png"
import { CREATE_ROOT_FEE } from "@/utils/constants/constants";
import { useState } from "react";
import AddFuel from "../addFuel/addFuel";

export interface RootDomainInfoProps {
    setActiveDomain: React.Dispatch<React.SetStateAction<FundingAccountState | null>>,
    activeDomain: FundingAccountState | null,
    ifActiveRootLoaded: boolean
}


const RootDomainInfo: React.FC<RootDomainInfoProps> = ({
    setActiveDomain, activeDomain, ifActiveRootLoaded
}) => {

    const {t}= useTranslation()

    const [ifShowAddFuel, setIfShowAddFuel] = useState(false)

    const openAddFuelModal = () => {
        console.log("add moduel: ", ifShowAddFuel)
        setIfShowAddFuel(true)
    }


 
    return(
        <div className="rootdomaininfo">
            {ifActiveRootLoaded ? (
                <div className="rootinfobl">
                    <div className="rootdomainword">
                        <h1>{t("rootdomain")}</h1>
                        <h2>{activeDomain!.creatingName}</h2>
                    </div>
                    <div className="rootdomainword">
                        <h1>{t("sponsor")}</h1>
                        <button className="sponerhead">
                            <h1>{cutString(activeDomain!.rootSponsor.toBase58(), 5, 5, "...")}</h1>
                        </button>
                    </div>
                    <div className="rootdomainword">
                        <h1>{t("fuel")}:</h1>
                        <h2>{activeDomain!.fundState.toNumber()}/{CREATE_ROOT_FEE}</h2>
                    </div>
                    <div className="addFuelbutton">
                        <button className="addfuel pixel" onClick={() => openAddFuelModal()}>
                            <h1>{t("add")} {t("fuel")}</h1>
                        </button>
                    </div>
                </div>
            ): (
                <div className="rootinfobl rootchecking"/>
            )}
        </div>
    )
}


export default RootDomainInfo;
