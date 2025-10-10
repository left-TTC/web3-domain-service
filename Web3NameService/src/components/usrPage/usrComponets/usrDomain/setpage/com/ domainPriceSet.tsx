

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/domainPriceSet.css"
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import CustomPriceSet from "./settleComponent/customPriceSet"

export interface DomainPriceSetProps {
    domainName: string,
    domainState: NameRecordState | null | undefined,
}


const DomainPriceSet: React.FC<DomainPriceSetProps> = ({
    domainState, domainName
}) => {

    const {t} = useTranslation()

    const [ifOpenPirceSet, setIfOpenPriceSet] = useState(false)
    const closeSet = () => setIfOpenPriceSet(false)

    return(
        <div className="domainpriceShow">
            <h1>{t("customprice")}</h1>
            <div className="priceshowline" />
            <div className="priceandsetcom">
                {domainState? (
                    <div className="showAndset">
                        <h1>$ {(domainState.customPrice.toNumber() / 1e6).toFixed(2)}</h1>
                        <button className="customsetbu" onClick={() => setIfOpenPriceSet(true)}>
                            <h1>Set</h1>
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