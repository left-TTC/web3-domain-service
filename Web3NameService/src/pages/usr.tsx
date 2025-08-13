import Back from "@/components/common/functional/back";
import { useNavigate } from "react-router-dom"

import "@/style/pages/usr.css"
import UsrBackground from "@/components/usrPage/usrBackground";
import { useState } from "react";
import UsrDomain from "@/components/usrPage/usrDomain";

export function User({
    openDomainQueryPage,
}: {
    openDomainQueryPage: () => void;
}) {

    const navigate = useNavigate();

    const [domainNumber, setDomainNumber] = useState(0)

    return(
        <div className="usrPage">
            <UsrBackground domainNumber={domainNumber} openDomainQueryPage={openDomainQueryPage}/>
            <div className="usrpagecon">
                <UsrDomain domainNumber={domainNumber}/>
            </div>
        </div>
    )
}