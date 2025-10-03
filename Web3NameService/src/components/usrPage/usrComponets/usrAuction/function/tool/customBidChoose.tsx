import { useEffect, useState, type ChangeEvent } from "react";

import "@/style/components/usrPage/usrComponents/usrAuction/function/tool/customBidChoose.css"

export interface CustomBidChooseProps {
    setIncreaseNumber: React.Dispatch<React.SetStateAction<number>>,
    setUseCustom: React.Dispatch<React.SetStateAction<boolean>>,
    ifUseCustom: boolean,
    calcleChoosePrice: () => void,
}

const CustomBidChoose: React.FC<CustomBidChooseProps> = ({
    setIncreaseNumber, setUseCustom, ifUseCustom, calcleChoosePrice
}) => {

    const [integer, setInteger] = useState("0");
    const [decimal, setDecimal] = useState("0");

    useEffect(() => {
        if(ifUseCustom){
            const number = Number(integer) * 1e6 + Number(decimal) * 1e5
            setIncreaseNumber(number)
        }
    }, [integer, decimal, ifUseCustom])

    const integerChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        if (value === "") {
            setInteger("");
            return;
        }

        value = value.replace(/^0+/, "");
        if (value === "") value = "0";

        setInteger(value);
    };
    useEffect(() => {
        if(!integer)setInteger("0")
    }, [integer])

    const decimalChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if(value.length > 1){
            setDecimal(value[1])
        }
        if(value.length === 0)setDecimal("0")
    }

    return(
        <div className="customchoose">
            <h3>$</h3>
            <div className="customInput">
                <div className="integerdigit">
                    <input
                        type="text"
                        value={integer}
                        className="custominput integerinput"
                        onChange={(e) => {integerChange(e)}}
                    />
                </div>
                <h3>.</h3>
                <div className="decimaldigit">
                    <input
                        type="text"
                        value={decimal}
                        className="custominput decimalinput"
                        onChange={(e) => {decimalChange(e)}}
                    />
                </div>
            </div>
            <button 
                className={`confirmusecustom ${ifUseCustom? "usecusom":""} `} 
                onClick={() => {setUseCustom(!ifUseCustom); calcleChoosePrice()}}
            />
        </div>
    )
}

export default CustomBidChoose;