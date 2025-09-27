

import "@/style/pages/usr.css"
import UsrBackground from "@/components/usrPage/usrBackground";
import { useEffect, useState } from "react";
import UsrDomain from "@/components/usrPage/usrDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { ADMIN } from "@/utils/constants/constants";
import ChangeToAdmin from "@/components/usrPage/adminComponent/changeToAdmin";
import AdminBlcok from "@/components/usrPage/adminBlock";

export function User({
    openDomainQueryPage,
}: {
    openDomainQueryPage: () => void;
}) {

    const [domainNumber, setDomainNumber] = useState(0)
    const [showChangeAdmin, setShowChangeAdmin] = useState(false)
    const [adminModel, setAdminModel] = useState(false)

    const {publicKey: usr} = useWalletEnv()

    useEffect(() => {
        if(usr?.toBase58() === ADMIN.toBase58()){
            setShowChangeAdmin(true)
        }
    }, [usr])

    return(
        !adminModel? (
            <div className="usrPage">
                <UsrBackground domainNumber={domainNumber} openDomainQueryPage={openDomainQueryPage}/>
                <div className="usrpagecon">
                    <UsrDomain domainNumber={domainNumber}/>
                </div>
                {showChangeAdmin &&
                    <ChangeToAdmin 
                        ifAdminModel={adminModel} changeAdminModel={setAdminModel}
                    />
                }
            </div>
        ) : (
            <div className="usrPage">
                <AdminBlcok />
                {showChangeAdmin &&
                    <ChangeToAdmin 
                        ifAdminModel={adminModel} changeAdminModel={setAdminModel}
                    />
                }
            </div>
        )
    )
}