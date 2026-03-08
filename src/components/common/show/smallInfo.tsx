import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
    message: string;
    type?: ToastType;
}

interface ToastItem extends ToastOptions {
    id: number;
}

export interface SmallInfoContextType {
    showToast: (options: ToastOptions) => void;
    hideToast: (id: number) => void;
}

const SmallInfoContext = createContext<SmallInfoContextType | undefined>(undefined);

/**
 * Toast 组件主体
 * @param {string} message - 提示文字内容
 * @param {string} type - 提示类型: 'success' | 'error' | 'info'
 * @param {function} onClose - 关闭回调
 */
const Toast = ({ message, type = 'info', onClose }: { message: string; type: ToastType; onClose: () => void }) => {
    const [isExiting, setIsExiting] = useState(false);

    React.useEffect(() => {
        // 2000ms 后触发退出动画
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 2000);

        // 2300ms 后完全移除组件（留出 300ms 给淡出动画）
        const removeTimer = setTimeout(() => {
            onClose();
        }, 2300);

        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, [onClose]);

    const styles = {
        success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        error: "bg-rose-500/10 border-rose-500/20 text-rose-400",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-400"
    };

    const icons = {
        success: <CheckCircle size={16} />,
        error: <AlertCircle size={16} />,
        info: <Info size={16} />
    };

    return (
        <div 
            className={`
                fixed top-20 left-1/2 -translate-x-1/2 z-[9999]
                flex items-center gap-3 px-2 md:px-5 py-2 md:py-3 rounded-2xl border backdrop-blur-xl
                shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                transition-all duration-300 ease-out
                ${isExiting ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}
                ${styles[type]}
            `}
        >
            <span className="shrink-0">{icons[type]}</span>
            <p className="text-[10px] md:text-sm font-medium tracking-wide whitespace-nowrap">{message}</p>
            <button 
                onClick={() => setIsExiting(true)}
                className="ml-1 md:ml-2 hover:opacity-70 transition-opacity"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export const SmallInfoProvider: React.FC<{ children: ReactNode }> = ({ 
    children 
}) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const showToast = useCallback((options: ToastOptions) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, ...options }]);
    }, []);

    const hideToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <SmallInfoContext.Provider value={{ showToast, hideToast }}>
            {children}

            <div className="fixed z-10000 left-0 w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast 
                            message={toast.message} 
                            type={toast.type || 'info'} 
                            onClose={() => hideToast(toast.id)} 
                        />
                    </div>
                ))}
            </div>
        </SmallInfoContext.Provider>
    );
};

export const useSmallInfo = () => {
    const context = useContext(SmallInfoContext);
    if (!context) {
        throw new Error('useSmallInfo 必须在 SmallInfoProvider 内部使用');
    }
    return context;
};
