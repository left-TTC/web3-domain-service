import { Outlet } from "react-router-dom";
import Topbar from "@/components/topbar/topbar";
import { useCallback, useState } from "react";
import LayoutContext from "./layout/layoutContext";

export interface LayoutProps {
    openDomainQueryPage: () => void
}

const Layout: React.FC<LayoutProps> = ({
    openDomainQueryPage
}) => {

    const [showWalletChooser, setShowWalletChooser] = useState(false);

    const openWalletChooser = useCallback(() => {
        setShowWalletChooser(true);
    }, []);

    return(
        <LayoutContext.Provider value={{ openWalletChooser }}>
            <div className="flex flex-col w-screen overflow-x-hidden min-h-full bg-[#081328]">
                <Topbar 
                    openDomainQueryPage={openDomainQueryPage}
                    showWalletChooser={showWalletChooser}
                    setShowWalletChooser={setShowWalletChooser}
                />
                <div className="flex-1 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </LayoutContext.Provider>
    )
}

export default Layout;


