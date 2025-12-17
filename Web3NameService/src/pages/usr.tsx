

import "@/style/pages/usr.css"
import { useEffect, useRef, useState } from "react";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import AdminBlcok from "@/components/usrPage/adminBlock";
import { useAuctioningDomain } from "@/components/usrPage/function/useAuctioningDomain";
import { useConnection } from "@solana/wallet-adapter-react";
import { useAsPayerName } from "@/components/usrPage/function/useAsPayerName";
import { useParams } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import { useUsrDomains } from "@/components/usrPage/usrComponets/hook/useUsrDomains";
import { useKonamiLikeListener } from "@/components/usrPage/usrComponets/hook/openAdminBlock";
import { useUsrRefferrerChain } from "@/components/usrPage/usrComponets/hook/useUsrRefferrerChain";
import UsrIndex from "@/components/usrPage/usrIndex";

export function User({
    openDomainQueryPage,
}: {
    openDomainQueryPage: () => void;
}) {

    // get the params from url
    const { key } = useParams();
    const ifOtherUsr = useRef(false)

    // 上上下下左右左右baba
    const { adminModel } = useKonamiLikeListener()

    const {publicKey: usr} = useWalletEnv()
    const {connection} = useConnection()

    useEffect(() => {
        if(!usr) {
            ifOtherUsr.current = true
            return
        }
        if(key != undefined && usr.toBase58() != key){
            ifOtherUsr.current=true
            return
        }
        ifOtherUsr.current = false
    }, [key, usr])

    const [searchKey, setSearchKey] = useState<PublicKey | null>(null)
    useEffect(() => {
        if(ifOtherUsr.current){
            setSearchKey(new PublicKey(key!))
        }else{
            setSearchKey(usr)
        }
    }, [ifOtherUsr.current, usr, key])

    const [usrDomainLoaded, setUsrDomainLoaded] = useState(false)
    const fetched = useRef(false)

    const prevSearchKey = useRef<string | null>(null);
    useEffect(() => {
        if (!searchKey) return;
            const currentKey = searchKey.toBase58();
        if (prevSearchKey.current !== currentKey) {
            prevSearchKey.current = currentKey;
            setUsrDomainLoaded(false)
            fetched.current = false
            fetchedUsrChain.current = false
        }
    }, [searchKey]);

    // contains all the domains that currently being liquidated and auctioned
    const { auctioningDomain, auctionState, ifFromRpc } = useAuctioningDomain(connection, searchKey)
    const { asPayerDomain } = useAsPayerName(connection, searchKey)

    const {
        isLoadingRecordData, recordLoaded,
        domainStateMap, recordMap, usrDomains, usrDomainOnSale
    } = useUsrDomains(
        searchKey, setUsrDomainLoaded, fetched
    )

    const fetchedUsrChain = useRef(false)
    const {usrProfit, usrVolume} = useUsrRefferrerChain(searchKey, fetchedUsrChain)

    // const getUsrComponent = () => {
    //     switch(showUsrComponents){
    //         case UsrComponents.Domain:
    //             return <UsrDomain 
    //                         domainNumber={1}
    //                         ifCheckingOtherUsr={ifOtherUsr.current}
    //                         usrDomains={usrDomains}
    //                         recordMap={recordMap}
    //                         recordLoaded={recordLoaded}
    //                         usrDomainLoaded={usrDomainLoaded}
    //                         domainStateMap={domainStateMap}
    //                         isLoadingRecordData={isLoadingRecordData}
    //                         onSaleDomains={usrDomainOnSale}
    //                     />
    //         case UsrComponents.Auction:
    //             return <UsrAuction 
    //                         allAuctionName={auctioningDomain}
    //                         ifCheckingOtherUsr={ifOtherUsr.current}
    //                         usrProfit={usrProfit}
    //                         usrVolume={usrVolume}
    //                     />
    //     }
    // }

    return(
        !adminModel? (
            <UsrIndex 
                useUsr={searchKey}
                usrDomains={usrDomains}
                ifCheckingOtherUsr={ifOtherUsr.current}
                recordMap={recordMap}
                domainStateMap={domainStateMap}
                usrProfit={usrProfit}
                usrVolume={usrVolume}
                allAuctionName={auctioningDomain}
                ifAuctionFromRpc={ifFromRpc}
                auctionState={auctionState}
                searchKey={searchKey}
            />
        ) : (
            <div className="usrPage">
                <AdminBlcok />
            </div>
        )
    )
}