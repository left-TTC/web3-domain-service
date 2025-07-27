import { Outlet } from "react-router-dom";

import "@/style/pages/layout.css"
import Topbar from "@/components/topbar/topbar";

export interface LayoutProps {
    openDomainQueryPage: () => void
}

const Layout: React.FC<LayoutProps> = ({
    openDomainQueryPage
}) => {

    return(
        <div className="layout">
            <Topbar openDomainQueryPage={openDomainQueryPage}/>
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
