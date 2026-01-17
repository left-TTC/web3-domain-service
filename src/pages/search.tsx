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
import DomainSearchResult from "@/components/search/continueQuery/domainSearchResult";
import { INIT_DOMAIN_PRICE } from "@/utils/constants/constants";
import DomainSettlementModal, { SettleType, type DomainSettlementConfirmPayload } from "@/components/settle/settlement";
import { getSearchDomainState, SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState";
import { startDomain } from "@/components/search/domainSettlement/functionComponents/transaction/startDomain";
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

    useEffect(() => {
        const fetchDomainInfo = async() => {
            if((!domainBlock)) return;
            if(isDomainInfoLoaded) return;

            const rootDomainKey = getNameAccountKey(getHashedName(domainBlock[1]))
            const accountInfo = await getQueryDomainInfo(domainBlock, rootDomainKey, connection);

            const nameAuctionStateKey = getNameStateKey(getHashedName(domainBlock[0]), rootDomainKey)
            const auctionStateInfo = await connection.getAccountInfo(nameAuctionStateKey)
            if(auctionStateInfo){
                try{
                    setDomainAuctionState(new NameAuctionState(auctionStateInfo))
                }catch(err){
                    console.log(err)
                }
            }else{
                setDomainAuctionState(null)
            }

            setIsDomainInfoLoaded(true)
            setQueryDomainInfo(accountInfo[0])
        }

        fetchDomainInfo()

    }, [domainBlock])

    const [resultState, setResultState] = useState<SearchDomainResult | null>(SearchDomainResult.loading)

    useEffect(() => {
        setResultState(getSearchDomainState(queryDomainInfo, domainAuctionState))
    }, [queryDomainInfo, domainAuctionState])

    const [_, setAuctioningDomain] = useAtom(biddingDomain)
    const createNameState = async ({ totalFee, refferrerKey }: DomainSettlementConfirmPayload) => {
        if (domainStartPrice === null) return TransactionState.Error;
        if (!queryingDomain) return TransactionState.Error;
        return await startDomain(
            queryingDomain!,
            refferrerKey!,
            usr,
            rootDomains,
            totalFee!,
            connection,
            signTransaction,
            () => {
                setAuctioningDomain(prev => ({
                    ...prev,
                    [queryingDomain]: domainStartPrice,
                })), console.log("add", queryingDomain, "to cache")
            }
        )
    }

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
                />
            }
        </div>
    )
}