
import "@/style/components/usrPage/usrComponents/usrAuction/function/tool/customValueSet.css"
import { useTranslation } from "react-i18next";

import attention from "@/assets/attention.svg"
import { useState } from "react";

export interface CustomValueSetProps {
    setCustomValue: React.Dispatch<React.SetStateAction<number | null>>,
    ifCustomSetPage?: boolean,
    customClass?: string,
}

const CustomValueSet: React.FC<CustomValueSetProps> = ({
    setCustomValue, ifCustomSetPage, customClass
}) => {

    const {t} = useTranslation()

    const [inputValue, setInputValue] = useState<string>(""); 
    const handleCustomValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "") {
            setInputValue("");
                setCustomValue(null);
            return;
        }

        const regex = /^\d*\.?\d{0,2}$/;

        if (regex.test(value)) {
            setInputValue(value);

            if (value.endsWith(".")) {
                setCustomValue(Number.parseInt(value));
            } else {
                setCustomValue(Number(value));
            }
        }
    };

    // toast show
    const [showCustomValueAttention, setShowCustomValueAttention] = useState(false)

    const [inputActive, setInputActive] = useState(false)

    return(
        <div className={`customValueset ${ifCustomSetPage? "CustomSetPage":""} ${customClass}`}>
            <div className="titleandattention">
                <h3>{ifCustomSetPage? t("customprice"):t("customvalue")}:</h3>
                <img src={attention} className="cutomValueAttetion" />
            </div>
            <div className={`customvalueinput ${inputActive? "inputactive":""}`}>
                <h3>$</h3>
                <input
                    className="customvaluesetinput"
                    step="0.01"
                    min="0"
                    value={inputValue? inputValue:""}
                    onChange={(e) => handleCustomValueInput(e)}
                    onClick={() => setInputActive(true)}
                    onBlur={() => setInputActive(false)}
                />
            </div>
        </div>
    )
}

export default CustomValueSet;
