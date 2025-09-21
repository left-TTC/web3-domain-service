


import "@/style/components/auction/rootDomainCreate/addFuel/tool/amountChooser.css"
import { CREATE_ROOT_TARGET} from "@/utils/constants/constants";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface AmountChooserProps {
    nowFuel: number,
    setFuelQuantity: React.Dispatch<React.SetStateAction<number | null>>,
}

const AmountChooser: React.FC<AmountChooserProps> = ({
    nowFuel, setFuelQuantity, 
}) => {

    const {t} = useTranslation();

    const num = [0.001, 0.005, 0.01, 0.05, 1];

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const click = (quantity: number, index: number) => {
        setFuelQuantity(quantity * (CREATE_ROOT_TARGET - nowFuel))
        setActiveIndex(index)
    }

    const [customActive, setCustomActive] = useState(false)
    const [customNum, setCustomNum] = useState("")
    const [ifInputValid, setIfInputValid] = useState(true)

    const handleNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value;
        raw = raw.replace(/^\$\s*/, "");

        if (raw === "") {
            setCustomNum("");
            setFuelQuantity(1);
            setIfInputValid(true);
            return;
        }
        if (!/^[0-9]*\.?[0-9]*$/.test(raw)) {
            return; 
        }

        setCustomNum("$ " + raw);
        if (raw === "." || raw.endsWith(".")) {
            return;
        }
        const num = parseFloat(raw);
        if (isNaN(num)) {
            setCustomNum("");
            setFuelQuantity(1);
            setIfInputValid(true);
            return;
        }
        const usdNum = num * 1e6;
        setFuelQuantity(usdNum);
        if (usdNum > CREATE_ROOT_TARGET - nowFuel) {
            setIfInputValid(false);
        } else {
            setIfInputValid(true);
        }
    };

    const inputRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setCustomActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div className="fuelChooser">
            <h1>{t("selectquantity")}:</h1>
            <div className="amountChoose">
                {num.map((quantity, index) => (
                    <button 
                        key={index} 
                        className={`quantitybu ${index === activeIndex ? "quantitybuactive" : ""}`} 
                        onClick={() => click(quantity, index)}
                    >
                        <h1>$ {(((CREATE_ROOT_TARGET - nowFuel) * quantity) / 1e6).toFixed(3)}</h1>
                    </button>
                ))}

                <div 
                    className={`quantitybu ${customActive? "quantitybuactive":""} ${ifInputValid? "":"redWord"}`}
                    onClick={() => {setActiveIndex(null); setCustomActive(true)}} 
                    ref={inputRef}   
                >
                    <input
                        type="text"
                        placeholder={t("custom")}
                        value={customNum}
                        onChange={handleNumInput}
                        className={`quantitybuinput ${customActive? "quantitybuactive":""} ${ifInputValid? "":"redWord"}`}
                    />
                </div>
            </div>
        </div>
    )
}


export default AmountChooser;
