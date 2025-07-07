import { Outlet } from "react-router-dom";

import "@/style/pages/layout.css"
import Topbar from "@/components/topbar";

export default function Layout(){


    return(
        <div className="layout">
            <Topbar />
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}