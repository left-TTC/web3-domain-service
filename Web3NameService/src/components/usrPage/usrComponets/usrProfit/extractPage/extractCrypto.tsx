import ExtractBills from "@/components/common/transaction/settlebills/extractBills";

import "@/style/components/usrPage/usrComponents/usrProfit/extractPage/extractCrypto.css"
import { useTranslation } from "react-i18next";

interface ExtractCryptoProps {
    nowProfit: number,
}

const ExtractCryptoProps: React.FC<ExtractCryptoProps> = ({
    nowProfit
}) => {

    const {t} = useTranslation()

    return(
        <div className="SetCustomPriceCrypto">
            <div className="extractmount">
                <h1>{t("total")}</h1>
                <div className="totalandavailable">
                    <h3>{(nowProfit / 1e9).toFixed(4)} SOL</h3>
                    <h2>{((nowProfit-1e6) / 1e9).toFixed(4)} SOL (Available)</h2>
                </div>
                <div className="extractline" />
            </div>
            <ExtractBills
                canBeConfirm={false}
                confirmFunction={()=>{}}
                willExtract={((nowProfit-1e6) / 1e9)}
            />
        </div>
    )
}

export default ExtractCryptoProps;
