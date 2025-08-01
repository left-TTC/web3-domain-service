
import "@/../public/background/hero/direction.png"
import { useTranslation } from "react-i18next";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "@/style/components/auction/rootDomainCreate/children/rootNameChange.css"
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";

export interface RootNameChangeProps {
    creatingAccounts: FundingAccountState[]
}

const RootNameChange: React.FC<RootNameChangeProps> = ({
    creatingAccounts
}) => {

    const {t} = useTranslation()

    return(
        <div className="rootnamechange">
            <div className="sailtitle">
                <h1>{t("arecreating")}</h1>
            </div>
             <div className="swipercontent">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    className="rootcreateswider"
                >
                    {creatingAccounts.map((creatingAccounts, index) => (
                        <SwiperSlide key={index} className="creatingaccountswiper">
                            <h1>{creatingAccounts.creatingName}</h1>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="checklogs">
                    <h1>{t("checklogs")}</h1>
                </button>
             </div>
                
        </div>
    )
}

export default RootNameChange;
