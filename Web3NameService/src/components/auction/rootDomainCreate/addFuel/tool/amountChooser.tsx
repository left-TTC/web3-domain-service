


import "@/style/components/auction/rootDomainCreate/addFuel/tool/amountChooser.css"
import { CREATE_ROOT_TARGET} from "@/utils/constants/constants";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface AmountChooserProps {
    nowFuel: number,
    wilAddFuel: number | null,
    setFuelQuantity: React.Dispatch<React.SetStateAction<number | null>>,
}

const AmountChooser: React.FC<AmountChooserProps> = ({
    nowFuel, setFuelQuantity, wilAddFuel
}) => {

    const {t} = useTranslation();

    const num = [1000000, 2000000, 5000000, 6000000];
    num.push(CREATE_ROOT_TARGET - nowFuel);

    const click = (quantity: number) => {
        setFuelQuantity(quantity)
    }

    const [customNum, setCustomNum] = useState("")
    
    const handleNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomNum(e.target.value)
    }

    const getUSD = (usdLamports: number) => {
        return "$" + (usdLamports / 1e6).toFixed(2) 
    }

    return(
        <div className="fuelChooser">
            <h1>{t("selectquantity")}:</h1>
            <div className="amountChoose">
                {num.map((quantity, index) => (
                    <button key={index} className={`quantitybu ${wilAddFuel === quantity ? "quantitybuactive" : ""}`} onClick={() => click(quantity)}>
                        <h1>{quantity} ({getUSD(quantity)})</h1>
                    </button>
                ))}

                <div className="quantitybu">
                    <input
                        type="text"
                        placeholder={t("custom")}
                        value={customNum}
                        onChange={handleNumInput}
                        className="quantitybuinput"
                    />
                </div>
            </div>
        </div>
    )
}


export default AmountChooser;
