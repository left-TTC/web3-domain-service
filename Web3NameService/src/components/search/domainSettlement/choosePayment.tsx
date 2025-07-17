

import "@/style/components/search/domainSettlement/choosePayment.css"
import { useTranslation } from "react-i18next";

export enum PaymentMethod{
    Crypto = "Crypto",
    a =  "a",
}

export interface ChoosePaymentProps{
    chooseMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>,
    activingMethod: PaymentMethod,
}

const ChoosePayment: React.FC<ChoosePaymentProps> = ({
    chooseMethod, activingMethod
}) => {

    const {t} = useTranslation();

    

    return(
        <div className="payemenCryptotchooser">
            <h1>{t("payment")}</h1>
            {Object.values(PaymentMethod).map(method => (
                <button 
                    key={method} 
                    className={`paymentmethod ${(activingMethod === method)? 'paymentactive':''}`}
                    onClick={() => chooseMethod(method as PaymentMethod)}
                >
                    <div className={`warndot ${(activingMethod === method)? 'warndotactive':''}`}/>
                    <h1>{method}</h1>
                </button>
            ))}
        </div>
    )
}

export default ChoosePayment;