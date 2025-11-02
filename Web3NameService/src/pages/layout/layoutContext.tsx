import { createContext, useContext } from "react";

interface LayoutContextType {
    openWalletChooser: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = (): LayoutContextType => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayout must be used within <Layout>");
    }
    return context;
};

export default LayoutContext;