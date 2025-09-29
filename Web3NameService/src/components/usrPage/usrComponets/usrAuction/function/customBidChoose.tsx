import { useEffect, useState } from "react";

import "@/style/components/usrPage/usrComponents/usrAuction/function/customBidChoose.css"

export interface CustomBidChooseProps {
    setIncreaseNumber: React.Dispatch<React.SetStateAction<number>>
}

const CustomBidChoose: React.FC<CustomBidChooseProps> = ({
    setIncreaseNumber
}) => {

    const [integer, setInteger] = useState("0");
    const [decimal, setDecimal] = useState("0");

    useEffect(() => {
        const number = Number(integer) * 1e6 + Number(decimal) * 1e5
        setIncreaseNumber(number)
    }, [integer, decimal])

    return(
        <div className="customchoose">
            <h3>$</h3>
            <div className="customInput">
                <div className="integerdigit">
                    <input
                        type="text"
                        value={integer}
                        className="custominput integerinput"
                        onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            setInteger(v === "" ? "0" : v);
                        }}
                    />
                </div>
                <h3>.</h3>
                <div className="decimaldigit">
                    <input
                        type="text"
                        value={decimal}
                        className="custominput decimalinput"
                        onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            setDecimal(v === "" ? "0" : v);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomBidChoose;