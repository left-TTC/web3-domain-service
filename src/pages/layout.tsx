import { Outlet, useLocation } from "react-router-dom";
import Topbar from "@/components/topbar/topbar";
import { useCallback, useEffect, useState } from "react";
import LayoutContext from "./layout/layoutContext";
import FloatingBall from "@/components/topbar/floatingBall";

export interface LayoutProps {
    openDomainQueryPage: () => void
}

const Layout: React.FC<LayoutProps> = ({
    openDomainQueryPage
}) => {

    const location = useLocation();

    const [showWalletChooser, setShowWalletChooser] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true)

    const openWalletChooser = useCallback(() => {
        setShowWalletChooser(true);
    }, []);

    useEffect(() => {
        const hiddenRoutes = ["/download"];

        setShowTopBar(!hiddenRoutes.includes(location.pathname));
    }, [location.pathname]);

    return(
        <LayoutContext.Provider value={{ openWalletChooser }}>
            <div className="flex flex-col w-screen overflow-x-hidden min-h-full bg-[#081328]">
                <Topbar 
                    openDomainQueryPage={openDomainQueryPage}
                    showWalletChooser={showWalletChooser}
                    setShowWalletChooser={setShowWalletChooser}
                    show={showTopBar}
                />
                <div className="flex-1 overflow-hidden">
                    <Outlet />
                </div>
                <FloatingBall showBack={!showTopBar} />
            </div>
        </LayoutContext.Provider>
    )
}

export default Layout;


