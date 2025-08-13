import { TransactionState } from "@/provider/fixedToastProvider/fixedToastProvider";
import "@/style/components/commonStyle/show/transactionToast.css"
import close from "@/assets/exit.svg"
import GetToastComponent from "./transactionToast/getToastContent";

export interface FixedToastProps{
    toastType: TransactionState,
    onClose: () => void,
}

const FixedToast: React.FC<FixedToastProps> = ({
    toastType, onClose
}) => {
    
    
    return(
        <div className="fixedtoast">
            <div className="fixedtoastcon">
                <button className="transactiontoastclose" onClick={() => onClose()}>
                    <img src={close} className="transactionclose" />
                </button>
                <GetToastComponent toastType={toastType} />
            </div>
        </div>
    )
}


export default FixedToast;