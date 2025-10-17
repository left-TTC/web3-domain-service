
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
import Identicon from "@/components/common/show/usr/identicon";


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

 
    return(
        <div className="rootdomaininfo">
            {ifActiveRootLoaded ? (
                activeDomain? (
                    <div className="rootinfobl">
                        <div className="rootdomainword">
                            <h1>{t("rootdomain")}</h1>
                            <h2>{activeDomain!.creatingName}</h2>
                        </div>
                        <div className="rootdomainwords">
                            <h1>{t("sponsor")}</h1>
                            <button className="sponerhead">
                                <div className="fundstatesponerhead">
                                    <Identicon pubkey={activeDomain!.rootSponsor.toBase58()} size={40}/>
                                </div>
                                <h1>{cutString(activeDomain!.rootSponsor.toBase58(), 7, 7, "...")}</h1>
                            </button>
                        </div>
                        <div className="rootdomainword">
                            <h1>{t("collected")}:</h1>
                            <div className="fulepercent">
                                <h2>{fundingState}</h2>
                            </div>
                        </div>
                        <div className="addFuelbutton">
                            <button className={`addfuel pixel ${ifWaitingAdConfirm? "waitingAD" : ""}`} onClick={() => openAddFuelModal()}>
                                {ifWaitingAdConfirm? 
                                    <h1>{t("waitconfirm")}</h1> :
                                    <h1>{t("add")} {t("fuel")}</h1>
                                }
                            </button>
                        </div>
                    </div>
                ):(
                    <div className="noitemcolletiing">
                        <h1>No Item</h1>
                        <div className="addFuelbutton waitingconfirmitem">
                            <button className={`addfuel pixel waitingconfirmitembu`} onClick={() => openAddFuelModal()}>
                                <h1>{t("createnow")}</h1>
                            </button>
                        </div>
                    </div>
                )
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
