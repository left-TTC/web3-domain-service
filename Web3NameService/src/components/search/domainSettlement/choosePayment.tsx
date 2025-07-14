

import "@/style/components/search/domainSettlement/choosePayment.css"

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


    return(
        <div className="payemenCryptotchooser">
            <h1>{("payment")}</h1>
            {Object.values(PaymentMethod).map(method => (
                <button 
                    key={method} 
                    className={`paymentmethod ${(activingMethod === method)? 'paymentactive':''}`}
                    onClick={() => chooseMethod(method as PaymentMethod)}
                >
                    <div className="warndot"/>
                    <h1>{method}</h1>
                </button>
            ))}
        </div>
    )
}

export default ChoosePayment;