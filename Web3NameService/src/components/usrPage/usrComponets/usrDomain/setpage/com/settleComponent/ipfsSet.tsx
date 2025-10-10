import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import { useState } from "react";
import SetIPFSRecordCrypto from "./bills/setIPFSRecordCrypto";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";


export interface IpfsSetProps {
    setName: string,
    back: () => void,
    domainRecordState: IPFSRecordState | undefined,
    ifLoadingRecord: boolean,
}

const IpfsSet: React.FC<IpfsSetProps> = ({
    setName, back, ifLoadingRecord, domainRecordState
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
                <SetIPFSRecordCrypto
                    domainName={setName}
                    domainRecordState={domainRecordState}
                    ifLoading={ifLoadingRecord}
                />
            </div>
        </div>
    )
}

export default IpfsSet;