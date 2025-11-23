import { useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrProfit/usrChain.css"

const UsrChain = () => {

    const {t} = useTranslation()

    const [checkMySubordinates, setCheckMySubordinates] = useState(false)

    return (
        <div className="usrReferrerChain">
            <h1>{t("Mysubordinate")}</h1>
            {checkMySubordinates? (
                <div className="subordinateshow">
                    
                </div>
            ):(
                <div className="subordinateshow">

                </div>
            )}
        </div>
    )
}

export default UsrChain;
