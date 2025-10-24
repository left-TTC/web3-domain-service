

import "@/style/pages/usr.css"
import UsrBackground from "@/components/usrPage/usrBackground";
import { useEffect, useRef, useState } from "react";
import UsrDomain from "@/components/usrPage/usrComponets/usrDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import AdminBlcok from "@/components/usrPage/adminBlock";
import { UsrComponents } from "@/components/usrPage/usrBack/usrStateManage";
import UsrAuction from "@/components/usrPage/usrComponets/usrAuction";
import { useAuctioningDomain } from "@/components/usrPage/function/useAuctioningDomain";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAsPayerName } from "@/components/usrPage/function/useAsPayerName";
import { useParams } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import { useUsrDomains } from "@/components/usrPage/usrComponets/hook/useUsrDomains";
import { useKonamiLikeListener } from "@/components/usrPage/usrComponets/hook/openAdminBlock";

export function User({
    openDomainQueryPage,
}: {
    openDomainQueryPage: () => void;
}) {

    // get the params from url
    const { key } = useParams();
    const ifOtherUsr = useRef(false)

    const { adminModel } = useKonamiLikeListener()

    const {publicKey: usr} = useWalletEnv()
    const {connection} = useConnection()

    useEffect(() => {
        if(key != undefined && usr?.toBase58() != key)ifOtherUsr.current=true
    }, [key, usr])

    const [searchKey, setSearchKey] = useState<PublicKey | null>(usr)
    useEffect(() => {
        if(ifOtherUsr.current){
            setSearchKey(new PublicKey(key!))
        }else{
            setSearchKey(usr)
        }
    }, [ifOtherUsr.current, usr])

    // contains all the domains that currently being liquidated and auctioned
    const { auctioningDomain } = useAuctioningDomain(connection, searchKey)
    const { asPayerDomain } = useAsPayerName(connection, searchKey)

    const {
        domainNumber, showSearchFrist, isLoadingRecordData, recordLoaded,
        usrDomainLoaded, domainStateMap, recordMap, usrDomains, usrDomainOnSale
    } = useUsrDomains(
        auctioningDomain, asPayerDomain, searchKey
    )

    const [showUsrComponents, setShowUsrComponents] = useState<UsrComponents>(UsrComponents.Domain)

    const getUsrComponent = () => {
        switch(showUsrComponents){
            case UsrComponents.Domain:
                return <UsrDomain 
                            domainNumber={domainNumber}
                            ifCheckingOtherUsr={ifOtherUsr.current}
                            usrDomains={usrDomains}
                            recordMap={recordMap}
                            recordLoaded={recordLoaded}
                            usrDomainLoaded={usrDomainLoaded}
                            domainStateMap={domainStateMap}
                            isLoadingRecordData={isLoadingRecordData}
                            onSaleDomains={usrDomainOnSale}
                        />
            case UsrComponents.Auction:
                return <UsrAuction allAuctionName={auctioningDomain}/>
            case UsrComponents.Profit:
                return <UsrAuction allAuctionName={auctioningDomain}/>
        }
    }

    return(
        !adminModel? (
            <div className="usrPage">
                <UsrBackground 
                    openDomainQueryPage={openDomainQueryPage}
                    setShowUsrComponent={setShowUsrComponents}
                    showSearchFrist={showSearchFrist}
                    searchKey={searchKey}
                />
                <div className="usrpagecon">
                    {getUsrComponent()}
                </div>
            </div>
        ) : (
            <div className="usrPage">
                <AdminBlcok />
            </div>
        )
    )
}