import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useState } from "react";


export interface IpfsSetProps {
    setName: string,
    setInfo: NameAuctionState,
    back: () => void
}

const IpfsSet: React.FC<IpfsSetProps> = ({
    setName, setInfo, back
}) => {

    const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.Crypto)

    return (
        <div className="increasePrice">
            <div className="launchfeepay">
                <Back backFun={back} className="launchrootback"/>
                <div className="increasePricepaytitle">
                    <h2>Settling:</h2>
                    <h1>{setName}</h1>
                </div>
                <ChoosePayment chooseMethod={setPayMethod} activingMethod={payMethod} />
            </div>
        </div>
    )
}

export default IpfsSet;