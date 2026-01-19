import React, { createContext, useContext, useState, type ReactNode} from 'react';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  Bell,
} from 'lucide-react';

export type ModalType = 'info' | 'success' | 'warning' | 'error';

interface ModalOptions {
    title: string;
    content: ReactNode;
    type?: ModalType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface ModalContextType {
    showModal: (options: ModalOptions) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const TYPE_CONFIG = {
    info: {
        icon: <Info className="text-blue-400" size={24} />,
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20',
        button: 'bg-blue-500 hover:bg-blue-600 text-white'
    },
    success: {
        icon: <CheckCircle2 className="text-[#B4FC75]" size={24} />,
        bg: 'bg-[#B4FC75]/10',
        border: 'border-[#B4FC75]/20',
        button: 'bg-[#B4FC75] text-black hover:opacity-90'
    },
    warning: {
        icon: <AlertTriangle className="text-yellow-400" size={24} />,
        bg: 'bg-yellow-400/10',
        border: 'border-yellow-400/20',
        button: 'bg-yellow-500 hover:bg-yellow-600 text-white'
    },
    error: {
        icon: <AlertCircle className="text-red-400" size={24} />,
        bg: 'bg-red-400/10',
        border: 'border-red-400/20',
        button: 'bg-red-500 hover:bg-red-600 text-white'
    }
};


export const ModalProvider: React.FC<{ children: ReactNode }> = ({ 
    children 
}) => {
    const [modalConfig, setModalConfig] = useState<ModalOptions | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const showModal = (options: ModalOptions) => {
        setModalConfig(options);
        requestAnimationFrame(() => setIsVisible(true));
    };

    const hideModal = () => {
        setIsVisible(false);
        setTimeout(() => setModalConfig(null), 300); 
    };

    const handleConfirm = () => {
        if (modalConfig?.onConfirm) modalConfig.onConfirm();
        hideModal();
    };

    const handleCancel = () => {
        if (modalConfig?.onCancel) modalConfig.onCancel();
        hideModal();
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}

            {modalConfig && (
                <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
                        onClick={handleCancel}
                    />

                    <div className={`
                        relative w-full max-w-md bg-[#111] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden transform transition-all duration-300 ease-out
                        ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}
                    `}>
                        <div className={`h-1.5 w-full ${modalConfig.type ? TYPE_CONFIG[modalConfig.type].bg : 'bg-white/10'}`} />
                    
                        <div className="p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className={`p-3 rounded-2xl ${modalConfig.type ? TYPE_CONFIG[modalConfig.type].bg : 'bg-white/5'}`}>
                                    {modalConfig.type ? TYPE_CONFIG[modalConfig.type].icon : <Bell size={24} />}
                                </div>
                                <div className="flex-grow pt-1">
                                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
                                        {modalConfig.title}
                                    </h3>
                                </div>
                                <button 
                                    onClick={handleCancel}
                                    className="p-1 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="text-gray-400 text-sm leading-relaxed mb-8 pl-1">
                                {modalConfig.content}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {modalConfig.cancelText && (
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 border border-white/5 transition-all active:scale-[0.98]"
                                    >
                                        {modalConfig.cancelText}
                                    </button>
                                )}
                                <button
                                    onClick={handleConfirm}
                                    className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg
                                        ${modalConfig.type ? TYPE_CONFIG[modalConfig.type].button : 'bg-white text-black hover:opacity-90'}
                                    `}
                                >
                                    {modalConfig.confirmText || '确定'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export const useGlobalModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useGlobalModal 必须在 ModalProvider 内部使用');
    }
    return context;
};
