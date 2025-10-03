
import "@/style/components/usrPage/usrComponents/usrAuction/function/tool/customValueSet.css"
import { useTranslation } from "react-i18next";

import attention from "@/assets/attention.svg"
import { useState } from "react";

export interface CustomValueSetProps {
    customValue: number | null,
    setCustomValue: React.Dispatch<React.SetStateAction<number | null>>,
}

const CustomValueSet: React.FC<CustomValueSetProps> = ({
    customValue, setCustomValue
}) => {

    const {t} = useTranslation()

    const handleCustomValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        const num = Number(inputValue);

        if (!isNaN(num) && /^\d*\.?\d{0,2}$/.test(inputValue)) {
            setCustomValue(num);
        } 
    };

    const [showCustomValueAttention, setShowCustomValueAttention] = useState(false)

    const [inputActive, setInputActive] = useState(false)

    return(
        <div className="customValueset">
            <div className="titleandattention">
                <h3>{t("customvalue")}:</h3>
                <img src={attention} className="cutomValueAttetion" />
            </div>
            <div className={`customvalueinput ${inputActive? "inputactive":""}`}>
                <h3>$</h3>
                <input
                    className="customvaluesetinput"
                    step="0.01"
                    min="0"
                    value={customValue? customValue:""}
                    onChange={(e) => handleCustomValueInput(e)}
                    onClick={() => setInputActive(true)}
                    onBlur={() => setInputActive(false)}
                />
            </div>
        </div>
    )
}

export default CustomValueSet;
