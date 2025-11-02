import { TransactionState } from "@/provider/fixedToastProvider/fixedToastProvider";
import "@/style/components/commonStyle/show/transactionToast.css"
import close from "@/assets/exit.svg"
import GetToastComponent from "./transactionToast/getToastContent";

export interface FixedToastProps{
    toastType: TransactionState,
    onClose: () => void,
    contentFn: () => void,
    message?: string,
}

const FixedToast: React.FC<FixedToastProps> = ({
    toastType, onClose, message, contentFn
}) => {
    
    
    return(
        <div className="fixedtoast">
            <div className="fixedtoastcon">
                <button className="transactiontoastclose" onClick={() => onClose()}>
                    <img src={close} className="transactionclose" />
                </button>
                <GetToastComponent toastType={toastType} contentFn={contentFn} message={message}/>
            </div>
        </div>
    )
}


export default FixedToast;