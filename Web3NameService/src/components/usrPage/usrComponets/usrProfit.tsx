
import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrProfit.css"
import WithDrawal from "./usrProfit/withDrawal";
import UsrChain from "./usrProfit/usrChain";

interface UsrProfitProps {
    usrProfit: number | null,
    usrVolume: number | null,
}

const UsrProfit: React.FC<UsrProfitProps> = ({
    usrProfit, usrVolume
}) => {

    const {t} = useTranslation()
    
    

    return (
        <div className="usrprofit">
            <div className="mydomintitle">
                <h1>{t("profit")}</h1>
            </div>
            <div className="linedomain" />
            
            <WithDrawal
                usrProfit={usrProfit}
                usrVolume={usrVolume}
            />

            <UsrChain

            />
            
        </div>
    )
}

export default UsrProfit;