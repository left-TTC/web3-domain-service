
import "@/style/components/auction/rootDomainCreate/children/rootDomainInfo.css"
import type { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useTranslation } from "react-i18next";
import { cutString } from "@/utils/functional/common/cutString";

import { CREATE_ROOT_TARGET } from "@/utils/constants/constants";
import { useEffect, useState } from "react";
import AddFuel from "../addFuel/addFuel";

import more from "@/assets/more.png"

export interface RootDomainInfoProps {
    activeDomain: rootStateAccount | null,
    ifActiveRootLoaded: boolean
}


const RootDomainInfo: React.FC<RootDomainInfoProps> = ({
    activeDomain, ifActiveRootLoaded
}) => {

    const {t}= useTranslation()

    const [ifShowAddFuel, setIfShowAddFuel] = useState(false)

    const openAddFuelModal = () => {
        setIfShowAddFuel(true)
    }

    const [fundingState, setFundingState] = useState("")
    const [ifWaitingAdConfirm, setIfWaitingAdConfirm] = useState(false)
    useEffect(() => {
        if(activeDomain){
            const state = activeDomain.fundState.toNumber()

            if(state > CREATE_ROOT_TARGET){
                setFundingState("100 %")
                setIfWaitingAdConfirm(true)
                return
            }

            const percent = activeDomain.fundState.toNumber() / CREATE_ROOT_TARGET
            setFundingState(percent*100 + " %")
        }
    }, [activeDomain])

    const [showFuelAbout, setShowFuelAbout] = useState(false)
 
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
                        <div className="fulepercent">
                            <img src={more} className="percentmore"
                                onMouseEnter={() => setShowFuelAbout(true)}
                                onMouseLeave={() => setShowFuelAbout(false)}
                            />
                            <h2>{fundingState}</h2>

                            {showFuelAbout &&
                            <div className="showfuelabout">
                                <h1>
                                    {ifWaitingAdConfirm? "FULL" :
                                        `$ ${(activeDomain!.fundState.toNumber() / 1e6).toFixed(2)} / ${(CREATE_ROOT_TARGET / 1e6).toFixed(2)}`
                                    }
                                </h1>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="addFuelbutton">
                        <button className={`addfuel pixel ${ifWaitingAdConfirm? "waitingAD" : ""}`} onClick={() => openAddFuelModal()}>
                            {ifWaitingAdConfirm? 
                                <h1>{t("add")} 1{t("fuel")}</h1> :
                                <h1>{t("add")} {t("fuel")}</h1>
                            }
                        </button>
                    </div>
                </div>
            ): (
                <div className="rootinfobl rootchecking"/>
            )}
            {ifShowAddFuel &&
                <AddFuel addingRootInfo={activeDomain!} closeAddFuelPage={() => setIfShowAddFuel(false)}/>
            }
        </div>
    )
}


export default RootDomainInfo;
