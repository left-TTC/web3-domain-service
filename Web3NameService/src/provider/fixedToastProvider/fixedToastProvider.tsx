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
}

export interface SolanaToastMessage {
    id: number;
    type: TransactionState;
    txSignature?: string; 
    message?: string;
}

export interface SolanaToastContextType {
    show: (type: TransactionState, txSignature?: string, message?: string) => number; 
    update: (id: number, type: TransactionState) => void;
    hide: (id: number) => void;
}


const SolanaToastContext = createContext<SolanaToastContextType  | null>(null);

export const SolanaToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<SolanaToastMessage[]>([]);
    const [nextId, setNextId] = useState(0);

    const show = useCallback((type: TransactionState, txSignature?: string, message?: string,) => {
        const id = nextId;
        setNextId(prev => prev + 1);
        setToasts(prev => [...prev, { id, message, type, txSignature }]);
        return id; 
    }, [nextId]);

    const update = useCallback((id: number, type: TransactionState) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, type } : t));
    }, []);

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
                            onClose={() => hide(toast.id)}
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