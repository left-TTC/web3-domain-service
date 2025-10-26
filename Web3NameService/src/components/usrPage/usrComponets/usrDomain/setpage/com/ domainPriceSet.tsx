

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/domainPriceSet.css"
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import CustomPriceSet from "./settleComponent/customPriceSet"

export interface DomainPriceSetProps {
    domainName: string,
    domainState: NameRecordState | null | undefined,
    ifLessThan640: boolean,
}


const DomainPriceSet: React.FC<DomainPriceSetProps> = ({
    domainState, domainName, ifLessThan640
}) => {

    const {t} = useTranslation()

    const [ifOpenPirceSet, setIfOpenPriceSet] = useState(false)
    const [canClickToOpen, setCanClinckToOpen] = useState(true)
    const closeSet = () => {
        console.log("close custom")
        setIfOpenPriceSet(false)
        setCanClinckToOpen(true)
    }

    const lessOpen = () => {
        if(ifLessThan640 && canClickToOpen){
            setIfOpenPriceSet(true)
            setCanClinckToOpen(false)
        }
    }

    return(
        <div className={`domainpriceShow ${ifLessThan640&& "cusorclinck"}`} onClick={() => lessOpen()}>
            <h1>{t("customprice")}</h1>
            <div className="priceshowline" />
            <div className="priceandsetcom">
                {domainState? (
                    <div className="showAndset">
                        <h1>$ {(domainState.customPrice.toNumber() / 1e6).toFixed(2)}</h1>
                        <button className="customsetbu" onClick={() => setIfOpenPriceSet(true)}>
                            <h1>{t("set")}</h1>
                        </button>
                    </div>
                ):(
                    <div className="stateLoading" />
                )}
            </div>

            {ifOpenPirceSet && 
                <CustomPriceSet
                    setName={domainName}
                    back={closeSet}
                />
            }
        </div>
    )
}

export default DomainPriceSet