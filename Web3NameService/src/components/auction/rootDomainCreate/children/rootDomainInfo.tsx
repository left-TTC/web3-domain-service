
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
    creatingAccounts: FundingAccountState[],
    setActiveDomain: React.Dispatch<React.SetStateAction<FundingAccountState | null>>
}


const RootDomainInfo: React.FC<RootDomainInfoProps> = ({
    creatingAccounts, setActiveDomain
}) => {

    const {t}= useTranslation()

    const [ifShowAddFuel, setIfShowAddFuel] = useState(false)

    const handleSlideChange = (swiper: any) => {
        const currentIndex = swiper.realIndex; 
        const currentDomain = creatingAccounts[currentIndex];
        setActiveDomain(currentDomain);
    };


    return(
        <div className="rootdomaininfo">
            <div className="contentblock">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    onSlideChange={handleSlideChange}
                    className="rootcreateswider"
                >
                    {creatingAccounts.map((creatingAccout, index) => (
                        <SwiperSlide key={index} className="createrootswiper">
                            <div className="domaincard">
                                <div className="rootdomainname">
                                    <h1>{t("rootdomain")}</h1>
                                    <h2>{creatingAccout.creatingName}</h2>
                                </div>
                                <div className="contributer">
                                    <h1>{t("sponsor")}</h1>
                                    <button className="sponerhead">
                                        <div className="headblock">
                                            <img src={usrdefault} className="usrdefault" />
                                        </div>
                                        <h1>{cutString(creatingAccout.rootSponsor.toBase58(), 5, 5, "...")}</h1>
                                    </button>
                                </div>
                                <div className="fuelblock">
                                    <h1>{t("fuel")}:</h1>
                                    <h2>{creatingAccout.fundState.toNumber()}/{CREATE_ROOT_FEE}</h2>
                                </div>
                                <div className="addFuelbutton">
                                    <button className="addfuel pixel">
                                        <h1>{t("add")} {t("fuel")}</h1>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {ifShowAddFuel &&
                <AddFuel />
            }
        </div>
    )
}


export default RootDomainInfo;
