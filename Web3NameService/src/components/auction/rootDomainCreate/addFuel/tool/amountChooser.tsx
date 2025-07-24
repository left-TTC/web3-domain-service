


import "@/style/components/auction/rootDomainCreate/addFuel/tool/amountChooser.css"
import { CREATE_ROOT_FEE } from "@/utils/constants/constants";
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

    const num = [1000, 2000, 5000, 10000];
    num.push(CREATE_ROOT_FEE - nowFuel);

    const click = (quantity: number) => {
        setFuelQuantity(quantity)
    }

    const [customNum, setCustomNum] = useState("")
    
    const handleNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomNum(e.target.value)
    }

    return(
        <div className="fuelChooser">
            <h1>{t("selectquantity")}:</h1>
            <div className="amountChoose">
                {num.map((quantity) => (
                    <button className={`quantitybu ${wilAddFuel === quantity ? "quantitybuactive" : ""}`} onClick={() => click(quantity)}>
                        <h1>{quantity}</h1>
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
