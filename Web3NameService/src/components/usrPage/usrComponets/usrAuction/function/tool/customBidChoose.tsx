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

    useEffect(() => {
        if(ifUseCustom){
            const number = Number(integer)
            setIncreaseNumber(number / 100 )
        }
    }, [integer, ifUseCustom])

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

    return(
        <div className="customchoose">
            <div className="customInput">
                <div className="integerdigit">
                    <input
                        type="text"
                        value={integer}
                        className="custominput integerinput"
                        onChange={(e) => {integerChange(e)}}
                    />
                </div>
                <h2> %</h2>
            </div>
            <button 
                className={`confirmusecustom ${ifUseCustom? "usecusom":""} `} 
                onClick={() => {setUseCustom(!ifUseCustom); calcleChoosePrice()}}
            />
        </div>
    )
}

export default CustomBidChoose;