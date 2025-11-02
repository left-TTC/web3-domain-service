import FixedToast from "@/components/common/show/transactionToast";
import { createContext, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";

export enum TransactionState {  
    Pending,
    Success,
    Fail,
    Cancle,
    CheckingBalance,
    NoEnoughBalance,
    NoConnect,
    Error
}

export interface SolanaToastMessage {
    id: number;
    type: TransactionState;
    message?: string;
    contentFn?: () => void;
    ifAddHiden?: boolean
}

export interface SolanaToastContextType {
    show: (type: TransactionState, message?: string, contentFn?: () => void) => number; 
    update: (id: number, type: TransactionState, contentFn?: () => void, message?: string) => void;
    hide: (id: number) => void;
}


const SolanaToastContext = createContext<SolanaToastContextType  | null>(null);

export const SolanaToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<SolanaToastMessage[]>([]);
    const [nextId, setNextId] = useState(0);

    const show = useCallback((type: TransactionState,  message?: string, contentFn?:()=>void, ifAddHiden?: boolean) => {
        const id = nextId;
        setNextId(prev => prev + 1);
        setToasts(prev => [...prev, { id, message, type, contentFn, ifAddHiden }]);
        return id; 
    }, [nextId]);

    const update = useCallback(
        (id: number, type: TransactionState, contentFn?: () => void, message?: string, ifAddHiden?: boolean) => {
            setToasts(prev =>
                prev.map(t =>
                    t.id === id
                        ? { ...t, type, ...(contentFn ? { contentFn } : {}), ...(message ? { message } : {}), ...(ifAddHiden? {ifAddHiden}:{}) }
                        : t
                )
            );
        },
        []
    );

    const hide = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);
    

    return(
        <SolanaToastContext.Provider value={{ show, update, hide }}>
            {children}
            {createPortal(
                <>
                    {toasts.map((toast) => (
                        <FixedToast
                            key={toast.id}
                            toastType={toast.type}
                            onClose={() => {
                                if(toast.contentFn){
                                    toast.contentFn()
                                }
                                hide(toast.id)
                            }}
                            contentFn={
                                () => {
                                    if(toast.contentFn){
                                        toast.contentFn()
                                        if(toast.ifAddHiden){
                                            hide(toast.id)
                                        }
                                    }else{
                                        hide(toast.id)
                                    }
                                }
                            }
                            message={toast.message}
                        />
                    ))}
                </>,
                document.body
            )}
        </SolanaToastContext.Provider>
    )
}


export const useSolanaToast = (): SolanaToastContextType  => {
    const context = useContext(SolanaToastContext);
    if (!context) {
        throw new Error("useSolanaToast must be used within SolanaToastProvider");
    }
    return context;
};