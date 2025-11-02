import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import "@/style/components/commonStyle/show/commonToast.css"
import CommonToast from "@/components/common/show/commonToast";

interface CommonToast {
    id: number;
    message: string;
    title: string,
    duration: number,
    onConfirm?: () => void,
    confirmName?: string
}

interface CommonToastContextType {
    showToast: (message: string, title: string, duration?: number, onConfirm?: () => void) => void;
}

const CommonToastContext = createContext<CommonToastContextType | null>(null);

export const CommonToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<CommonToast[]>([]);
    const [nextId, setNextId] = useState(0);

    const hideToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, title: string, duration: number = 2000, onConfirm?: () => void, confirmName?: string) => {
            const id = nextId;
            setNextId(prev => prev + 1);
            setToasts(prev => [...prev, { id, message, title, duration, onConfirm, confirmName }]);

        },
        [nextId, hideToast]
    );
    return (
        <CommonToastContext.Provider value={{ showToast }}>
            {children}
            {createPortal(
                <div>
                    {toasts.map((toast) => (
                        <div key={toast.id}  className="commonfixedtoast">
                            <CommonToast
                                title={toast.title}
                                message={toast.message}
                                onClose={() => hideToast(toast.id)}
                                onConfirm={toast.onConfirm}
                                confirmName={toast.confirmName}
                                duration={toast.duration}
                            />
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </CommonToastContext.Provider>
    );
};

export const useCommonToast = (): CommonToastContextType => {
    const context = useContext(CommonToastContext);
    if (!context) {
        throw new Error("useCommonToast must be used within CommonToastProvider");
    }
    return context;
};
