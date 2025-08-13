import { TransactionState } from "@/provider/fixedToastProvider/fixedToastProvider";
import React, { useEffect, useRef, useState } from "react";

export interface GetToastComponentProps{
    toastType: TransactionState
}

const GetToastComponent: React.FC<GetToastComponentProps> = ({
    toastType
}) => {
    
    const [toastContent, setToastContent] = useState<React.ReactNode | null>(null);
    const [animateComponent, setAnimateComponent] = useState<TransactionState | null>(null);

    const checkingBalanceRef = useRef<HTMLHeadingElement | null>(null)

    useEffect(() => {
        switch(toastType){
            case TransactionState.Pending:
                setToastContent(
                    <div className="fixedtoastcontent">
                        <h1>waiting Pending</h1>
                    </div>  
                )
                setAnimateComponent(TransactionState.Pending)
                break;
            case TransactionState.Success:
                setToastContent(
                    <div className="fixedtoastcontent">
                        <h1>transaction Success</h1>
                    </div>
                )
                setAnimateComponent(TransactionState.Success)
                break;
            case TransactionState.Cancle:
                setToastContent(
                    <div className="fixedtoastcontent">
                        <h1>user cancle</h1>
                    </div>
                )
                setAnimateComponent(TransactionState.Cancle)
                break;
            case TransactionState.Fail:
                setToastContent(
                    <div className="fixedtoastcontent">
                        <h1>transaction fail</h1>
                    </div>
                )
                setAnimateComponent(TransactionState.Fail)
                break;
            case TransactionState.CheckingBalance:
                setToastContent(
                    <div className="fixedtoastcontent CheckingBalance">
                        <h1 ref={checkingBalanceRef}>checking balance</h1>
                    </div>
                )
                setAnimateComponent(TransactionState.CheckingBalance)
                break;
            case TransactionState.NoEnoughBalance:
                setToastContent(
                    <div className="fixedtoastcontent">
                        <h1>no enough token</h1>
                    </div>
                )
                setAnimateComponent(TransactionState.NoEnoughBalance)
                break;
            case TransactionState.NoConnect:
                setToastContent(
                    <div className="fixedtoastcontent">
                        <h1>please connct a wallet</h1>
                    </div>
                )
                setAnimateComponent(TransactionState.NoConnect)
                break;
                
        }
    }, [toastType])
    

    return toastContent
}

export default GetToastComponent;
