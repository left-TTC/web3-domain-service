import Back from "@/components/common/functional/back";
import ExtractCryptoProps from "./extractCrypto";

interface ExtractProps {
    totalSOL: number,
    backFn: () => void,
}

const Extract: React.FC<ExtractProps> = ({
    totalSOL, backFn
}) => {


    return(
        <div className="increasePrice">
            <div className="custompriceSet">
                <Back backFun={backFn} className="customPriceSetBack "/>
                <div className="setCustomPricepaytitle">
                    <h2>Setting:</h2>
                </div>
                <ExtractCryptoProps
                    nowProfit={totalSOL}
                />
            </div>
        </div>
    )
}

export default Extract;