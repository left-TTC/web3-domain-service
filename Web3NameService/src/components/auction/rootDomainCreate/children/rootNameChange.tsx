
import "@/../public/background/hero/direction.png"
import { useTranslation } from "react-i18next";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "@/style/components/auction/rootDomainCreate/children/rootNameChange.css"
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';
import { Navigation } from "swiper/modules";

export interface RootNameChangeProps {
    creatingAccounts: FundingAccountState[],
    setActiveRoot: React.Dispatch<React.SetStateAction<FundingAccountState | null>>,
    setLoadingState: () => void,
}

const RootNameChange: React.FC<RootNameChangeProps> = ({
    creatingAccounts, setActiveRoot, setLoadingState
}) => {

    const {t} = useTranslation()

    const handleSwiderChange = (swiper: SwiperClass) => {
        const currentIndex = swiper.realIndex;
        const currentItem = creatingAccounts[currentIndex];

        setActiveRoot(currentItem);
        setLoadingState();
    }

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
                    onSlideChange={handleSwiderChange}
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
