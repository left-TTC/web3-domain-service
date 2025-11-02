import { TransactionState } from "@/provider/fixedToastProvider/fixedToastProvider";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


import "@/style/components/commonStyle/show/transactionToast/getTransactionContent.css"
import LoadingComponent from "@/components/search/continueQuery/component/functional/loadingComponent";
import TransactionSuccess from "./anime/transactionSuccess";

import web3Loading from "@/../public/icon/butterflyweb3loading.png"

export interface GetToastComponentProps{
    toastType: TransactionState,
    contentFn?: ()=>void,
    message?: string
}

const GetToastComponent: React.FC<GetToastComponentProps> = ({
    toastType, contentFn, message
}) => {

    const {t} = useTranslation()
    
    const [toastContent, setToastContent] = useState<React.ReactNode | null>(null);


    useEffect(() => {
        switch(toastType){
            case TransactionState.Pending:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentpending">
                        <LoadingComponent dotClass="fixedtoastcontentpendingdot"/>
                        <h1>{t("pending")}</h1>
                    </div>  
                )
                break;
            case TransactionState.Success:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentsuccess">
                        <div className="transactionsuword">
                            <TransactionSuccess
                                size={50}
                            />
                            <h1>{t("transactionsuccess")}</h1>
                        </div>
                        <button className="transactionsuexit" onClick={() => {
                            if(contentFn)contentFn()
                        }}>
                            <h1>{t("ok")}</h1>
                        </button>
                    </div>
                )
                break;
            case TransactionState.Cancle:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentCancle">
                        <h1>{t("usrcancle")}</h1>
                        <button className="fixedtoastcontentcanclebu" onClick={() => {
                            if(contentFn)contentFn()
                        }}>
                            <h1>{t("ok")}</h1>
                        </button>
                    </div>
                )
                break;
            case TransactionState.Fail:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentFail">
                        <h1>{t("transactionfail")}</h1>
                        {message?
                            (<div className="failmeassageshow">
                                <h1>{message}</h1>
                            </div>
                            )
                            :(<div className="failmeassageshow">
                                <h1>{t("transactionerror")}</h1>
                            </div>
                            )
                        }
                        <button className="transactionfaexit" onClick={() => {
                            if(contentFn)contentFn()
                        }}>
                            <h1>{t("ok")}</h1>
                        </button>
                    </div>
                )
                break;
            case TransactionState.CheckingBalance:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentCheckingBalance">
                        <img src={web3Loading} className="web3loadingcheck" />
                        <h1>{t("checkbalance")}</h1>
                    </div>
                )
                break;
            case TransactionState.NoEnoughBalance:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentNoEnoughBalance">
                        <h1>{t("notenoughtokens")}</h1>
                        <button className="fixedtoastcontentNoEnoughBalancebu" onClick={() => {
                            if(contentFn)contentFn()
                        }}>
                            <h1>{t("ok")}</h1>
                        </button>
                    </div>
                )
                break;
            case TransactionState.NoConnect:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentNoConnect">
                        <h1>{t("connectwalletFirst")}</h1>
                        <button className="fixedtoastconnectwallet" onClick={() => {
                            if(contentFn)contentFn()
                        }}>
                            <h1>{t("connect")}</h1>
                        </button>
                    </div>
                )
                break;
            case TransactionState.Error:
                setToastContent(
                    <div className="fixedtoastcontent fixedtoastcontentError">
                        <h1>{t("simulateerror")}</h1>
                        <button className="fixedtoastcontentErrorbu" onClick={() => {
                            if(contentFn)contentFn()
                        }}>
                            <h1>{t("cancle")}</h1>
                        </button>
                    </div>
                )
                break;
                
        }
    }, [toastType])
    

    return toastContent
}

export default GetToastComponent;
