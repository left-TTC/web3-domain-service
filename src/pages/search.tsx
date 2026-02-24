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
    const info = useGlobalModal()
    const navigate = useNavigate()
    const {connection} = useConnection();

    const [searchParams] = useSearchParams();
    const queryingDomain = searchParams.get("q");

    // the name and root 
    const [domainBlock, setDomainBlock] = useState<string[] | null> (null)
    const [queryDomainInfo, setQueryDomainInfo] = useState<NameRecordState | null>(null)
    const [isDomainInfoLoaded, setIsDomainInfoLoaded] = useState(false)
    const [domainAuctionState, setDomainAuctionState] = useState<NameAuctionState | null>(null)
    
    // whether to open the settle page
    const [showSaleDomain, setShowSaleDomain] = useState(false)
    // the domain price A. Init price B. usr's custom price
    const [domainStartPrice, setDomainStartPrice] = useState<number | null>(null)
    // domain's sale state
    const [resultState, setResultState] = useState<SearchDomainResult>(SearchDomainResult.loading)

    useEffect(() => {
        if(isDomainInfoLoaded){
            if(queryDomainInfo){
                setDomainStartPrice(queryDomainInfo.customPrice.toNumber())
            }else{
                setDomainStartPrice(INIT_DOMAIN_PRICE)
            }
        }
    }, [isDomainInfoLoaded])

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


    useEffect(() => {
        (async () => {
            if((!domainBlock)) return;
            if(isDomainInfoLoaded) return;
            console.log("check domain info")
            setIsDomainInfoLoaded(true)

            try {
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
            } catch (error) {
                console.error("Error querying domain:", error);
                info.showModal({
                    title: "Domain Format Error",
                    content: error instanceof Error ? error.message : "Invalid domain format. Only a.b format is supported (e.g., example.web3).",
                    type: "error",
                    onCancel: () => {navigate(`/index`)},
                    onConfirm: () => {navigate(`/index`)}
                });
                setIsDomainInfoLoaded(false);
            }
        })()
    }, [domainBlock, isDomainInfoLoaded])

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
                }))
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
                    actionType={resultState===SearchDomainResult.settling? SettleType.INCREASE:SettleType.STARTNAME}
                    basePrice={domainStartPrice!}
                    onConfirm={createNameState}
                    onInfoOk={startSuccess}
                />
            }
        </div>
    )
}