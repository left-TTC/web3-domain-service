import Back from "@/components/common/functional/back";
import ChoosePayment, { PaymentMethod } from "@/components/search/domainSettlement/choosePayment";
import { useState } from "react";
import SetIPFSRecordCrypto from "./bills/setIPFSRecordCrypto";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/settleComponent/bills/customPriceSet.css"

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
            <div className="custompriceSet">
                <Back backFun={back} className="customPriceSetBack"/>
                <div className="setCustomPricepaytitle">
                    <h2>Setting:</h2>
                    <div className="setcustomdomainName">
                        <h1>{cutDomain(setName)[0]}</h1>
                        <h2>.{cutDomain(setName)[1]}</h2>
                    </div>
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