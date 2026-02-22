import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getQueryDomainInfo } from "@/utils/net/getQueryDomainInfo";
import { useConnection } from "@solana/wallet-adapter-react";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";

import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import DomainSearchResult from "@/components/search/domainSearchResult";
import { INIT_DOMAIN_PRICE } from "@/utils/constants/constants";
import DomainSettlementModal, { SettleType, type DomainSettlementConfirmPayload } from "@/components/settle/settlement";
import { getSearchDomainState, SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState";
import { startDomain } from "@/components/search/result/function/startDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useAtom } from "jotai";
import { biddingDomain } from "@/components/usrPage/function/useAuctioningDomain";
import { useGlobalModal } from "@/components/common/show/info";
import { TransactionState } from "@/utils/functional/instructions/transactionState";

export function Search() {

    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {rootDomains} = useRootDomain()

    const {connection} = useConnection();

    const [searchParams] = useSearchParams();
    const queryingDomain = searchParams.get("q");

    const [domainBlock, setDomainBlock] = useState<string[] | null> (null)
    const [queryDomainInfo, setQueryDomainInfo] = useState<NameRecordState | null>(null)

    const [domainAuctionState, setDomainAuctionState] = useState<NameAuctionState | null>(null)
    
    const [isDomainInfoLoaded, setIsDomainInfoLoaded] = useState(false)

    const [showSaleDomain, setShowSaleDomain] = useState(false)
    const [domainStartPrice, setDomainStartPrice] = useState<number | null>(null)

    useEffect(() => {
        if(isDomainInfoLoaded){
            if(queryDomainInfo){
                setDomainStartPrice(queryDomainInfo.customPrice.toNumber())
            }else{
                setDomainStartPrice(INIT_DOMAIN_PRICE)
            }
        }
    }, [isDomainInfoLoaded])

    const info = useGlobalModal()
    const navigate = useNavigate()

    useEffect(() => {
        if(queryingDomain){
            setIsDomainInfoLoaded(false)
            setDomainBlock(cutDomain(queryingDomain));
        }else{
            info.showModal({
                title: "Query error",
                content: "The querying domain is null",
                type: "error",
                onCancel: () => {navigate(`/index`)},
                onConfirm: () => {navigate(`/index`)}
            })
            
        }
    } ,[queryingDomain])

    const [resultState, setResultState] = useState<SearchDomainResult>(SearchDomainResult.loading)
    useEffect(() => {
        (async () => {
            if((!domainBlock)) return;
            if(isDomainInfoLoaded) return;
            console.log("check info")
            setIsDomainInfoLoaded(true)

            const rootDomainKey = getNameAccountKey(getHashedName(domainBlock[1]))
            const accountInfo = await getQueryDomainInfo(domainBlock, rootDomainKey, connection);

            const nameAuctionStateKey = getNameStateKey(getHashedName(domainBlock[0]), rootDomainKey)
            console.log(nameAuctionStateKey.toBase58())
            const auctionStateInfo = await connection.getAccountInfo(nameAuctionStateKey)

            if(auctionStateInfo){
                const auctionState = new NameAuctionState(auctionStateInfo)
                setDomainAuctionState(auctionState)
                setResultState(getSearchDomainState(accountInfo[0], auctionState))
            }else{
                setDomainAuctionState(null)
                setResultState(getSearchDomainState(accountInfo[0], domainAuctionState))
            }

            setQueryDomainInfo(accountInfo[0])
        })()
    }, [domainBlock, isDomainInfoLoaded])

    //test console
    useEffect(() => {
        if(queryDomainInfo){
            console.log("=== Domain Info ===");
            console.log("parentName:", queryDomainInfo.parentName.toBase58());
            console.log("owner:", queryDomainInfo.owner.toBase58());
            console.log("class:", queryDomainInfo.class.toBase58());
            console.log("previewer:", queryDomainInfo.previewer.toBase58());
            console.log("isFrozen:", queryDomainInfo.isFrozen);
            console.log("customPrice:", queryDomainInfo.customPrice.toString());
        }
        if(rootDomains){
            console.log("root key: ",getNameAccountKey(getHashedName(rootDomains[0])).toBase58())
        }
    }, [queryDomainInfo])

    const [_, setAuctioningDomain] = useAtom(biddingDomain)
    const createNameState = async ({ usrBalance, totalFee, refferrerKey }: DomainSettlementConfirmPayload) => {
        if (domainStartPrice === null) return TransactionState.Error;
        if (!queryingDomain) return TransactionState.Error;
        return await startDomain(
            queryingDomain!,
            refferrerKey!,
            usr,
            rootDomains,
            totalFee!,
            usrBalance!,
            connection,
            queryDomainInfo,
            signTransaction,
            () => {
                setAuctioningDomain(prev => ({
                    ...prev,
                    [queryingDomain]: domainStartPrice,
                })), console.log("add", queryingDomain, "to cache")
            }
        )
    }

    const startSuccess = () => {
        setIsDomainInfoLoaded(false)
        setResultState(SearchDomainResult.loading)
        setShowSaleDomain(false)
    };

    return(
        <div>
            {queryingDomain && 
                <DomainSearchResult
                    domainInfo={queryDomainInfo}
                    domainName={queryingDomain}
                    auctionState={domainAuctionState}
                    openSettlePage={() => setShowSaleDomain(true)}
                    resultState={resultState}
                    setResultState={setResultState}
                />
            }
            {showSaleDomain &&
                <DomainSettlementModal
                    onClose={() => setShowSaleDomain(false)}
                    opearationName={queryingDomain!}
                    actionType={SettleType.buy}
                    basePrice={domainStartPrice!}
                    onConfirm={createNameState}
                    onInfoOk={startSuccess}
                />
            }
        </div>
    )
}