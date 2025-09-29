

import "@/style/pages/usr.css"
import UsrBackground from "@/components/usrPage/usrBackground";
import { useEffect, useState } from "react";
import UsrDomain from "@/components/usrPage/usrComponets/usrDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { ADMIN } from "@/utils/constants/constants";
import ChangeToAdmin from "@/components/usrPage/adminComponent/changeToAdmin";
import AdminBlcok from "@/components/usrPage/adminBlock";
import { UsrComponents } from "@/components/usrPage/usrBack/usrStateManage";
import UsrAuction from "@/components/usrPage/usrComponets/usrAuction";
import { useAuctioningDomain } from "@/components/usrPage/function/useAuctioningDomain";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAsPayerName } from "@/components/usrPage/function/useAsPayerName";

export function User({
    openDomainQueryPage,
}: {
    openDomainQueryPage: () => void;
}) {

    const [domainNumber, setDomainNumber] = useState(0)
    const [showChangeAdmin, setShowChangeAdmin] = useState(false)
    const [adminModel, setAdminModel] = useState(false)

    const {publicKey: usr} = useWalletEnv()
    const {connection} = useConnection()

    // contains all the domains that currently being liquidated and auctioned
    const { auctioningDomain } = useAuctioningDomain(connection, usr)
    const { asPayerDomain } = useAsPayerName(connection, usr)

    const [showSearchFrist, setShowSearchFrist] = useState(false)
    useEffect(() => {
        if(domainNumber === 1 && !auctioningDomain && !asPayerDomain){
            setShowSearchFrist(true)
        }
    }, [auctioningDomain, asPayerDomain, domainNumber])

    useEffect(() => {
        if(usr?.toBase58() === ADMIN.toBase58()){
            setShowChangeAdmin(true)
        }
    }, [usr])

    const [showUsrComponents, setShowUsrComponents] = useState<UsrComponents>(UsrComponents.Domain)

    const getUsrComponent = () => {
        switch(showUsrComponents){
            case UsrComponents.Domain:
                return <UsrDomain domainNumber={domainNumber}/>
            case UsrComponents.Auction:
                return <UsrAuction allAuctionName={auctioningDomain}/>
            case UsrComponents.Profit:
                return <UsrDomain domainNumber={domainNumber}/>
        }
    }

    return(
        !adminModel? (
            <div className="usrPage">
                <UsrBackground 
                    openDomainQueryPage={openDomainQueryPage}
                    setShowUsrComponent={setShowUsrComponents}
                    showSearchFrist={showSearchFrist}
                />
                <div className="usrpagecon">
                    {getUsrComponent()}
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