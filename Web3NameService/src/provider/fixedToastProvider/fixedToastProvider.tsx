import { createContext, useContext, useState } from "react";



interface ShowFixedToastFunction {
    openModal: (modal: React.ReactNode) => void;
    closeModal: () => void;
}

const FixedToastContext = createContext<ShowFixedToastFunction | null>(null);

export const FixedToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const openModal = (modal: React.ReactNode) => setModalContent(modal);
    const closeModal = () => setModalContent(null);

    return(
        <FixedToastContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent && (
                <div className="globalmodal-overlay">
                {modalContent}
                </div>
            )}
        </FixedToastContext.Provider>
    )
}


export const useFixedToast = (): ShowFixedToastFunction => {
    const context = useContext(FixedToastContext);
    if (!context) {
        throw new Error("useFixedToast must be used within FixedToastProvider");
    }
    return context;
};