
import Back from "@/components/common/functional/back";
import { returnProjectVault } from "@/utils/constants/constants";
// import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CheckReferrerChainProps {
    backFn: () => void,
}

const CheckReferrerChain: React.FC<CheckReferrerChainProps> = ({
    backFn
}) => {

    const {t} = useTranslation()
    // const [loadingReferrer, setLoadingReferrer] = useState(false)

    console.log("vault: ", returnProjectVault().toBase58())

    return(
        <div className="increasePrice">
            <div className="custompriceSet">
                <Back backFun={backFn} className="customPriceSetBack "/>
                <div className="setCustomPricepaytitle">
                    <h2>{t("extract")}:</h2>
                </div>
                
            </div>
        </div>
    )
}

export default CheckReferrerChain;