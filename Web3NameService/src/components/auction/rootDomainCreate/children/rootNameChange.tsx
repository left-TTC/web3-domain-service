
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "@/style/components/auction/rootDomainCreate/children/rootNameChange.css"
import type { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';
import { Navigation } from "swiper/modules";
import FlipCard from "../flipCard";

export interface RootNameChangeProps {
    creatingAccounts: rootStateAccount[],
    setActiveRoot: React.Dispatch<React.SetStateAction<rootStateAccount | null>>,
    setLoadingState: () => void,
    loaded: boolean,
}

const RootNameChange: React.FC<RootNameChangeProps> = ({
    creatingAccounts, setActiveRoot, setLoadingState, loaded
}) => {

    const handleSwiderChange = (swiper: SwiperClass) => {
        const currentIndex = swiper.realIndex;
        const currentItem = creatingAccounts[currentIndex];
        setActiveRoot(currentItem);
        setLoadingState();
    }

    return(
        <div className="rootnamechange">
            {loaded? (
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    loop={(creatingAccounts.length > 3)? true:false}
                    className="rootcreateswider"
                    onSlideChange={handleSwiderChange}
                >
                    {creatingAccounts.map((creatingAccounts, index) => (
                        <SwiperSlide key={index} className="creatingaccountswiper">
                            <FlipCard
                                frontText={creatingAccounts.creatingName}
                                fundNumber={creatingAccounts.fundState.toNumber()}
                                loaded={loaded}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ):(
                <div className="creatingaccountloading">
                    <FlipCard
                        loaded={loaded}
                    />
                </div>
            )}
        </div>
    )
}

export default RootNameChange;
